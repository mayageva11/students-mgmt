// components/DeleteButton.tsx
import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  onClick: () => void;
  title?: string;
}

export const DeleteButton = ({
  onClick,
  title = 'Delete'
}: DeleteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='text-red-600 hover:text-red-800 transition-colors'
      title={title}
    >
      <Trash2 className='h-5 w-5' />
    </button>
  );
};
