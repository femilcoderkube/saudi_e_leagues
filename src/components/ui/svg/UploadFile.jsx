import React, { useRef, useState } from "react";

const CustomFileUpload = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={handleUploadClick}
        className="cursor-pointer border-2 border-dashed border-[#7B7ED0] sd_radial-bg p-4 rounded-lg hover:border-blue-500 transition"
      >
        <p className="purple_col text-lg">Upload Photo</p>
        {fileName && (
          <p className="mt-2 text-blue-500 font-medium truncate">{fileName}</p>
        )}
      </div>
    </div>
  );
};

export default CustomFileUpload;
