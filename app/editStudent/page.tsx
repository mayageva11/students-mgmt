'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { StudentFormData } from '@/types/student';
import { getStudentById, updateStudent } from '@/services/editStudent';
import moment from 'moment';

export default function EditStudentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get('id');

  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    grade: ''
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) return;

    setIsSubmitting(true);

    try {
      const newData = updateStudent(studentId, formData);
      if (!newData) {
        throw new Error('Failed to edit student');
      }
      console.log(newData);

      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update student');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className='text-3xl font-bold text-gray-900'>Edit Student</h1>
            <p className='mt-2 text-gray-600'>
              Update student information below
            </p>
          </div>

          {/* Form Card */}
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Error Display */}
              {error && (
                <div className='bg-red-50 border-l-4 border-red-400 p-4'>
                  <div className='flex'>
                    <div className='flex-shrink-0'>
                      <svg
                        className='h-5 w-5 text-red-400'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div className='ml-3'>
                      <p className='text-sm text-red-700'>{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* First Name */}
              <div>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  First Name *
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className='block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  placeholder='Enter first name'
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Last Name *
                </label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className='block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  placeholder='Enter last name'
                />
              </div>

              {/* Birth Date */}
              <div>
                <label
                  htmlFor='birthDate'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Birth Date *
                </label>
                <input
                  type='date'
                  id='birthDate'
                  name='birthDate'
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  className='block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                />
              </div>

              {/* Grade */}
              <div>
                <label
                  htmlFor='grade'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Grade * (1-12)
                </label>
                <input
                  type='number'
                  id='grade'
                  name='grade'
                  value={formData.grade}
                  onChange={handleChange}
                  required
                  min='1'
                  max='12'
                  className='block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  placeholder='Enter grade'
                />
              </div>

              {/* Action Buttons */}
              <div className='flex gap-4 pt-6'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium text-white
                    ${
                      isSubmitting
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } 
                    transition-colors`}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type='button'
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                  className='flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
