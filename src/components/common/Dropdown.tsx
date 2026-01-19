type Option<T extends string> = {
  label: string
  value: T
}

type DropdownProps<T extends string> = {
  value: T
  onChange: (value: T) => void
  options: Option<T>[]
}

export function Dropdown<T extends string>({
  value,
  onChange,
  options
}: DropdownProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
    >
      {options.map((option) => (
        <option className="text-sm" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
