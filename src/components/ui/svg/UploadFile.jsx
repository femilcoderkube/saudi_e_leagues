import React, { useRef, useState } from "react";

const CustomFileUpload = ({
  hasImage,
  onFileChange,
  previewImage,
  onRemove,
  isReg = false,
}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    }
  };

  const handleUploadClick = () => {
    if (!hasImage) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (e) => {
    setFileName("");
    fileInputRef.current.value = "";
    onRemove();
    e.stopPropagation();
  };

  return (
    <div className="w-full h-32 max-w-md mx-auto text-center relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <div
        onClick={handleUploadClick}
        className={`cursor-${
          hasImage ? "default" : "pointer"
        } h-32 border-2 border-dashed border-[#7B7ED0] bg-gradient-to-br from-[#09092d] to-[#1a1a4a] p-4 rounded-xl shadow-lg hover:border-blue-500 transition-all duration-300 flex items-center justify-center relative overflow-hidden`}
      >
        {hasImage ? (
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <img
              src={previewImage}
              alt="Preview"
              className="object-cover h-[90px] max-w-[calc(100%-16px)]  border border-[#09092d]  rounded-md"
            />
            <button
              onClick={handleRemove}
              className="absolute top-[-8px] right-20 bg-red-600  text-white rounded-full text-[18px] w-8 h-8 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
            >
              <span className="mt-[-3px]">×</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-[#7B7ED0] text-lg font-medium">
              {isReg ? "Upload Profile Picture" : "Upload Photo"}
            </p>
            <p className="text-[#7B7ED0]/70 text-sm mt-1">
              Click to select an image
            </p>
          </div>
        )}
      </div>
      <style jsx>{`
        .relative:hover .absolute {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default CustomFileUpload;
