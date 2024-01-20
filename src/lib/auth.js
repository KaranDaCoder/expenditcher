import GoogleProvider from 'next-auth/providers/google';
import { connectDb } from './dbConnect';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import PaymentMode from '@/models/PaymentMode';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     prompt: 'consent',
      //     access_type: 'offline',
      //     response_type: 'code',
      //   },
      // },
      checks: ['none'],
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      await connectDb();
      const currentSession = await User.findOne({
        email: session?.user?.email,
      });
      if (!currentSession) {
        return;
      }
      session.user._id = currentSession._id.toString();
      session.user.username = currentSession.username.toString();
      session.user.isAdmin = currentSession.isAdmin;
      session.user
      return session;
    },
    async signIn({ profile }) {
      const { email, name, picture, given_name, family_name } = profile;
      const firstName = given_name.toLowerCase();
      const lastName = family_name.toLowerCase();
      const username = email.toLowerCase().split('@')[0];
      await connectDb();
      try {
        const UserExist = await User.findOne({ email: email });
        if (!UserExist) {
          const create_user = await User.create({
            username: username,
            firstName,
            lastName,
            email,
            name,
            picture,
          });

          await create_user.save();
          const dafaultPayment = await PaymentMode.create({
            payment_mode_name: 'Cash',
            payment_mode_type: 'Cash',
            owner_id: create_user._id,
          });
          console.log(
            `User with email : ${email} is registered via google provider`
          );
          await dafaultPayment.save();
          console.log(`Default Payment Mode as Cash Createf For User!`);
          return true;
        } else {
          console.log(`User with email : ${email} is exists in db!`);
          return true;
        }
      } catch (error) {
        console.log(error);
        console.log(`Something went wrong!`);
      }
    },
     async authorized({ token, req }) {
            // Route protection
            const session = await getToken({
              req,
              secret: process.env.NEXTAUTH_SECRET,
              cookieName:
                process.env.NODE_ENV === 'production'
                  ? '__Secure-next-auth.session-token'
                  : 'next-auth.session-token',
            });
            const pathname = req.nextUrl.pathname
            const isAuth = !!token

            const notSensitiveRoutes = ['/', '/pricing', '/api/auth/signin', '/api/auth/callback/credentials', '/api/auth/session']

            console.log(token)
            console.log(session)
            console.log(req.cookies)

            if (!isAuth && !notSensitiveRoutes.some((route) => (pathname === route)) && pathname.startsWith('/api')) {
                return false
            } else if (!isAuth && !notSensitiveRoutes.some((route) => (pathname === route))) {
                return false
            }
            return true
        },
    pages: {
      signIn: '/',
      error: '/',
      newUser: '/',
    },
  },
 
};

export const getAuthSession = () => getServerSession(authOptions);
