import React from 'react'
import FooterHeader from './FooterHeader'

const EmployeePortal = () => {
  return (
    <div>
      <FooterHeader />
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-blue-900 mb-6">
            Employee Portal
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* HR Management Card 1: Employee Benefits */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Employee Benefits
              </h2>
              <p className="text-base text-blueGray-700 mb-4">
                Learn about our comprehensive benefits package and access
                enrollment forms and guides.
              </p>
              <a
                href="/employee-benefits"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>

            {/* HR Management Card 2: Career Development */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Career Development
              </h2>
              <p className="text-base text-blueGray-700 mb-4">
                Explore opportunities for professional growth, training
                resources, and skill enhancement.
              </p>
              <a
                href="/career-development"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>

            {/* HR Management Card 3: Performance Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Performance Management
              </h2>
              <p className="text-base text-blueGray-700 mb-4">
                Understand our performance evaluation process and access tools
                for goal setting and feedback.
              </p>
              <a
                href="/performance-management"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>

            {/* HR Management Card 4: Employee Policies */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Employee Policies
              </h2>
              <p className="text-base text-blueGray-700 mb-4">
                Find information on company policies, workplace conduct, and
                frequently asked questions.
              </p>
              <a
                href="/employee-policies"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>

            {/* HR Management Card 5: Wellness and Assistance Programs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Wellness Programs
              </h2>
              <p className="text-base text-blueGray-700 mb-4">
                Discover programs promoting employee wellness, including
                counseling and assistance services.
              </p>
              <a
                href="/wellness-programs"
                className="text-blue-600 hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeePortal
