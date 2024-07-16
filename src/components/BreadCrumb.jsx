import Link from 'next/link'
import React from 'react'

const BreadCrumb = ({link, activeLink, activeLink1}) => {
  return (
   <div className='flex items-center w-full h-full gap-1 text-sm lg:text-base'>
    <Link href={`/dashboard`} className='font-normal text-fuchsia-800 hover:underline'>{link}</Link>
    {activeLink && <p>{'>'}</p>}
      {activeLink1 ? <Link href={`/${activeLink}`} className='font-normal lowercase text-fuchsia-800 hover:underline hover:underline-offset-2'>{activeLink}</Link> : <p>{activeLink}</p>}
    {activeLink1 && <p>{'>'}</p>}
    <p className='lowercase'>{activeLink1}</p>
   </div>
  )
}

export default BreadCrumb