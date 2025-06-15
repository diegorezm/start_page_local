import React from 'react';
import { Field, Label } from "@headlessui/react";
import { Input } from "../ui/input";
import { cn } from "../../lib/cn";
import type { FieldError, UseFormRegister } from 'react-hook-form';

interface ControlledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  inputSize?: "sm" | "md" | "lg";
}

export function ControlledInput({
  label,
  name,
  register,
  error,
  inputSize,
  className,
  ...rest
}: ControlledInputProps) {
  return (
    <Field className={cn("mb-4", className)}>
      <Label
        htmlFor={name}
        className="block text-sm font-medium text-foreground mb-1"
      >
        {label}
      </Label>
      <Input
        id={name}
        {...register(name)}
        inputSize={inputSize}
        className={cn(
          error ? "border-error focus:ring-error" : "border-foreground/20 focus:ring-primary",
          "block w-full"
        )}
        {...rest}
      />
      {error && (
        <p className="mt-1 text-xs text-error">
          {error.message}
        </p>
      )}
    </Field>
  );
}
