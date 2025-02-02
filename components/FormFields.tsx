// components/FormField.tsx
import React from 'react';
import { ChangeEvent } from 'react';

interface FormFieldProps {
  label: string;
  type: 'text' | 'date' | 'number';
  id: string;
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
}

export const FormField = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  min,
  max
}: FormFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='block text-sm font-medium text-gray-700 mb-1'
      >
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        className={
          'block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:ring-1 ' +
          (error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500')
        }
      />
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
};
