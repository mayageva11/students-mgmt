'use client';
// app/add-student/page.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { StudentFormData } from '@/types/student';
import { createStudent } from '@/services/createStudent';
import { Form } from '@/components/Form';

export default function AddStudentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    grade: ''
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Top Navigation Bar */}
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <button
              onClick={() => router.back()}
              className='flex items-center text-gray-600 hover:text-gray-900'
            >
              <ArrowLeft className='h-5 w-5 mr-2' />
              Back
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className='py-8'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Add New Student
            </h1>
            <p className='mt-2 text-gray-600'>
              Fill in the student information below
            </p>
          </div>
          <Form
            studentId=''
            submitOperation={createStudent}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </main>
    </div>
  );
}
