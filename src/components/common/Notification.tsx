import { useState } from "react"
import type { ReactNode } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

type NotificationVariant = "info" | "success" | "warning" | "error"

type NotificationProps = {
  variant?: NotificationVariant
  title?: string
  children: ReactNode
  icon?: ReactNode
  onClose?: () => void
  className?: string
}

const baseStyles =
  "flex items-start gap-3 rounded-xl p-4 text-sm shadow-sm transition"

const variantStyles: Record<NotificationVariant, string> = {
  info: "bg-slate-100 text-info",
  success: "bg-primary-100 text-success",
  warning: "bg-yellow-100 text-warning",
  error: "bg-red-100 text-error",
}

export function Notification({
  variant = "info",
  title,
  children,
  icon,
  onClose,
  className = "",
}: NotificationProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  const handleClose = () => {
    setVisible(false)
    onClose?.()
  }

  return (
    <div
      role="alert"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {icon && (
        <div className="mt-0.5 h-5 w-5 shrink-0">
          {icon}
        </div>
      )}

      <div className="flex-1">
        {title && (
          <p className="font-semibold mb-1">{title}</p>
        )}
        <div>{children}</div>
      </div>

      <button
        onClick={handleClose}
        aria-label="Close notification"
        className="rounded-md p-1 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
