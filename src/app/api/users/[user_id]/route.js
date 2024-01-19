import { connectDb } from '@/lib/dbConnect';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export const GET = async (request, { params }) => {
 const {user_id} = params
  const session = await getServerSession(authOptions);
  try {
    await connectDb();
    console.log(session);
    const {
      user: { _id },
    } = session;


    if (_id !== user_id) {
      return new NextResponse(
        JSON.stringify({ error: 'Only Logged in member can view their account!' }),
        { status: 401 }
      );
    }
    const user = await User.findById(user_id);
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
};
