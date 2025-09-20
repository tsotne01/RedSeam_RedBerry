import React, { type ReactNode } from "react";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  type: string;
  placeholder: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, IInput>(
  (
    { label, name, type, placeholder, error, className, icon, ...rest },
    ref
  ) => {
    return (
      <div className={`${className} relative`}>
        <label className="hidden" htmlFor={name}>
          {label}
        </label>
        {icon && (
          <div
            className="absolute top-1/2 left-2 -translate-y-1/2"
          >
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`${
            icon && "pl-8"
          } h-full w-full rounded-[8px] px-3 py-2.5 bg-white border-1 border-[#E1DFE1]`}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          {...rest}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
