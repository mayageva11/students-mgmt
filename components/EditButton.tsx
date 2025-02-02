// components/EditButton.tsx
import React from 'react';
import Link from 'next/link';
import { Pencil } from 'lucide-react';

interface EditButtonProps {
  id: string;
  title?: string;
}

export const EditButton = ({ id, title = 'Edit student' }: EditButtonProps) => {
  return (
    <Link
      href={`/editStudent?id=${id}`}
      className='text-blue-600 hover:text-blue-800 transition-colors'
      title={title}
    >
      <Pencil className='h-5 w-5' />
    </Link>
  );
};
