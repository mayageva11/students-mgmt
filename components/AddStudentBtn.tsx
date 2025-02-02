import React from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

interface AddButtonProps {
  href: string;
  text: string;
}

export const AddButton = ({ href, text }: AddButtonProps) => {
  return (
    <Link
      href={href}
      className='inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
    >
      <PlusCircle className='h-5 w-5' />
      {text}
    </Link>
  );
};
