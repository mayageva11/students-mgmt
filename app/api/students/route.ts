import dbConnect from '../../../lib/mongodb';
import StudentModel from '../../../models/Student';
import { Student } from '@/types/student';

export async function GET() {
  await dbConnect();

  try {
    const students: Student[] = await StudentModel.find({});
    return Response.json({ success: true, data: students });
  } catch (error) {
    return Response.json({ success: false });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    // Parse the request body
    const body = await req.json();
    const dStr: string = body.birthDate;
    const newDate: Date = new Date(dStr);
    const studentToSave = {
      ...body,
      birthDate: newDate
    };
    const newStudent = await StudentModel.create(studentToSave);
    return Response.json({ success: true, data: newStudent });
  } catch (error) {
    return Response.json({ success: false });
  }
}

// export async function DELETE(request: Request) {
//   await dbConnect();

//   try {
//     const { searchParams } = new URL(request.url);
//     const id = Number(searchParams.get('id'));

//     if (!id) {
//       return Response.json({ success: false }, { status: 400 });
//     }

//     // Use MongoDB to find and delete the student
//     const deletedStudent = await StudentModel.findOneAndDelete({ _id: id });

//     if (!deletedStudent) {
//       return Response.json({ success: false }, { status: 404 });
//     }

//     return Response.json({
//       success: true,
//       data: deletedStudent
//     });
//   } catch (error) {
//     console.error('Delete error:', error);
//     return Response.json({ success: false }, { status: 500 });
//   }
// }
