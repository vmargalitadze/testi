"use client";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CloudinaryUploaderProps {
  onChange: (urls: string[]) => void;
  value: string[];
}

const CloudinaryUploader = ({
  onChange,
  value = [],
}: CloudinaryUploaderProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>(value);

  useEffect(() => {
    onChange(imageUrls);
  }, [imageUrls, onChange]);

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    if (!result.info || typeof result.info === "string") return;

 
    const info = Array.isArray(result.info) ? result.info : [result.info];

    const urls = info
      .map((item) => item.secure_url)
      .filter((url): url is string => typeof url === "string");

    if (urls.length === 0) return;

    setImageUrls((prev) => [...prev, ...urls]);
  };

  const handleDelete = (urlToDelete: string) => {
    setImageUrls((prev) => prev.filter((url) => url !== urlToDelete));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
          onUpload={handleUpload}
          options={{
            maxFiles: 5,
            sources: ["local"],
            multiple: true,
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Upload Images
        </CldUploadButton>
        <span className="text-sm text-gray-500">
          {imageUrls.length} / 5 images
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imageUrls.map((url, index) => (
          <div key={url} className="relative group aspect-square">
            <Image
              src={url}
              alt={`Uploaded image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleDelete(url)}
              className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudinaryUploader;
