import { StudentFormData } from '@/types/student';

export async function createStudent(formData: StudentFormData) {
  try {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
        grade: parseInt(formData.grade)
      })
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
