// app/add-student/layout.tsx
import React from 'react';

export default function AddStudentLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className='min-h-screen bg-gray-50'>{children}</div>;
}
