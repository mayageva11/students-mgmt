import { Student, StudentFormData } from '@/types/student';

// services/editStudent.ts
export async function getStudentById(id: string): Promise<Student | undefined> {
  try {
    const response = await fetch(`/api/students/${id}`);
    const { data, success } = await response.json();

    if (!success) {
      throw new Error('Failed to fetch student');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateStudent(id: string, studentData: StudentFormData) {
  try {
    const response = await fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to update student');
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}
