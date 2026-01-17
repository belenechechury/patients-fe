type Option<T extends string> = {
  label: string
  value: T
}

type DropdownProps<T extends string> = {
  value: T
  onChange: (value: T) => void
  options: Option<T>[]
  className?: string
}

export function Dropdown<T extends string>({
  value,
  onChange,
  options,
  className = "",
}: DropdownProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={`
        p-2 rounded-xl border border-gray-300 bg-white
        text-body text-info
        focus:outline-none focus:ring-2 focus:ring-primary-500
        hover:border-primary-300
        ${className}
      `}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
