import dbConnect from '@/lib/mongodb';
import StudentModel from '../../../../models/Student';

interface StudentDeleteRequestOptions {
  params: Promise<{ id: string }>;
}

export async function DELETE(
  _request: Request,
  { params }: StudentDeleteRequestOptions
) {
  await dbConnect();

  try {
    const { id } = await params;

    if (!id) {
      return Response.json({ success: false }, { status: 400 });
    }

    // Use MongoDB to find and delete the student
    const deletedStudent = await StudentModel.findOneAndDelete({ _id: id });

    if (!deletedStudent) {
      return Response.json({ success: false }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: deletedStudent
    });
  } catch (error) {
    console.error('Delete error:', error);
    return Response.json({ success: false }, { status: 500 });
  }
}
