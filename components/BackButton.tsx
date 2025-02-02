// components/BackButton.tsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  text?: string;
  className?: string;
}

export const BackButton = ({
  text = 'Back',
  className = ''
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`flex items-center text-gray-600 hover:text-gray-900 ${className}`}
    >
      <ArrowLeft className='h-5 w-5 mr-2' />
      {text}
    </button>
  );
};
