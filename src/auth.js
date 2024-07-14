import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import User from './models/User.model';
import { connectDb } from './lib/dbConnect';
import PaymentMode from './models/PaymentMode.model';

export const { handlers, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      console.log(profile);
      const { email, name, picture } = profile;
      const username = email.toLowerCase().split('@')[0];
      await connectDb();
      try {
        const userExist = await User.findOne({ email });
        if (!userExist) {
          const createUser = await User.create({
            username,
            name,
            email,
            picture,
          });
          await createUser.save();
          console.log(
            `User does not exist -- create / register a new user : ${JSON.stringify(
              createUser
            )}`
          );
           const isDefaultPayment = await PaymentMode.findOne({
             payment_mode_name: 'Cash',
             owner_id: createUser?._id,
           });
          if (!isDefaultPayment) {
            const defaultPayment = await PaymentMode.create({
              payment_mode_name: 'Cash',
              payment_mode_type: 'Cash',
              owner_id: createUser?._id,
            });
            await defaultPayment.save();
          } else {
            console.log(`Default Payment : Cash Exists for the User.`);
          }
        } else {
          console.log(`User already exists`);
        }
        return true;
      } catch (error) {
        console.log(error);
        console.log(`Something went wrong while login/registering user`);
        return false;
      }
    },
    async session({ session }) {
       await connectDb();
       const curr_session = await User.findOne({ email: session?.user?.email });
       if (!curr_session) {
         return;
       }
       session.user._id = curr_session._id.toString();
       session.user.username = curr_session.username.toString();
       return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/',
    newUser: '/',
  },
});
