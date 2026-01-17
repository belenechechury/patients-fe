import React from "react";
import PatientCard from "@/components/patients/PatientCard";
import type { IPatient } from "@/features/patients/types";

interface PatientListProps {
  patients: IPatient[];
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  return (
    <div className="flex flex-wrap justify-start">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
};

export default PatientList;
