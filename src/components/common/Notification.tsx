import { useState, type JSX } from "react"
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"

type NotificationVariant = "info" | "success" | "warning" | "error"

type NotificationProps = {
  variant?: NotificationVariant
  title?: string
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

const baseStyles =
  "flex items-center gap-3 rounded-xl p-4 text-sm shadow-sm transition"

const variantStyles: Record<NotificationVariant, string> = {
  info: "bg-slate-100 text-info",
  success: "bg-green-100 text-success",
  warning: "bg-yellow-100 text-warning",
  error: "bg-red-100 text-error",
}

const variantIcons: Record<NotificationVariant, JSX.Element> = {
  info: <InformationCircleIcon className="h-5 w-5" />,
  success: <CheckCircleIcon className="h-5 w-5" />,
  warning: <ExclamationTriangleIcon className="h-5 w-5" />,
  error: <XMarkIcon className="h-5 w-5" />,
}

export function Notification({
  variant = "info",
  title,
  children,
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
      <div className="shrink-0 flex items-center justify-center mt-0.5">
        {variantIcons[variant]}
      </div>

      <div className="flex-1">
        {title && <p className="font-semibold mb-1">{title}</p>}
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
