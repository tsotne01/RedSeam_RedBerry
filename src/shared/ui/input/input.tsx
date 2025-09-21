
import React, { useState, type ReactNode } from "react";

import PasswordVisible from "../../../assets/icons/password_visible.svg";
import PasswordInvisible from "../../../assets/icons/password_invisible.svg";

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
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
      <div className={`${className} relative`}>
        <label className="hidden" htmlFor={name}>
          {label}
        </label>
        {icon && (
          <div className="absolute top-1/2 left-2 -translate-y-1/2">{icon}</div>
        )}
        {type == "password" && (
          <div
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          >
            <img
              src={isPasswordVisible ? PasswordVisible : PasswordInvisible}
              alt="visibility"
            />
          </div>
        )}
        <input
          ref={ref}
          className={`${
            icon && "pl-8"
          } h-full w-full rounded-[8px] px-3 py-2.5 bg-white border-1 border-[#E1DFE1]`}
          type={isPasswordVisible ? "text" : type}
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
