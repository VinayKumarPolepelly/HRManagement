import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { Project } from "../models/models.project.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    //console.log(userId);
    const userInstance = await User.findById(userId);
    //console.log(userInstance);
    const accessToken = await userInstance.generateAccessToken();
    const refreshToken = await userInstance.generateSessionToken();
    userInstance.refreshToken = refreshToken;
    userInstance.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(400, "something went wrong while generating the tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get the input from the user or frontend
  //validate the input
  //check if the user is already exists
  //create user object-create entry in db
  //remove the password and refresh token feild form response
  //check for user creation
  //return response

  const { username, fullname, email, password, phoneNumber, role } = req.body;

  if (!fullname || !email || !username || !password) {
    throw new ApiError(400, "All feilds are required");
  }

  const existedUser = await User.findOne({
    username,
  });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const newUser = await User.create({
    fullname,
    email,
    username,
    password,
    phoneNumber,
    role,
  });
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }
  // console.log(createdUser);

  return res
    .status(200)
    .json(new ApiResponse(200, newUser, "user registered successfully"));
});

// const registerUser = async (req, res, next) => {
//   try {
//     await res.status(200).json({
//       message: "OK",
//     });
//   } catch (error) {
//     console.log("error", error);
//   }
// };

const loginUser = asyncHandler(async (req, res) => {
  //req body ->data
  //username or email
  //find the user
  //check the password
  //access and refresh token generation
  //send cookies

  const { username, password } = req.body;
  //console.log(req.body);
  if (!username) {
    throw new ApiError(400, "username is required");
  }
  if (!password) {
    throw new ApiError(400, "password is required");
  }

  const existedUser = await User.findOne({ username });
  if (!existedUser) {
    throw new ApiError(404, "you are not registered yet");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);
  //console.log(isPasswordValid);
  if (!isPasswordValid) {
    throw new ApiError(404, "invalid user credentials");
  }
  // res.status(200).json({
  //   user: existedUser,
  // });

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(existedUser._id);

  //console.log(accessToken, refreshToken);

  //by default anyone from the frontend also can modify the cookies
  //but we dont want that to happen, we want to modify the cookies only from the server
  //hence we use this
  const options = {
    httpOnly: true,
    secure: true,
  };
  //you can send with the key value pair within the string is key and another one is value
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: existedUser,
          accessToken,
          refreshToken,
        },
        "user loggedin successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
  // .json({
  //   tokens: { accessToken, refreshToken },
  // });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken != user?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessTokenAndRefreshToken(user?._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

const addProjectReport = asyncHandler(async (req, res) => {
  const { project, report } = req.body;
  if (!project) throw new ApiError(400, "project is required");
  if (!report) throw new ApiError(400, "report is required");
  const existedProject = Project.findOne({ projectTitle: project });
  const newReport = Report.create({
    report,
    project: existedProject,
  });
  if (!newReport) throw new ApiError(500, "Internal server error");
  return res.status(200).json({ message: "report submitted successfully" });
});

export {
  refreshAccessToken,
  registerUser,
  loginUser,
  logoutUser,
  addProjectReport,
};