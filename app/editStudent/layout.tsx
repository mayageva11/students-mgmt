import React from 'react';

export default function EditStudentLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className='min-h-screen bg-gray-50'>{children}</div>;
}
