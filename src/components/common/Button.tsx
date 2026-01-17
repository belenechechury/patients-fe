import type { ReactNode, ButtonHTMLAttributes } from "react";
import { Tooltip } from "@/components/common/Tooltip";

type ButtonVariant = "primary" | "secondary" | "cancel" | "confirm";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  tooltip?: string;
  className?: string;
  disabled?: boolean;
  transparent?: boolean;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles =
  "cursor-pointer relative inline-flex items-center gap-2 rounded-xl font-medium transition " +
  "focus:outline-none focus:ring-2 focus:ring-offset-2 " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-700 focus:ring-primary-300",
  secondary:
    "bg-secondary-500 text-white hover:bg-secondary-700 focus:ring-secondary-500",
  confirm:
    "bg-success text-white hover:bg-success/90 focus:ring-success",
  cancel:
    "bg-error text-white hover:bg-error/90 focus:ring-error",
};

const transparentStyles: Record<ButtonVariant, string> = {
  primary: "bg-transparent text-primary-500 hover:text-primary-700 focus:ring-primary-300",
  secondary: "bg-transparent text-secondary-500 hover:text-secondary-700 focus:ring-secondary-500",
  confirm: "bg-transparent text-success hover:text-success/80 focus:ring-success",
  cancel: "bg-transparent text-error hover:text-error/80 focus:ring-error",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-sm h-8",
  md: "px-4 py-2 text-base h-10",
  lg: "px-6 py-3 text-lg h-12",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  tooltip,
  className = "",
  disabled = false,
  transparent = false,
  children,
  ...props
}: ButtonProps) {
  const isIconOnly = !children && icon;

  const styles = transparent
    ? transparentStyles[variant]
    : variantStyles[variant];

  const buttonContent = (
    <button
      {...props}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={isIconOnly && tooltip ? tooltip : props["aria-label"]}
      className={[
        baseStyles,
        styles,
        sizeStyles[size],
        isIconOnly ? "p-2 h-auto w-auto" : "",
        className,
      ].join(" ")}
    >
      {icon && (
        <span
          className={`flex items-center justify-center ${
            isIconOnly ? "h-5 w-5" : "h-5 w-5"
          }`}
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  );

  return tooltip && !disabled ? (
    <Tooltip content={tooltip}>{buttonContent}</Tooltip>
  ) : (
    buttonContent
  );
}
