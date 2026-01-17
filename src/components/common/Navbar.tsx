import { useNavigate, useLocation } from "react-router-dom"
import { Dropdown } from "@/components/common/Dropdown"
import { BrandIcon } from "@/components/common/BrandIcon" // <- import your new component

type NavOption = "/" | "/appointments" | "/reports"

const navOptions = [
  { label: "Patients Dashboard", value: "/" },
  { label: "Appointments", value: "/appointments" },
  { label: "Reports", value: "/reports" },
] satisfies { label: string; value: NavOption }[]

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const currentValue =
    (navOptions.find(o => o.value === location.pathname)?.value ?? "/") as NavOption

  return (
    <header className="w-full h-16 bg-primary-500 flex items-center px-6 border-b border-gray-200">
      <div className="flex items-center justify-between w-full">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <BrandIcon size="md" color="text-white" />

          <span className="text-subheading text-white">
            Patients
          </span>
        </div>

        {/* Navigation dropdown */}
        <Dropdown<NavOption>
          value={currentValue}
          options={navOptions}
          onChange={(value) => navigate(value)}
          className="min-w-55"
        />
      </div>
    </header>
  )
}

export default Navbar
