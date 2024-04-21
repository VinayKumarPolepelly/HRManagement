import React from "react";
import EmployeeHeader from "./EmployeeHeader";
import { useState } from "react";
const ProjectReport = () => {
  const [selectedOption, setSelectedOption] = useState("select");
  const handleChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOptionText = event.target.options[selectedIndex].text;
    setSelectedOption(selectedOptionText);
  };
  return (
    <div>
      <div>
        <EmployeeHeader />
        <div>
          <div className="p-10 mt-8 text-center">
            <h1 className="font-bold text-2xl  ">Project Report</h1>
          </div>
          <div className="w-6/12 mt-[-20px] m-auto">
            <div className="bg-gray-100 rounded-xl p-7  shadow-2xl">
              <h1 className="ml-9 text-sm font-medium">Select Project</h1>
              <label htmlFor="dropdown"></label>
              <select
                className=" ml-7 mt-2 p-2 hover:bg-gray-200"
                id="dropdown"
                value={selectedOption}
                onChange={handleChange}
              >
                <option
                  value="option1"
                  className="text-gray-500 text-sm rounded-xl"
                >
                  {selectedOption}
                </option>
                <option value="option1">HR Mangement</option>
                <option value="option2">Food App</option>
                <option value="option3">Hotel RoomBooking</option>
              </select>
              <div className=" p-7 ">
                <h1 className="ml-2 text-sm font-medium mb-4">
                  Project Report
                </h1>
                <textarea
                  className="rounded-lg w-[100%]"
                  rows="4"
                  id="projectReportText"
                />
              </div>
              <button className=" bg-violet-500 w-[100px] ml-[30px] h-10 rounded-lg  mt-3 text-white hover:bg-violet-600 hover:shadow-lg active:bg-violet-700 active:border-collapse active:font-semibold active:shadow-2xl">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectReport;
