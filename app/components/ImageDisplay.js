"use client";
import { CldImage } from 'next-cloudinary';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function ImageDisplay() {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Sample Image</h2>
      <CldImage
        src="cld-sample-5" // Use this sample image or upload your own via the Media Library
        width="500" // Transform the image: auto-crop to square aspect_ratio
        height="500"
        crop={{
          type: 'auto',
          source: true
        }}
        alt="Sample image from Cloudinary"
      />
    </div>
  );
}
