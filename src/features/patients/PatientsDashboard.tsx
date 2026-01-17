
import React, { useState } from "react";
import type { IPatient } from "@/features/patients/types";
import PatientList from "@/components/patients/PatientsList";

interface PatientDashboardProps {
  patients: IPatient[];
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patients }) => {
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter(
    (p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Patient Dashboard</h1>

      <input
        type="text"
        placeholder="Search patients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-3 w-full max-w-md rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <PatientList patients={filteredPatients} />
    </div>
  );
};

export default PatientDashboard;
