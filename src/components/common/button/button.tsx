import clsx from "clsx";
import Link from "next/link";
import * as React from "react";
import { Spinner } from "../spinner/spinner";
import { Typography } from "../typography";

export interface ButtonProps {
  size?: "extra-small" | "small" | "normal" | "medium" | "large" | "full";
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  fill?: boolean;
  labelProps?: string;
  href?: string;
  decoration?: "fill" | "line-white" | "line-primary" | "fillPrimary";
  social?: "facebook" | "google";
  icon?: any;
  className?: string;
  withBorder?: boolean;
  boderRadius?: string;
  type?: string;
  tag?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  size,
  label,
  disabled,
  onClick,
  decoration,
  icon,
  withBorder = true,
  className,
  loading,
  labelProps,
  children,
  type,
  ...props
}) => {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={clsx(
          // with border
          { "border-none": !withBorder },
          //size
          { "w-full": size === "full" },

          //fill
          {
            "bg-secondary border-transparent shadow-md text-white":
              decoration === "fill" && !disabled,
          },
          {
            "bg-white border-secondary shadow-md text-secondary":
              decoration === "fill" && disabled,
          },

          //global
          "group flex items-center justify-center border rounded-xl outline-none transition-colors duration-200",
          "focus:outline-none",
          "disabled:cursor-not-allowed font-bold text-lg",
          { "px-6 py-2": size === "small" },
          { "px-10 py-2": size === "normal" },
          { "px-16 py-4": size === "medium" },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export const ButtonContent: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  size,
  label,
  disabled,
  onClick,
  href,
  decoration = "fill",
  social,
  icon,
  children,
  tag = false,
  className,
  type,
  ...props
}) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <a>
            <Button
              size={size}
              label={label}
              disabled={disabled}
              href={href}
              decoration={decoration}
              social={social}
              icon={icon}
              tag={tag}
              className={className}
              type={type}
              {...props}
            >
              {children}
            </Button>
          </a>
        </Link>
      ) : (
        <Button
          size={size}
          label={label}
          disabled={disabled}
          onClick={onClick}
          href={href}
          decoration={decoration}
          social={social}
          icon={icon}
          tag={tag}
          type={type}
          className={className}
          {...props}
        >
          {children}
        </Button>
      )}
    </>
  );
};
