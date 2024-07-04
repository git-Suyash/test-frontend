import React, { useState } from 'react';
import ChainSelector from './ChainSelectorComponent'; // Adjust the path to your ChainSelectorComponent

export const CreateNotesheetComponent = ({
  formData,
  setFormData,
  handleSubmit,
  availableApprovers,
  availableProposers,
  setSelectedApprovers,
  setSelectedProposers,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      formData.date &&
      formData.department &&
      formData.school &&
      formData.subject &&
      formData.objective &&
      formData.details
    ) {
      handleSubmit();
    } else {
      alert('Please fill in all the required fields.');
    }
  };

  const [approved, setApproved] = useState(false);

  const handleApprove = (value) => {
    if (approved) {
      setFormData({ ...formData, finance: null });
    }
    setApproved(value);
  };

  return (
    <div className="flex justify-center items-center bg-primary min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg transform transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Create Note Sheet</h2>
        <form className="space-y-6" onSubmit={onFormSubmit}>
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Event Date:</label>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-orange-300"
              name="date"
              min={`${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${(
                '0' + new Date().getDate()
              ).slice(-2)}`}
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">School:</label>
            <select
              name="school"
              className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-orange-300"
              value={formData.school}
              onChange={handleChange}
              required
            >
              <option value="">Select School</option>
              {formData.faculty &&
                Object.keys(formData.faculty).map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Department:</label>
            <select
              name="department"
              className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-orange-300"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {formData.school &&
                formData.faculty[formData.school].map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Subject:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-orange-300"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Objective:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-orange-300"
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Finance:</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="approval"
                  value="true"
                  checked={approved === true}
                  onChange={() => handleApprove(true)}
                  className="form-radio text-blue-500 transition-all duration-300 ease-in-out"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="approval"
                  value="false"
                  checked={approved === false}
                  onChange={() => handleApprove(false)}
                  className="form-radio text-blue-500 transition-all duration-300 ease-in-out"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {approved && (
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700">Amount in Rupees:</label>
              <input
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-orange-300"
                name="finance"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Details:</label>
            <textarea
              className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 ease-in-out hover:bg-orange-300"
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Add Proposers:</label>
            <ChainSelector
              onChange={(newValue) => setSelectedProposers(newValue)}
              availableOptions={availableProposers}
              getOptionLabel={(option) => option.name}
              className="transition-all duration-300 ease-in-out hover:translate-y-1"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Add Authorities for Review:</label>
            <ChainSelector
              onChange={(newValue) => setSelectedApprovers(newValue)}
              availableOptions={availableApprovers}
              getOptionLabel={(option) => option.name}
              className="transition-all duration-300 ease-in-out hover:translate-y-1"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md transform transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

