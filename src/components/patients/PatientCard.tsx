import React, { useState, useRef } from "react";
import type { IPatient } from "@/features/patients/types";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import {
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  ChevronRightIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/common/Button";
import { Dropdown } from "@/components/common/Dropdown";
import { FormInputError } from "../common/FormInputError";
import { getDocumentUrl } from "@/utils/getDocumentUrl";

countries.registerLocale(enLocale);

interface PatientCardProps {
  patient: IPatient & { isEditing?: boolean };
  showEdit?: boolean;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
  onUpdate?: (updatedPatient: IPatient, updatedFile: File) => void;
  onCancel?: (patient: IPatient) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  showEdit = false,
  showDelete = false,
  onDelete,
  onUpdate,
  onCancel,
}) => {
  const [isEditing, setIsEditing] = useState(patient.isEditing ?? false);
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState<IPatient>({ ...patient });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attemptedSave, setAttemptedSave] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const countryOptions = Object.entries(
    countries.getNames("en", { select: "official" })
  ).map(([code, name]) => ({ value: code, label: name }));

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!/^[a-zA-Z]+$/.test(formData.firstName)) newErrors.firstName = "Only letters allowed";
    if (!/^[a-zA-Z]+$/.test(formData.lastName)) newErrors.lastName = "Only letters allowed";
    if (!/^[^\s@]+@gmail\.com$/.test(formData.email)) newErrors.email = "Must be a Gmail address";
    if (!formData.countryIso || !countries.isValid(formData.countryIso))
      newErrors.countryIso = "Invalid country";
    if (!/^\d{6,15}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "6-15 digits required";

    // Image required for new or edited patient without previous image
    if (!imageFile && !formData.documentImagePath) newErrors.documentImagePath = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (attemptedSave) setErrors({});
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, countryIso: value }));
    if (attemptedSave) setErrors({});
  };

  const handleImageSelect = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      setErrors({ documentImagePath: "Max size 2MB" });
      return;
    }
    if (!["image/jpeg", "image/jpg"].includes(file.type)) {
      setErrors({ documentImagePath: "Only JPG images allowed" });
      return;
    }

    setImageFile(file);

    setFormData((prev) => ({ ...prev, documentImagePath: URL.createObjectURL(file) }));

    if (attemptedSave) setErrors({});
  };

  const handleSave = () => {
    setAttemptedSave(true);
    if (!validate()) return;

    setIsEditing(false);
    setErrors({});
    setAttemptedSave(false);

    if (onUpdate && imageFile) onUpdate(formData, imageFile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...patient });
    setImageFile(null);
    setErrors({});
    setAttemptedSave(false);
    if (onCancel) onCancel(patient);
  };

  const formatLabel = (field: string) => field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const saveDisabled = attemptedSave && Object.keys(errors).length > 0;

  return (
    <div className="bg-white shadow-sm rounded-2xl p-4 m-2 hover:shadow-md border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {/* Image Upload */}
          <div
            className={`h-12 w-12 rounded-full overflow-hidden border border-gray-300 cursor-pointer flex items-center justify-center relative ${isEditing ? "bg-gray-100" : ""
              }`}
            onDrop={
              isEditing
                ? (e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files[0]) handleImageSelect(e.dataTransfer.files[0]);
                  }
                : undefined
            }
            onDragOver={isEditing ? (e) => e.preventDefault() : undefined}
            onClick={() => isEditing && fileInputRef.current?.click()}
          >
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : getDocumentUrl(formData.documentImagePath) || "/placeholder.png"}
              alt={`${formData.firstName} ${formData.lastName}`}
              className="h-full w-full object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 text-white opacity-0 hover:opacity-100 transition-opacity">
                <ArrowUpOnSquareIcon className="h-5 w-5" />
              </div>
            )}
            <input
              type="file"
              accept="image/jpeg,image/jpg"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
            />
          </div>

          <div className="flex flex-col w-full">
            {isEditing ? (
              <div className="space-y-2">
                {["firstName", "lastName", "email"].map((field) => (
                  <div key={field} className="flex flex-col relative">
                    <label className="text-xs font-semibold text-primary-700">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      name={formatLabel(field)}
                      value={formData[field as keyof IPatient] as string}
                      onChange={handleChange}
                      className={`border rounded px-2 py-1 focus:ring-2 focus:ring-primary-300 ${errors[field] ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    <FormInputError message={errors[field]} />
                  </div>
                ))}

                <div className="flex gap-2 items-end">
                  <div className="flex-1 flex flex-col">
                    <label className="text-xs font-semibold text-primary-700">Country</label>
                    <Dropdown options={countryOptions} value={formData.countryIso} onChange={handleCountryChange} />
                    <FormInputError message={errors["countryIso"]} />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="text-xs font-semibold text-primary-700">Phone</label>
                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`border rounded px-2 py-1 focus:ring-2 focus:ring-primary-300 ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    <FormInputError message={errors["phoneNumber"]} />
                  </div>
                </div>

                <FormInputError message={errors["documentImagePath"]} />

                <div className="flex gap-2 mt-2">
                  <Button
                    variant="confirm"
                    icon={<CheckIcon className="h-5 w-5" />}
                    onClick={handleSave}
                    disabled={saveDisabled}
                  />
                  <Button variant="secondary" icon={<XMarkIcon className="h-5 w-5" />} onClick={handleCancel} />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-primary-700">
                  {formData.firstName} {formData.lastName}
                </h2>
                <div className="flex items-center gap-2">
                  {showEdit && (
                    <Button
                      size="sm"
                      transparent
                      variant="primary"
                      icon={<PencilIcon className="h-5 w-5" />}
                      onClick={() => setIsEditing(true)}
                    />
                  )}
                  {showDelete && onDelete && (
                    <Button
                      size="sm"
                      transparent
                      variant="cancel"
                      icon={<TrashIcon className="h-5 w-5" />}
                      onClick={() => onDelete(formData.id)}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {!isEditing && (
          <button
            className={`p-1 transform transition-transform ${expanded ? "rotate-90" : ""}`}
            onClick={() => setExpanded((prev) => !prev)}
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>

      {expanded && !isEditing && (
        <div className="mt-3 text-gray-600 text-sm space-y-1">
          <p>
            <span className="font-semibold text-primary-700">Full Name:</span> {formData.firstName} {formData.lastName}
          </p>
          <p>
            <span className="font-semibold text-primary-700">Email:</span> {formData.email}
          </p>
          <p>
            <span className="font-semibold text-primary-700">Country:</span> {formData.countryIso}
          </p>
          <p>
            <span className="font-semibold text-primary-700">Phone:</span> {formData.phoneNumber}
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
