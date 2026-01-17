import type { IPatient } from "@/features/patients/types";
import React, { useState } from "react";
import { PencilIcon, TrashIcon, XMarkIcon, CheckIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";

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

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...patient }); // revert changes
  };

  return (
    <div className="bg-white shadow-sm rounded-2xl p-4 m-2 hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-start justify-between">
        {/* Avatar + info */}
        <div className="flex items-center space-x-4">
          <img
            src={formData.idImg}
            alt={`${formData.firstName} ${formData.lastName}`}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="flex flex-col w-full">
            {isEditing ? (
              <div className="space-y-2">
                {/** First Name */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-primary-700">First Name</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-300"
                  />
                </div>
                {/** Last Name */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-primary-700">Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-300"
                  />
                </div>
                {/** Email */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-primary-700">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-300"
                  />
                </div>
                {/** Phone */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-primary-700">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-300"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex">
                  <h2 className="text-lg font-semibold text-primary-700">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  {isEditing ? (
                    <>
                      <Button
                        variant="confirm"
                        icon={<CheckIcon className="h-5 w-5" />}
                        tooltip="Save"
                        onClick={handleSave}
                      />
                      <Button
                        variant="secondary"
                        icon={<XMarkIcon className="h-5 w-5" />}
                        tooltip="Cancel"
                        onClick={handleCancel}
                      />
                    </>
                  ) : (
                    showEdit && (
                      <Button
                        size="sm"
                        transparent={true}
                        variant="primary"
                        icon={<PencilIcon className="h-5 w-5" />}
                        tooltip="Edit"
                        onClick={() => setIsEditing(true)}
                      />
                    )
                  )}

                  {showDelete && onDelete && !isEditing && (
                    <Button
                      size="sm"
                      transparent={true}
                      variant="cancel"
                      icon={<TrashIcon className="h-5 w-5" />}
                      tooltip="Delete"
                      onClick={() => onDelete(patient.id)}
                    />
                  )}
                </div>
                <p className="text-sm text-gray-500">{formData.email}</p>
                <p className="text-sm text-gray-500">{formData.phone}</p>
              </>
            )}
          </div>
        </div>

        {/** Caret */}
        <div className="flex items-center space-x-2 ml-2">
          <Button
            variant="secondary"
            transparent={true}
            icon={<ChevronRightIcon className="h-5 w-5" />}
            tooltip="Expand"
            onClick={() => setExpanded((prev) => !prev)}
            className={`${expanded ? "rotate-90 transform" : ""}`}
          />
        </div>
      </div>

      {/** Expandable section */}
      {expanded && !isEditing && (
        <div className="mt-3 text-gray-600 text-sm space-y-1">
          <p>
            <span className="font-semibold text-primary-700">Full Name:</span> {formData.firstName} {formData.lastName}
          </p>
          <p>
            <span className="font-semibold text-primary-700">Email:</span> {formData.email}
          </p>
          <p>
            <span className="font-semibold text-primary-700">Phone:</span> {formData.phone}
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
