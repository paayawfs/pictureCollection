'use client';

import { useState } from 'react';

export default function FoodUploader() {
  const [foodName, setFoodName] = useState('');
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const CLOUD_NAME = "dulf6o3ub";
  const UPLOAD_PRESET = "capstone"; // Make sure you created this in Step 1!

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!foodName || files.length === 0) {
      alert("Please enter a food name and select pictures.");
      return;
    }

    setIsUploading(true);

    // Sanitize: "Banku and Fish" -> "banku_and_fish"
    const cleanLabel = foodName.trim().toLowerCase().replace(/\s+/g, '_');

    try {
      const uploadPromises = files.map(async (file, index) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);
        // This puts images into folders like: raw_data/banku/
        formData.append('folder', `raw_data/${cleanLabel}`);

        // Custom filename
        const uniqueName = `${cleanLabel}_${Date.now()}_${index}`;
        formData.append('public_id', uniqueName);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) throw new Error('Upload failed');
        return response.json();
      });

      await Promise.all(uploadPromises);

      alert(`Success! Uploaded ${files.length} images.`);
      setFiles([]);
      setFoodName('');
    } catch (error) {
      console.error(error);
      alert("Upload failed. Did you create the 'Unsigned' preset in Settings?");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Food Data Collector</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Food Name</label>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="e.g. Banku"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Photos</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-2 px-4 rounded-md text-white font-bold ${
            isUploading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Photos'}
        </button>
      </form>
    </div>
  );
}
