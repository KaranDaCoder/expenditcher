import { Mulish } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import AuthSessionProvider from '@/components/AuthSessionProvider';
import Footer from '@/components/footer/Footer';
import toast, { Toaster } from 'react-hot-toast';


const mulish = Mulish({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
});

export const metadata = {
  title: 'Expenditcher | Login',
  description: 'Login to Expenditcher',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${mulish.className} min-h-dvh justify-between container mx-auto select-none px-4 lg:px-8 flex flex-col bg-white`}
      >
        <AuthSessionProvider>
          <Navbar />
          <Toaster position='top-right' />
          <div className='w-full min-h-[calc(100dvh-8rem)] overflow-x-visible'>
            {children}
          </div>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
