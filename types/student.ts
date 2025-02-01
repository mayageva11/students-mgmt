export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  birthDate: string; // will be stored as yyyy-mm-dd
  grade: string;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  grade: string;
}
