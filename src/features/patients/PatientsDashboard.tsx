import React, { useState } from "react";
import type { IPatient } from "@/features/patients/types";
import PatientsList from "@/components/patients/PatientsList";

interface PatientDashboardProps {
  patients: IPatient[];
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patients }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"firstName" | "lastName" | "email">("firstName");
  const [patientList, setPatientList] = useState<IPatient[]>(patients);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid"); // <-- view state

  // Filter patients by any field
  const filteredPatients = patientList.filter((p) => {
    const query = search.toLowerCase();
    return (
      p.firstName.toLowerCase().includes(query) ||
      p.lastName.toLowerCase().includes(query) ||
      p.email.toLowerCase().includes(query) ||
      p.phone.toLowerCase().includes(query)
    );
  });

  // Sort filtered patients
  const sortedPatients = filteredPatients.sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy])
  );

  // Handle adding a new patient
  const handleAddPatient = () => {
    const newPatient: IPatient = {
      id: Date.now(),
      firstName: "New",
      lastName: "Patient",
      email: "new@example.com",
      phone: "+1 555 000 000",
      idImg: "https://via.placeholder.com/150",
    };
    setPatientList([newPatient, ...patientList]);
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>

        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 w-full max-w-md rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="firstName">Sort by First Name</option>
            <option value="lastName">Sort by Last Name</option>
            <option value="email">Sort by Email</option>
          </select>

          <button
            onClick={toggleViewMode}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
          >
            {viewMode === "grid" ? "Switch to List" : "Switch to Grid"}
          </button>

          <button
            onClick={handleAddPatient}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            + Add Patient
          </button>
        </div>
      </div>

      <PatientsList patients={sortedPatients} viewMode={viewMode} />
    </div>
  );
};

export default PatientDashboard;
