import Link from "next/link"

const SignIn = () => {
  return (
   <Link href={"/login"} className="px-4 py-1 text-sm capitalize transition-all duration-300 border rounded-md lg:text-base hover:bg-slate-600 hover:text-white">
    Sign in
   </Link>
  )
}

export default SignIn