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

// Dummy data representing complaints raised by the user.
const dummyComplaints = [
  {
    id: 1,
    title: "Plumbing Issue",
    description: "The tap in the bathroom is leaking.",
    resolved: false,
    date: "2025-01-15",
    type: "Hostel",
  },
  {
    id: 2,
    title: "Internet Connectivity",
    description: "Internet is very slow in the common room.",
    resolved: true,
    date: "2025-01-10",
    type: "Hostel",
  },
  {
    id: 3,
    title: "Mess Quality",
    description: "Food quality is declining in the mess.",
    resolved: false,
    date: "2025-01-20",
    type: "Mess",
  },
  {
    id: 4,
    title: "Cleaning Issue",
    description: "The hostel room is not being cleaned properly.",
    resolved: true,
    date: "2025-01-05",
    type: "Hostel",
  },
];

function TrackComplaintsPage() {
  // All complaints (fetched from API or dummy data)
  const [complaints, setComplaints] = useState([]);
  // Filter states for status and type
  const [statusFilter, setStatusFilter] = useState("All"); // "All", "Resolved", or "Unresolved"
  const [typeFilter, setTypeFilter] = useState("All"); // "All", "Hostel", or "Mess"

  // Options for the dropdown menus
  const statusOptions = ["All", "Resolved", "Unresolved"];
  const typeOptions = ["All", "Hostel", "Mess"];

  useEffect(() => {
    // Simulate fetching complaints from an API and sort so that the latest complaint is at the top.
    const sortedComplaints = dummyComplaints.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setComplaints(sortedComplaints);
  }, []);

  // Filter complaints based on the selected dropdown values.
  const getFilteredComplaints = () => {
    return complaints.filter((c) => {
      const statusMatches =
        statusFilter === "All" ||
        (statusFilter === "Resolved" && c.resolved) ||
        (statusFilter === "Unresolved" && !c.resolved);
      const typeMatches =
        typeFilter === "All" || c.type.toLowerCase() === typeFilter.toLowerCase();
      return statusMatches && typeMatches;
    });
  };

  const filteredComplaints = getFilteredComplaints();

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Track Your Complaints
      </h1>

      {/* Dropdown Filters */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block mb-2 text-lg">Status</label>
          <CustomDropdown
            options={statusOptions}
            placeholder="Select Status"
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
        <div>
          <label className="block mb-2 text-lg">Type</label>
          <CustomDropdown
            options={typeOptions}
            placeholder="Select Type"
            value={typeFilter}
            onChange={setTypeFilter}
          />
        </div>
      </div>

      {/* Complaints List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-gray-800 p-4 rounded-lg shadow flex flex-col"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{complaint.title}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    complaint.resolved ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {complaint.resolved ? "Resolved" : "Unresolved"}
                </span>
              </div>
              <p className="mt-2">{complaint.description}</p>
              <p className="mt-2 text-sm text-gray-400">
                Date: {complaint.date} | Type: {complaint.type}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center">No complaints found.</p>
        )}
      </div>
    </div>
  );
}

export default TrackComplaintsPage;
