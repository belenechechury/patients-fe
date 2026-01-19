import React from "react";

interface ToggleOption {
  value: string | number;
  label?: string;
  icon?: React.ReactNode;
}

interface ToggleButtonGroupProps {
  options: ToggleOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean; // new prop
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  options,
  value,
  onChange,
  size = "md",
  iconOnly = false,
}) => {
  const paddingClass = size === "sm" ? "p-1" : size === "lg" ? "p-3" : "p-2";

  return (
    <div className="flex rounded-xl overflow-hidden">
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            title={iconOnly ? String(option.value) : undefined}
            className={`${paddingClass} flex items-center justify-center gap-1 transition-colors ${
              isActive
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {option.icon}
            {!iconOnly && option.label && <span>{option.label}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default ToggleButtonGroup;
