import React, { useState, useEffect, useRef } from "react";

// A reusable custom dropdown component
function CustomDropdown({ options, placeholder, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isBold, setBold] = useState(false);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setBold(true);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 bg-white border border-studark rounded-lg focus:outline-none focus:ring-2 focus:border-gray-700 text-left text-stubgcard ${
          isBold ? "font-bold" : "from-neutral-600"
        }`}
      >
        {value || placeholder}
        <span className="float-right">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full text-black bg-white border border-stucard rounded-lg mt-1 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                handleSelect(option);
              }}
              className="p-3 hover:bg-sidebarbtn cursor-pointer text-black"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ComplaintForm() {
  const [complaint, setComplaint] = useState("");
  const [media, setMedia] = useState(null); // Renamed from "image" to "media"
  const [preview, setPreview] = useState(null);
  const [complaintFor, setComplaintFor] = useState("");
  const [department, setDepartment] = useState("");

  const complaintForOptions = ["Hostel", "Mess"];
  const hostelOptions = [
    "Electricity",
    "Cleaning",
    "Plumbing",
    "Internet Connectivity",
    "Others",
  ];
  // const messOptions = ["Patel Mess", "Tilak Mess", "Tandon Mess"];

  const handleComplaintChange = (e) => setComplaint(e.target.value);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleComplaintForChange = (option) => {
    setComplaintFor(option);
    setDepartment(""); // Reset department selection when category changes
  };

  const handleDepartmentChange = (option) => setDepartment(option);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!complaintFor) {
      alert("Please select whether your complaint is for Hostel or Mess.");
      return;
    }

    if (!department) {
      alert("Please select the appropriate department or mess.");
      return;
    }

    if (!complaint.trim()) {
      alert("Please enter your complaint.");
      return;
    }

    const formData = new FormData();
    formData.append("complaintFor", complaintFor);
    formData.append("department", department);
    formData.append("complaint", complaint);
    if (media) formData.append("media", media); // Updated key to "media"

    // Replace with your API endpoint
    fetch("/api/complaint", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Reset the form
        setComplaint("");
        setMedia(null);
        setPreview(null);
        setComplaintFor("");
        setDepartment("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    // Full-page container with dark background
    <div className="min-h-screen w-screen bg-stubgdark flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-stucard rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          File Your Complaint
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Complaint For Custom Dropdown */}
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Complaint For:
            </label>
            <CustomDropdown
              options={complaintForOptions}
              placeholder="Select Category"
              value={complaintFor}
              onChange={handleComplaintForChange}
            />
          </div>

          {/* Department / Mess Custom Dropdown */}
          {complaintFor === "Hostel" && (
            <div>
              <label className="block text-lg font-medium text-gray-300 mb-2">
                {complaintFor === "Hostel" ? "Related Issue" : "Select Mess"}
              </label>
              <CustomDropdown
                options={complaintFor === "Hostel" ? hostelOptions : []}
                placeholder="Select Option"
                value={department}
                onChange={handleDepartmentChange}
              />
            </div>
          )}

          {/* Complaint Text */}
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Complaint:
            </label>
            <textarea
              value={complaint}
              onChange={handleComplaintChange}
              rows="5"
              placeholder="Write your complaint here..."
              className="w-full p-3 bg-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y text-stubgdark-200"
            />
          </div>

          {/* Media Attachment */}
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">
              Attach an Image or Video (Optional):
            </label>
            {/* Custom File Input */}
            <label className="flex items-center border border-gray-600 rounded overflow-hidden cursor-pointer">
              {/* Icon Section */}
              <span className="bg-gray-700 p-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </span>
              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*,video/*" // Accept both images and videos
                onChange={handleMediaChange}
                className="hidden"
              />
              {/* Placeholder Text */}
              <span className="flex-1 p-3 bg-gray-700 text-gray-200">
                Upload Media
              </span>
            </label>
          </div>

          {/* Media Preview */}
          {preview && (
            <div className="text-center">
              <p className="text-gray-300 mb-2">Media Preview:</p>
              {media && media.type.startsWith("video") ? (
                <video
                  src={preview}
                  controls
                  className="mx-auto rounded-lg max-h-80 object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto rounded-lg max-h-80 object-contain"
                />
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-stugreen text-white font-semibold rounded-lg shadow-lg transform hover:scale-102 transition duration-500"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComplaintForm;
