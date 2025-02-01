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

interface StudentGetRequestOptions {
  params: Promise<{ id: string }>;
}

// GET student by ID
export async function GET(
  _request: Request,
  { params }: StudentGetRequestOptions
) {
  await dbConnect();

  try {
    const id = (await params).id;
    const student = await StudentModel.findOne({ _id: id });

    if (!student) {
      return Response.json({ success: false }, { status: 404 });
    }

    return Response.json({ success: true, data: student });
  } catch (error) {
    console.error('Get student error:', error);
    return Response.json({ success: false }, { status: 500 });
  }
}

// PUT (update) student
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const body = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.birthDate || !body.grade) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedStudent = await StudentModel.findOneAndUpdate(
      { _id: params.id },
      {
        firstName: body.firstName,
        lastName: body.lastName,
        birthDate: body.birthDate,
        grade: body.grade
      },
      { new: true } // Return the updated document
    );

    if (!updatedStudent) {
      return Response.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: updatedStudent });
  } catch (error) {
    console.error('Update student error:', error);
    return Response.json(
      { success: false, error: 'Failed to update student' },
      { status: 500 }
    );
  }
}
