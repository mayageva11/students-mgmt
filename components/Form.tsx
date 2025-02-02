import { StudentFormData } from '@/types/student';
import router, { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { CancelButton } from './CencelButton';
import { FormField } from './FormFields';
import { SubmitButton } from './SubmitButton';
import { ErrorMessage } from './ErrorMessage';

interface FormProp {
  submitOperation: (formData: StudentFormData, identifier: string) => unknown;
  studentId: string | null;
  formData: StudentFormData;
  setFormData: Dispatch<SetStateAction<StudentFormData>>;
}

export const Form = ({
  submitOperation,
  studentId,
  formData,
  setFormData
}: FormProp) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!formData.birthDate) {
      errors.birthDate = 'Birth date is required';
    }
    const gradeNum = parseInt(formData.grade);
    if (!formData.grade || isNaN(gradeNum) || gradeNum < 1 || gradeNum > 12) {
      errors.grade = 'Grade must be a number between 1 and 12';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newData = submitOperation(formData, studentId || '');
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
    <div className='bg-white rounded-lg shadow-lg p-6'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Error Display */}
        <ErrorMessage error={error} />
        {/* {error && (
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
        )} */}

        {/* First Name */}
        <FormField
          label='First Name'
          type='text'
          id='firstName'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder='Enter first name'
          error={fieldErrors.firstName}
        />

        {/* Last Name */}
        <FormField
          label='Last Name'
          type='text'
          id='lastName'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder='Enter last name'
          error={fieldErrors.lastName}
        />

        {/* Birth Date */}
        <FormField
          label='Birth Date'
          type='date'
          id='birthDate'
          name='birthDate'
          value={formData.birthDate}
          onChange={handleChange}
          required
          error={fieldErrors.birthDate}
        />

        {/* Grade */}
        <FormField
          label='Grade'
          type='number'
          id='grade'
          name='grade'
          value={formData.grade}
          onChange={handleChange}
          required
          min={1}
          max={12}
          placeholder='Enter grade'
          error={fieldErrors.grade}
        />

        {/* Action Buttons */}
        <div className='flex gap-4 pt-6'>
          <SubmitButton
            isSubmitting={isSubmitting}
            onClick={handleSubmit}
            submitText='Save Student'
            loadingText='Saving...'
          />
          <CancelButton disabled={isSubmitting} />
        </div>
      </form>
    </div>
  );
};
