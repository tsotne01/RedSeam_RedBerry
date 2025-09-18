
import React from "react";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name?: string;
    type: string;
    placeholder: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, IInput>(
    ({ label, name, type, placeholder, error, className, ...rest }, ref) => {
        return (
            <div className={className}>
                <label className="hidden" htmlFor={name}>{label}</label>
                <input
                    ref={ref}
                    className="h-full w-full rounded-[8px] px-3 py-2.5 bg-white border-1 border-[#E1DFE1]"
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    {...rest}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        )
    }
);

Input.displayName = "Input";
