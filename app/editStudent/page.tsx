'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { StudentFormData } from '@/types/student';
import { getStudentById, updateStudent } from '@/services/editStudent';
import moment from 'moment';
import { Form } from '@/components/Form';
import { BackButton } from '@/components/BackButton';

export default function EditStudentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get('id');

  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<StudentFormData>({
    birthDate: '',
    firstName: '',
    grade: '',
    lastName: ''
  });

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) {
        router.push('/');
        return;
      }

      try {
        const response = await getStudentById(studentId);

        if (!response) {
          throw new Error('No student was found');
        }

        const { birthDate, ...student } = response;
        const formattedBirthDate = moment(birthDate).format('YYYY-MM-DD');

        setFormData({
          ...student,
          birthDate: formattedBirthDate
        });
      } catch (error) {
        setError('Failed to fetch student data');
        console.error(error);
      }
    };

    fetchStudent();
  }, [studentId, router]);
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Top Navigation Bar */}
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <BackButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className='py-8'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>Edit Student</h1>
            <p className='mt-2 text-gray-600'>
              Update student information below
            </p>
          </div>

          <Form
            studentId={studentId}
            submitOperation={updateStudent}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </main>
    </div>
  );
}
