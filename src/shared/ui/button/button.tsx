import React from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size: "small" | "large";
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const buttonStyles = {
  base: "w-full",
  primary: "bg-[#FF4000] text-white",
  secondary: "bg-white text-black",
};

const buttonSize = {
  small: "px-24 py-2.5 text-base",
  large: "px-20 py-4 text-lg",
};

export const Button = ({
  variant = "primary",
  size = "small",
  icon,
  children,
  ...rest
}: IButton) => {
  return (
    <button
      {...rest}
      className={`${buttonStyles["base"]} ${buttonStyles[variant]} ${buttonSize[size]} flex items-center gap-2.5`}
    >
      {icon}
      {children}
    </button>
  );
};
