// components/CancelButton.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

interface CancelButtonProps {
  disabled?: boolean;
  text?: string;
  className?: string;
  onClick?: () => void;
}

export const CancelButton = ({
  disabled = false,
  text = 'Cancel',
  className = '',
  onClick
}: CancelButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={disabled}
      className={`flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 ${className}`}
    >
      {text}
    </button>
  );
};
