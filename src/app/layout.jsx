import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: "Expenditcher | Home",
  description: "Generated by create next app",
};

export const Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
  viewportFit: 'cover',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} select-none h-full text-balance   text-slate-600 bg-slate-50 container mx-auto px-2 overflow-x-hidden`}>
      <ToastContainer />
        <Navbar/>
        <main className="w-full h-full" draggable='false' >
       
        {children}
       
        </main>
        <Footer/>
        </body>
    </html>
  );
}
