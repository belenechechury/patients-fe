import type { IPatient } from "@/features/patients/types";
import React, { useState } from "react";

interface PatientCardProps {
  patient: IPatient;
  showEdit?: boolean;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
  onUpdate?: (updatedPatient: IPatient) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  showEdit = false,
  showDelete = false,
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState<IPatient>({ ...patient });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onUpdate) onUpdate(formData);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 m-2 w-72 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={formData.idImg}
            alt={`${formData.firstName} ${formData.lastName}`}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            {isEditing ? (
              <>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 w-24"
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-2 py-1 w-24 ml-1"
                />
              </>
            ) : (
              <h2 className="text-lg font-bold text-gray-800">
                {formData.firstName} {formData.lastName}
              </h2>
            )}
            {isEditing ? (
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full mt-1"
              />
            ) : (
              <p className="text-sm text-gray-500">{formData.email}</p>
            )}
            {isEditing ? (
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full mt-1"
              />
            ) : (
              <p className="text-sm text-gray-500">{formData.phone}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-gray-400 hover:text-gray-600 transition-transform"
          >
            {expanded ? "▼" : "▶"}
          </button>

          {showEdit && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Edit
            </button>
          )}

          {isEditing && (
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-700 font-semibold"
            >
              Save
            </button>
          )}

          {showDelete && onDelete && (
            <button
              onClick={() => onDelete(patient.id)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Expandable section */}
      {expanded && !isEditing && (
        <div className="mt-3 text-gray-600">
          <p>
            <span className="font-semibold">Full Name:</span> {formData.firstName} {formData.lastName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {formData.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {formData.phone}
          </p>
          <p>
            <span className="font-semibold">ID Image URL:</span> {formData.idImg}
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
