'use client';

import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Student } from '@/types/student';
import Link from 'next/link';
import { deleteStudent } from '@/services/deleteStudent';
import router from 'next/router';

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('/api/students');
      const { data, success } = await res.json();
      console.log(data);
      if (success) {
        setStudents(data);
      } else {
        throw new Error('Failed to fetch students');
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (studentId: string) => {
    try {
      setDeletingId(studentId);
      await deleteStudent(studentId);
      setStudents(prevStudents =>
        prevStudents.filter(student => student._id !== studentId)
      );
    } catch (error) {
      console.error('Error deleting student:', error);
    } finally {
      setDeletingId(null);
    }
  };

  // New search handler
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // New filtered students logic
  const filteredStudents = searchQuery
    ? students.filter(student =>
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : students;

  const EmptyState = () => (
    <div className='text-center py-16'>
      <h3 className='text-sm font-medium text-gray-900'>No students</h3>
      <p className='mt-1 text-sm text-gray-500'>
        Get started by adding a new student.
      </p>
      <div className='mt-6'>
        <Link
          href='/addStudent'
          className='inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
        >
          <PlusCircle className='h-5 w-5' aria-hidden='true' />
          Add student
        </Link>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-6xl mx-auto space-y-8'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Students List</h1>
          <p className='mt-2 text-gray-600'>Manage and view all students</p>
        </div>

        {/* Search and Add Section */}
        <div className='flex flex-col sm:flex-row gap-4'>
          {/* Updated Search Bar */}
          <div className='relative flex-1'>
            <input
              type='text'
              placeholder='Search by last name...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-gray-900  text-gray-900'
            />
            <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
          </div>

          {/* Add Student Button */}
          <Link
            href='/addStudent'
            className='flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
          >
            <PlusCircle className='h-5 w-5' />
            Add Student
          </Link>
        </div>

        {/* Table with Filtered Results */}
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          {students.length === 0 ? (
            <EmptyState />
          ) : (
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    First Name
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Last Name
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Birth Date
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Grade
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredStudents.map(student => (
                  <tr
                    key={student._id}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {student.firstName}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {student.lastName}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {student.birthDate}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {student.grade}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      <div className='flex gap-4'>
                        <Link
                          href={`/editStudent?id=${student._id}`}
                          className='text-blue-600 hover:text-blue-800 transition-colors'
                          title='Edit student'
                        >
                          <Pencil className='h-5 w-5' />
                        </Link>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className='text-red-600 hover:text-red-800 transition-colors'
                          title='Delete student'
                        >
                          <Trash2 className='h-5 w-5' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
