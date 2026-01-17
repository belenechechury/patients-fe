import type { IPatient } from "@/features/patients/types";
import React from "react";

interface PatientCardProps {
  patient: IPatient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 m-2 w-72 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <img
          src={patient.idImg}
          alt={`${patient.firstName} ${patient.lastName}`}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {patient.firstName} {patient.lastName}
          </h2>
          <p className="text-sm text-gray-500">{patient.email}</p>
          <p className="text-sm text-gray-500">{patient.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
