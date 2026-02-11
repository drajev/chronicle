"use client";

import { useId } from "react";
import classes from "./Input.module.scss";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  ref?: React.Ref<HTMLInputElement>;
  label?: string;
  error?: string;
  className?: string;
}

const Input = ({
  label,
  error,
  className,
  id,
  ref,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const inputClasses = cn(
    classes.input,
    !!error && classes.inputError,
    className,
  );

  return (
    <div className={classes.wrapper}>
      {label && (
        <label className={classes.label} htmlFor={inputId}>
          {label}
          {props.required && <span className={classes.required}>*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span
          id={`${inputId}-error`}
          className={classes.error}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
