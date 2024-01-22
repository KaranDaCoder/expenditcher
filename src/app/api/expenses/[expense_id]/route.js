import { connectDb } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
  await connectDb();
  try {
    return new NextResponse(JSON.stringify('success'), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify('Soemthing went wrong!'), {
      status: 500,
    });
  }
};
