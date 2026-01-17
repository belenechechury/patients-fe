import React from "react";
import PatientCard from "@/components/patients/PatientCard";
import type { IPatient } from "@/features/patients/types";

interface PatientListProps {
  patients: IPatient[];
  viewMode?: "grid" | "list";
  showEdit?: boolean;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
  onUpdate?: (updatedPatient: IPatient) => void;
}

const PatientList: React.FC<PatientListProps> = ({
  patients,
  viewMode = "grid",
  showEdit = false,
  showDelete = false,
  onDelete,
  onUpdate
}) => {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          : "flex flex-col gap-2"
      }
    >
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          showEdit={showEdit}
          showDelete={showDelete}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default PatientList;
