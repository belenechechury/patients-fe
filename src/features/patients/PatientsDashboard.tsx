import React, { useState } from "react"
import type { IPatient } from "@/features/patients/types"
import PatientsList from "@/components/patients/PatientsList"
import { Dropdown } from "@/components/common/Dropdown"
import { Button } from "@/components/common/Button"
import { Notification } from "@/components/common/Notification"

import {
  PlusIcon,
  Squares2X2Icon,
  Bars3Icon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"

interface PatientDashboardProps {
  patients: IPatient[]
}

type SortBy = "firstName" | "lastName" | "email"
type ViewMode = "grid" | "list"

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patients }) => {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState<SortBy>("firstName")
  const [patientList, setPatientList] = useState<IPatient[]>(patients)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [showNotification, setShowNotification] = useState(false)

  const sortOptions = [
    { label: "Sort by First Name", value: "firstName" },
    { label: "Sort by Last Name", value: "lastName" },
    { label: "Sort by Email", value: "email" },
  ] satisfies { label: string; value: SortBy }[]

  const filteredPatients = patientList.filter((p) => {
    const query = search.toLowerCase()
    return (
      p.firstName.toLowerCase().includes(query) ||
      p.lastName.toLowerCase().includes(query) ||
      p.email.toLowerCase().includes(query) ||
      p.phone.toLowerCase().includes(query)
    )
  })

  const sortedPatients = filteredPatients.sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy])
  )

  const handleAddPatient = () => {
    const newPatient: IPatient = {
      id: Date.now(),
      firstName: "New",
      lastName: "Patient",
      email: "new@example.com",
      phone: "+1 555 000 000",
      idImg: "https://via.placeholder.com/150",
    }

    setPatientList([newPatient, ...patientList])
    setShowNotification(true)
  }

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-heading text-primary-700">
          Patients Dashboard
        </h1>

        {showNotification && (
          <Notification
            variant="success"
            title="Patient added"
            icon={<CheckCircleIcon className="h-5 w-5" />}
            onClose={() => setShowNotification(false)}
          >
            A new patient has been successfully added.
          </Notification>
        )}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 w-full max-w-md rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
          />

          <div className="flex flex-wrap items-center gap-2">
            <Dropdown
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
            />

            <Button
              variant="secondary"
              onClick={toggleViewMode}
              icon={
                viewMode === "grid"
                  ? <Bars3Icon className="h-5 w-5" />
                  : <Squares2X2Icon className="h-5 w-5" />
              }
            >
              {viewMode === "grid" ? "List view" : "Grid view"}
            </Button>

            <Button
              variant="primary"
              onClick={handleAddPatient}
              icon={<PlusIcon className="h-5 w-5" />}
            >
              Add Patient
            </Button>
          </div>
        </div>
      </div>

      <PatientsList 
        patients={sortedPatients} 
        viewMode={viewMode} 
        showEdit={true}
        onUpdate={() => {}} 
        showDelete={true}
        onDelete={() => {}} />
    </div>
  )
}

export default PatientDashboard
