import React, { useState } from 'react';

const data = {
  "Stats": [
    {
      "Faculty of Engineering": [
        {
          "School Of Computer Science & Engineering": [
            {
              "Department of Artificial Intelligence & Machine Learning": [
                {
                  "status": "Pending",
                  "count": "1",
                  "sum": null
                }
              ]
            },
            {
              "Department of Computer Science & Engineering": [
                {
                  "status": "Approved",
                  "count": "1",
                  "sum": null
                },
                {
                  "status": "Pending",
                  "count": "6",
                  "sum": "123247"
                },
                {
                  "status": "Rejected",
                  "count": "2",
                  "sum": null
                },
                {
                  "status": "Reverted",
                  "count": "1",
                  "sum": null
                }
              ]
            }
          ]
        }
      ],
      "Faculty of Arts": [
        {
          "School Of Humanities": [
            {
              "Department of Literature": [
                {
                  "status": "Pending",
                  "count": "3",
                  "sum": "60000"
                },
                {
                  "status": "Approved",
                  "count": "2",
                  "sum": "50000"
                }
              ]
            },
            {
              "Department of Media": [
                {
                  "status": "Pending",
                  "count": "1",
                  "sum": "200"
                }
              ]
            }
          ]
        }
      ],
      "Faculty of Law": [
        {
          "School Of Law": [
            {
              "Department of Law (Arts)": [
                {
                  "status": "Pending",
                  "count": "3",
                  "sum": null
                },
                {
                  "status": "Approved",
                  "count": "2",
                  "sum": "50000"
                }
              ]
            }
          ]
        }
      ],
      "Faculty of Science": [
        {
          "School Of Science": [
            {
              "Department of Chemistry": [
                {
                  "status": "Pending",
                  "count": "3",
                  "sum": "3000"
                },
                {
                  "status": "Approved",
                  "count": "2",
                  "sum": "50000"
                }
              ]
            }
          ]
        }
      ],
      "Faculty of Management": [
        {
          "School Of Business": [
            {
              "Department of Business Administration": [
                {
                  "status": "Pending",
                  "count": "3",
                  "sum": null
                },
                {
                  "status": "Approved",
                  "count": "2",
                  "sum": "50000"
                }
              ]
            },
            {
              "Department of Commerce": [
                {
                  "status": "Pending",
                  "count": "1",
                  "sum": "200"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const DepartmentDetails = ({ departments }) => {
  return (
    <div className="mt-2">
      {departments.map((department, index) => (
        <div key={index} className="mt-2 border rounded-lg p-4 bg-white hover:bg-gray-100 transition-all duration-300 ease-in-out">
          {Object.entries(department).map(([departmentName, stats], index) => (
            <div key={departmentName} className="mt-2 pl-8 ml-4 border-l-2 border-orange-300">
              <p className="text-sm font-semibold">Department: {departmentName}</p>
              {stats.map((stat, index) => (
                <div key={index} className="mt-1">
                  <p className="text-sm">Status: {stat.status}</p>
                  <p className="text-sm">Count: {stat.count}</p>
                  <p className="text-sm">Sum: {stat.sum}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const SchoolDetails = ({ schools }) => {
  return (
    <div className="mt-4 border-b-2 border-gray-300 pb-4">
      {schools.map((schoolStats, index) => (
        <div key={index} className="mt-4">
          {Object.entries(schoolStats).map(([schoolName, departments]) => (
            <div key={schoolName} className="mt-2">
              <h3 className="text-lg font-medium pl-4 ml-4 border-l-2 border-orange-300">{schoolName}</h3>
              <DepartmentDetails departments={departments} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const FacultyDetails = ({ faculty }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mt-20"> {/* Adjusted margin to create a 5cm (approximately) gap */}
      <div
        className={`border rounded-lg overflow-hidden transition-all duration-1000 ease-in-out shadow-md ${isHovered ? 'shadow-lg' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered ? '0px 10px 20px rgba(255, 165, 0, 0.6)' : '0px 5px 10px rgba(255, 165, 0, 0.3)'
        }}
      >
        <h2 className={`text-2xl font-semibold p-4 bg-white ${isHovered ? 'text-3xl' : ''} transition-all duration-500 ease-in-out relative`}>
          {faculty}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"></div>
        </h2>
        <SchoolDetails schools={data.Stats[0][faculty]} />
      </div>
    </div>
  );
};

const InsightsPageComponent = () => {
  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <div className="text-center">
        <div className="w-full border-b-4 border-orange-300 p-4 mb-4 shadow-md">
          <h1 className="text-4xl font-bold">INSIGHTS</h1>
        </div>
      </div>

      {Object.keys(data.Stats[0]).map((faculty, index) => (
        <FacultyDetails key={index} faculty={faculty} />
      ))}
    </div>
  );
};

export default InsightsPageComponent;