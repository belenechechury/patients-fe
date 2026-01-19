import { Dropdown } from "@/components/common/Dropdown";

type SortOption = {
  label: string;
  value: string;
};

interface SortBySelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  className?: string;
}

export function SortBySelect({ value, onChange, options, className = "" }: SortBySelectProps) {
  return (
    <div
      className={`p-2 flex items-center overflow-hidden ${className}`}
    >
      <span className="text-xs flex flex-col items-center justify-center text-gray-500">
        Sort by
      </span>

      <Dropdown
        value={value}
        onChange={onChange}
        options={options.map((opt) => ({ label: opt.label, value: opt.value }))}
      />
    </div>
  );
}
