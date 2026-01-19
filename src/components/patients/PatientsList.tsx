import React, { useRef, useEffect, useCallback } from "react";
import PatientCard from "@/components/patients/PatientCard";
import type { IPatient } from "@/features/patients/types";

interface PatientListProps {
  patients: IPatient[];
  viewMode?: "Grid" | "List";
  showEdit?: boolean;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
  onUpdate?: (updatedPatient: IPatient, imageFile?: File) => void;
  onCancel?: (patient: IPatient) => void;
  onLoadMore?: () => void;
}

const PatientList: React.FC<PatientListProps> = ({
  patients,
  viewMode = "Grid",
  showEdit = false,
  showDelete = false,
  onDelete,
  onUpdate,
  onCancel,
  onLoadMore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !onLoadMore) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      onLoadMore();
    }
  }, [onLoadMore]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className={viewMode === "Grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-auto max-h-[70vh]" : "flex flex-col gap-2 overflow-auto max-h-[70vh]"}
    >
      {patients.map((patient) => (
        <PatientCard
          key={`patient-card-${patient.id}`}
          patient={patient}
          showEdit={showEdit}
          showDelete={showDelete}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
};

export default PatientList;
