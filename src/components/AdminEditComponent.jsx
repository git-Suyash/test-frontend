import React from "react";

export function AdminEditComponent({
  userData,
  setUserData,
  facultyData,
  onSubmit,
}) {
  const [faculty] = useState(Object.keys(facultyData));
  const [school, setSchool] = useState(
    Object.entries(facultyData)
      .filter(([faculty]) => faculty === userData.faculty)
      .flatMap(([faculty, schools]) => Object.keys(schools))
  );
  const [department, setDepartment] = useState(
    Object.entries(facultyData)
      .filter(([faculty]) => faculty === userData.faculty)
      .flatMap(([faculty, schools]) =>
        Object.entries(schools).flatMap(([school, departments]) =>
          departments.map((dept) => dept)
        )
      )
  );
  const onChangeFacultyData = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setSchool(null);
      setDepartment(null);
    }
    setUserData({ ...userData, [name]: value });
    if (value) setSchool(Object.keys(facultyData[value]));
  };

  const onChangeSchoolData = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setDepartment(null);
    }
    setUserData({ ...userData, [name]: value });
    if (value) setDepartment(facultyData[userData.faculty][value]);
  };

  const [approved, setApproved] = useState(
    userData.approveRight ? userData.approveRight : false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = {
      email: userData.email,
      approveRight: approved,
      name: userData.name,
      phone: userData.phone,
      position: userData.position,
      school: userData.school,
      department: userData.department,
      faculty: userData.faculty,
    };

    onSubmit();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleApprove = (value) => {
    setApproved(value);
    setUserData({ ...userData, approveRight: value });
  };

  return (
    <>
      {/* bg-gradient-to-tr from-[#e4de9d] to-[#ffc6b8] */}
      <div className=" h-screen w-screen flex items-center justify-center ">
        <div
          className="w-[60%] bg-white text-gray-700 border-solid border-4 px-10"
          style={{ borderImage: "linear-gradient(#fef482, #ffb09c) 90" }}>
          <div className="w-fit h-fit mx-auto py-5">
            <h1 className=" text-3xl font-bold">Update User Details</h1>
          </div>
          <div className="w-full mx-auto text-xl mt-5 font-semibold">
            <form action="" onSubmit={onSubmitHandler}>
              <div className="flex justify-between my-4">
                <label htmlFor="" className="h-fit my-auto">
                  Name:
                </label>
                <input
                  type="text"
                  className="w-[80%] max-[410px]:w-[60%] p-2 rounded-md border-2 border-gray-500"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  autoFocus
                  required
                />
              </div>

              <div className="flex justify-between my-4">
                <label htmlFor="" className="h-fit my-auto">
                  Position:
                </label>
                <input
                  type="text"
                  className="w-[80%] max-[410px]:w-[60%] p-2  rounded-md border-2 border-gray-500"
                  name="position"
                  value={userData.position}
                  onChange={handleInputChange}
                  autoFocus
                  required
                />
              </div>

              <div className="flex justify-between my-4">
                <label htmlFor="" className="h-fit my-auto">
                  Faculty:
                </label>
                <select
                  name="faculty"
                  className="w-[80%] max-[410px]:w-[60%] p-2 rounded-md border-2 border-gray-500"
                  value={userData.faculty}
                  onChange={onChangeFacultyData}
                  autoFocus
                  required>
                  <option value="">Select Faculty</option>
                  {faculty?.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between my-4">
                <label htmlFor="" className="h-fit my-auto">
                  School:
                </label>
                {/* className="w-[80%] p-2 rounded-md border-2 border-gray-500" */}
                <select
                  name="school"
                  value={userData.school}
                  onChange={onChangeSchoolData}
                  className="w-[80%] max-[410px]:w-[60%] p-2 rounded-md border-2 border-gray-500"
                  autoFocus
                  required>
                  <option value="">Select School</option>
                  {school?.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between my-4">
                <label htmlFor="" className="h-fit my-auto">
                  Department:
                </label>
                <select
                  name="department"
                  value={userData.department}
                  onChange={handleChange}
                  className="w-[80%] max-[410px]:w-[60%] p-2 rounded-md border-2 border-gray-500"
                  autoFocus
                  required>
                  <option value="">Select Department</option>
                  {department?.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between my-4">
                <label htmlFor="" className="h-fit my-auto">
                  Phone:
                </label>
                <input
                  type="text"
                  className="w-[80%] max-[410px]:w-[60%] p-2  rounded-md border-2 border-gray-500"
                  name="phone"
                  autoFocus
                  value={userData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-between my-4">
                <label htmlFor="" className="h-fit my-auto">
                  Email:
                </label>
                <input
                  type="email"
                  className="w-[80%] max-[410px]:w-[60%] p-2  rounded-md border-2 border-gray-500"
                  name="email"
                  onChange={handleInputChange}
                  value={userData.email}
                  autoFocus
                  required
                />
              </div>

              <div>
                <label htmlFor="" className="mr-10">
                  Notesheet Approval Rights:
                </label>
                <label className="mr-10">
                  <input
                    type="radio"
                    className="mx-2"
                    name="approval"
                    value="true"
                    checked={approved === true}
                    onChange={() => handleApprove(true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="approval"
                    value="false"
                    checked={approved === false}
                    onChange={() => handleApprove(false)}
                    className="mx-2"
                  />
                  No
                </label>
              </div>

              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="border-[3px] m-5 p-2 px-[30%] rounded-sm hover:scale-110 hover:shadow-md transition-all duration-200 hover:bg-slate-50"
                  style={{
                    borderImage: "linear-gradient(#fffac6, #ffbbaa) 10",
                  }}>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
