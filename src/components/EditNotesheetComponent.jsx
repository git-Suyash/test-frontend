import React, { useState } from 'react';
import ChainSelector from "./ChainSelectorComponent"; // Adjust the path as necessary

const EditNotesheetComponent = ({
  formData,
  setFormData,
  handleSubmit,
  availableApprovers,
  availableProposers,
  setSelectedApprovers,
  setSelectedProposers,
  initialApprovers,
  initialProposers,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      formData.eventDate &&
      formData.days &&
      formData.faculty &&
      formData.department &&
      formData.school &&
      formData.subject &&
      formData.objective &&
      formData.details
    ) {
      handleSubmit();
    } else {
      alert("Please fill in all the required fields.");
    }
  };

  const [Faculty] = useState(Object.keys(formData.faculty || {}));
  const [School, setSchool] = useState(null);
  const [Department, setDepartment] = useState(null);

  const onChangeFacultyData = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setSchool(null);
      setDepartment(null);
    }
    setFormData({ ...formData, [name]: value });
    if (value) setSchool(Object.keys(formData.faculty[value]));
  };

  const onChangeSchoolData = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setDepartment(null);
    }
    setFormData({ ...formData, [name]: value });
    if (value) setDepartment(formData.faculty[formData.facultyName][value]);
  };

  const pattern = "^[a-zA-Z0-9äöüÄÖÜ ,.-\"']*$";

  const [approved, setApproved] = useState(false);
  const handleApprove = (value) => {
    if (approved) {
      setFormData({ ...formData, "finance": null });
    }
    setApproved(value);
  };

  return (
    <div className="main-container w-[60%] bg-slate-50 rounded-md mx-auto shadow-md my-2">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">EDIT NOTESHEET</h2>
        <form onSubmit={onFormSubmit}>
          <div className="mb-4">
            <label className="inline-block w-32">Event Date:</label>
            <input
              type="date"
              name="eventDate"
              value={formData?.eventDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="inline-block w-32">Number of Days:</label>
            <input
              type="number"
              name="days"
              value={formData.days}
              onChange={handleChange}
              required
              pattern={pattern}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="inline-block w-32">Faculty:</label>
            <select
              name="faculty"
              value={formData.faculty}
              onChange={onChangeFacultyData}
              required
              className="w-full p-2 border rounded">
              <option value="">Select Faculty</option>
              {Faculty.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="inline-block w-32">School:</label>
            <select
              name="school"
              value={formData.school}
              onChange={onChangeSchoolData}
              required
              className="w-full p-2 border rounded">
              <option value="">Select School</option>
              {School &&
                School.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="inline-block w-32">Department:</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded">
              <option value="">Select Department</option>
              {Department &&
                Department.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="inline-block w-32">Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              pattern={pattern}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="inline-block w-32">Objective:</label>
            <input
              type="text"
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              required
              pattern={pattern}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="inline-block w-32">Finance:</label>
            <div className="inline-block">
              <label className="mr-4 inline-block">
                <input
                  type="radio"
                  name="approval"
                  value="true"
                  checked={approved === true}
                  onChange={() => handleApprove(true)}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-block">
                <input
                  type="radio"
                  name="approval"
                  value="false"
                  checked={approved === false}
                  onChange={() => handleApprove(false)}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {approved && (
            <div className="mb-4">
              <label className="inline-block w-32">Amount:</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                pattern={pattern}
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="inline-block w-32">Details:</label>
            <textarea
              type="text"
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
              pattern={pattern}
              style={{ height: "140px" }}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="inline-block w-48">Add Proposers</label>
            <ChainSelector
              onChange={(newValue) => setSelectedProposers(newValue)}
              availableOptions={availableProposers}
              getOptionLabel={(option) => option}
              initialOptions={initialProposers}
            />
          </div>

          <div className="mb-4">
            <label className="inline-block w-56">
              Add Authorities for Review
            </label>
            <ChainSelector
              onChange={(newValue) => setSelectedApprovers(newValue)}
              availableOptions={availableApprovers}
              getOptionLabel={(option) => option}
              initialOptions={initialApprovers}
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transform transition-transform duration-500 hover:scale-105">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotesheetComponent;
