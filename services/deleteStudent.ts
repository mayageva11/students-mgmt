// services/studentService.ts
export async function deleteStudent(id: number) {
  try {
    const response = await fetch(`/api/students/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete student');
    }

    if (!data.success) {
      throw new Error('Failed to delete student');
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}
