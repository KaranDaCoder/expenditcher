import { auth } from "@/auth"
import { NextResponse } from "next/server";


// export const NextWrapperValidateAuthSession = async () => {
//  const session = await auth();
//  console.log(session , 'in nexwrapper')
//  if (!session || session === null) {
//   return NextResponse.json(
//     { error: 'No User Session Fetched' },
//     { status: 401 }
//   );
//  }
//    // return session;
// }
export const NextResponseWrapper = (jsonObjectResponse, statusCode) => {
  return NextResponse.json(Object(jsonObjectResponse), Object({status : statusCode}));
}