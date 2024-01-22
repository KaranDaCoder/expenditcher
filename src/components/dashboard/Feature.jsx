import Link from 'next/link';
import React from 'react'

const Feature = ({user}) => {
  return (
    <div className='w-full h-auto py-2 mt-5 bg-white border shadow-lg rounded-xl'>
      <div className='flex flex-col flex-wrap items-start justify-start w-full h-full gap-4 px-2 py-10 space-y-2'>
        <h2 className='mr-2 text-4xl font-light lg:text-7xl text-slate-600'>
          Welcome,
          <span className='ml-1 text-3xl font-bold tracking-wide lg:text-6xl'>
            {user.name}.
          </span>
        </h2>
        <h2 className='px-2 text-xl capitalize lg:text-2xl text-slate-600'>
          You have spent $200.00 as of today, January 20,2024.
        </h2>
        <Link
          href={'/'}
          className='w-1/2 px-2 py-3 text-lg tracking-widest text-center text-white uppercase transition-all duration-300 rounded-xl lg:w-1/5 bg-fuchsia-950 hover:bg-slate-950'
        >
          View All
        </Link>
      </div>
      <p className='w-full px-2 text-lg italic font-medium text-end text-slate-600/80'>
        feeling broke yet!?
      </p>
    </div>
  );
}

export default Feature