'use client';
// app/add-student/page.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { StudentFormData } from '@/types/student';
import { createStudent } from '@/services/createStudent';

export default function AddStudentPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    grade: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.birthDate) {
      setError('Birth date is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const newData = createStudent(formData);

      if (!newData) {
        throw new Error('Failed to add student');
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add student');
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
            <h1 className='text-3xl font-bold text-gray-900'>
              Add New Student
            </h1>
            <p className='mt-2 text-gray-600'>
              Fill in the student information below
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
                  type='Number'
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
                  onClick={handleSubmit}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium text-white
                    ${
                      isSubmitting
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } 
                    transition-colors`}
                >
                  {isSubmitting ? 'Saving...' : 'Save Student'}
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
