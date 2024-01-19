import { connectDb } from '@/lib/dbConnect';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export const GET = async (request, { params }) => {
  const session = await getServerSession(authOptions);
  try {
    await connectDb();
    console.log(session)
    const {
      user: { _id },
    } = session;
    const isUserAdmin = await User.findById(_id);
    if (!isUserAdmin.isAdmin) {
      return new NextResponse(
        JSON.stringify({ error: 'Only Admin can view all the users!' }),
        { status: 401 }
      );
    }
    const all_users = await User.find({}).sort({ createdAt: 1 });
    return new NextResponse(
      JSON.stringify({ all_users, results: all_users.length }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
};
