import { Button } from "@/components/common/Button";
import { Notification } from "@/components/common/Notification";
import PatientsList from "@/components/patients/PatientsList";
import type { IPatient } from "@/features/patients/types";
import { Bars3Icon, PlusIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

import EmptyPage from "@/components/common/EmptyPage";
import LoadingPage from "@/components/common/LoadingPage";
import { SortBySelect } from "@/components/common/SortBySelect";
import ToggleButtonGroup from "@/components/common/ToggleButtonGroup";
import { useCreatePatient, useDeletePatient, usePatients, useUpdatePatient } from "@/hooks/usePatients";

type SortBy = "firstName" | "lastName" | "email";
type ViewMode = "Grid" | "List";

interface LocalPatient extends IPatient {
  isEditing?: boolean;
}

interface NotificationData {
  message: string;
  variant: "success" | "error" | "info" | "warning";
}

const PatientDashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("firstName");
  const [viewMode, setViewMode] = useState<ViewMode>("Grid");
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [localPatients, setLocalPatients] = useState<LocalPatient[]>([]);

  const {
    patients: fetchedPatients,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePatients({ search, sortBy });

  const createMutation = useCreatePatient();
  const updateMutation = useUpdatePatient();
  const deleteMutation = useDeletePatient();

  const patients = [...localPatients, ...(fetchedPatients ?? [])];

  const handleAddPatient = () => {
    const newPatient: IPatient = {
      id: -1,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      countryIso: "",                    
      documentImage: "https://via.placeholder.com/150",
      isEditing: true
    };
    setLocalPatients((prev) => [newPatient, ...prev]);
  };

  const handleSave = (patient: LocalPatient, imageFile: File) => {
    if (patient.isEditing) {
      if (patient.id === -1) {
        createMutation.mutate({patient, imageFile},
          {
          onSuccess: () => {
            setNotification({ message: "Patient created successfully", variant: "success" });
            setLocalPatients((prev) => prev.filter((p) => p.id !== patient.id));
          },
          onError: () => setNotification({ message: "Error creating the patient", variant: "error" }),
        });
      } else {
        // Existing patient
        updateMutation.mutate({ id: patient.id, patient, imageFile }, {
          onSuccess: () => setNotification({ message: "Patient updated successfully", variant: "success" }),
          onError: () => setNotification({ message: "Error updating the patient", variant: "error" }),
        });
      }
    }
  };

  const handleCancel = (patient: LocalPatient) => {
    if (patient.id.toString().length > 10) {
      setLocalPatients((prev) => prev.filter((p) => p.id !== patient.id));
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => setNotification({ message: "Patient deleted successfully", variant: "success" }),
      onError: () => setNotification({ message: "Error deleting the patient", variant: "error" }),
    });
  };

  const toggleViewMode = () => setViewMode((prev) => (prev === "Grid" ? "List" : "Grid"));

  const sortOptions = [
    { label: "Name", value: "firstName" },
    { label: "Last name", value: "lastName" },
    { label: "Email", value: "email" },
  ] satisfies { label: string; value: SortBy }[];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-heading text-primary-700">Dashboard</h1>

        {notification && (
          <Notification
            variant={notification.variant}
            onClose={() => setNotification(null)}
          >
            {notification.message}
          </Notification>
        )}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-wrap items-center gap-2">
            <SortBySelect value={sortBy} onChange={(value) => setSortBy(value as SortBy)} options={sortOptions} />
            <ToggleButtonGroup
              options={[
                { value: "Grid", icon: <Squares2X2Icon className="h-5 w-5" /> },
                { value: "List", icon: <Bars3Icon className="h-5 w-5" /> },
              ]}
              value={viewMode}
              onChange={toggleViewMode}
              iconOnly={true}
              size="md"
            />
            <Button variant="primary" onClick={handleAddPatient} icon={<PlusIcon className="h-5 w-5" />}>
              Add
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingPage message="Loading patients" />
      ) : patients.length === 0 ? (
        <EmptyPage message="No patients to show" />
      ) : (
        <>
          <PatientsList
            patients={patients}
            viewMode={viewMode}
            showEdit
            showDelete
            onUpdate={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
            onLoadMore={hasNextPage ? fetchNextPage : undefined}
          />
          {isFetchingNextPage && <LoadingPage />}
        </>
      )}
    </div>
  );
};

export default PatientDashboard;
