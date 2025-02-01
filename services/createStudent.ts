export async function createStudent() {
  try {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '2024-02-27',
        grade: 100
      })
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
