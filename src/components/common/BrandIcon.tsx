import { HeartIcon, PlusIcon } from "@heroicons/react/24/solid"

type BrandIconSize = "sm" | "md" | "lg"

type BrandIconProps = {
  size?: BrandIconSize
  color?: string
  className?: string
}

const sizeMap = {
  sm: { container: "w-8 h-8", heart: "h-8 w-8", plus: "h-3 w-3" },
  md: { container: "w-10 h-10", heart: "h-10 w-10", plus: "h-4 w-4" },
  lg: { container: "w-14 h-14", heart: "h-14 w-14", plus: "h-6 w-6" },
}

export function BrandIcon({
  size = "md",
  color = "text-primary-500",
  className = "",
}: BrandIconProps) {
  const { container, heart, plus } = sizeMap[size]

  return (
    <div className={`relative ${container} ${className}`}>
      <HeartIcon className={`absolute top-0 left-0 ${heart} ${color}`} />
      <PlusIcon className={`absolute bottom-0 right-0 ${plus} ${color}`} />
    </div>
  )
}
