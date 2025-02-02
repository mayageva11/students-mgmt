// components/SubmitButton.tsx
import React from 'react';
interface SubmitButtonProps {
  isSubmitting: boolean;
  submitText?: string;
  loadingText?: string;
  className?: string;
  onClick?: (e: React.FormEvent) => Promise<void> | void;
}

export const SubmitButton = ({
  isSubmitting,
  submitText = 'Save Student',
  loadingText = 'Saving...',
  className = '',
  onClick
}: SubmitButtonProps) => {
  return (
    <button
      type='submit'
      disabled={isSubmitting}
      onClick={onClick}
      className={`flex-1 px-4 py-2 rounded-lg font-medium text-white
          ${
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } 
          transition-colors ${className}`}
    >
      {isSubmitting ? loadingText : submitText}
    </button>
  );
};
