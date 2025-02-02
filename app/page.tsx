'use client';

import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Student } from '@/types/student';
import { deleteStudent } from '@/services/deleteStudent';
import { TableCell } from '@/components/TableCell';
import { AddButton } from '@/components/AddStudentBtn';
import { DeleteButton } from '@/components/DeleteButton';
import { EditButton } from '@/components/EditButton';
import { SearchBar } from '@/components/SearchBar';

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
        <AddButton href='/addStudent' text='Add Student' />
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
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onKeyDown={handleSearch}
          />
          {/* Add Student Button */}
          <AddButton href='/addStudent' text='Add Student' />
        </div>

        {/* Table with Filtered Results */}
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          {students.length === 0 ? (
            <EmptyState />
          ) : (
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <TableCell value='First Name' isHeader />
                  <TableCell value='Last Name' isHeader />
                  <TableCell value='Birth Date' isHeader />
                  <TableCell value='Grade' isHeader />
                  <TableCell value='Actions' isHeader />
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredStudents.map(student => (
                  <tr
                    key={student._id}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <TableCell value={student.firstName} />
                    <TableCell value={student.lastName} />
                    <TableCell value={student.birthDate} />
                    <TableCell value={student.grade} />
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      <div className='flex gap-4'>
                        <EditButton id={student._id} />
                        <DeleteButton
                          onClick={() => handleDelete(student._id)}
                          title='Delete student'
                        />
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
