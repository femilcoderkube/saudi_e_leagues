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
  const [error, setError] = useState(null); // State to manage validation errors

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic validation: check if the file is an image
      if (file.type.startsWith("image/")) {
        setFileName(file.name);
        setError(null); // Clear any previous error
        onFileChange(file); // Pass the valid file to the parent component
      } else {
        // Validation failed: not an image
        setFileName("");
        setError("Please upload an image file (e.g., JPG, PNG, GIF)."); // Set error message
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the input field
        }
        // Do not call onFileChange with an invalid file.
        // The parent component should only receive valid files.
      }
    } else {
      // No file selected (e.g., user cancelled the file picker)
      setFileName("");
      setError(null); // Clear error if no file is selected
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onFileChange(null); // Notify parent that the file has been cleared or no file was selected
    }
  };

  const handleUploadClick = () => {
    if (!hasImage) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (e) => {
    setFileName("");
    setError(null); // Clear error on file removal
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onRemove();
    e.stopPropagation();
  };

  return (
    <div className="sm:w-full max-w-md mx-auto text-center relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <div
        onClick={handleUploadClick}
        className={`cursor-${hasImage ? "default" : "pointer"} ${isReg ? "w-full" : "sm:w-[7rem] w-[6.25rem]"} sm:h-[7rem] h-[6.25rem] border-2 border-dashed border-[#7B7ED0] bg-gradient-to-br from-[#09092d] to-[#1a1a4a] sm:p-2 p-1.5 rounded-xl shadow-lg hover:border-blue-500 transition-all duration-300 flex items-center justify-center relative overflow-hidden m-auto`}
      >
        {hasImage ? (
          <>
            <div className="w-full h-full absolute top-0 left-0">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover border border-[#09092d] rounded-md"
                style={{ display: "block" }}
              />
            </div>
            <button
              onClick={handleRemove}
              className="absolute top-1 left-1 bg-red-600 text-white rounded-full text-[18px] w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
              type="button"
            >
              <span className="mt-[-3px]">×</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="text-[#7B7ED0] md:text-lg sm:text-base text-sm font-medium">
              {isReg ? "Upload Profile Picture" : "Upload Photo"}
            </p>
            <p className="text-[#7B7ED0]/70 text-sm mt-1">
              Click to select an image
            </p>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-base mt-2">{error}</p> // Display error message
      )}
      <style jsx="true">{`
        .relative:hover .absolute {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default CustomFileUpload;
