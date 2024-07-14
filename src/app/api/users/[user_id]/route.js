import { auth } from '@/auth';
import { connectDb } from '@/lib/dbConnect';
import { NextResponseWrapper } from '@/lib/NextWrapperResponsesWrapper';
import User from '@/models/User.model';

export const GET = async (request, { params }) => {
  const session = await auth();
  if (!session)
    return NextResponse.json(
      { error: `You are Not Authorized to View Payment Modes` },
      { status: 405 }
    );
  const { user_id } = params;
  try {
    await connectDb();
    const user = await User.findById(user_id);
    return NextResponseWrapper({ result: user, count: 1 }, 200);
  } catch (error) {
    console.log(error);
    return NextResponseWrapper({ result: error }, 500);
  }
};
 