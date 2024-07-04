import React, { useState } from 'react';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-orange-500 transition-shadow duration-300">
      <h3 className="mb-4 text-lg font-semibold">Upload File</h3>
      <form className="flex flex-col items-center">
        <label className="cursor-pointer mb-4 p-2 border border-gray-300 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300">
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {fileName && (
          <div className="mb-4 p-2 border border-gray-300 rounded shadow">
            <p className="text-sm text-gray-700">{fileName}</p>
          </div>
        )}
        {image && (
          <div className="p-2 border border-gray-300 rounded shadow-lg">
            <img src={image} alt="Uploaded" className="max-w-full max-h-48" />
          </div>
        )}
      </form>
    </div>
  );
};

export default ImageUploadForm;
