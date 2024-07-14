import BreadCrumb from '@/components/BreadCrumb'
import React from 'react'

const MyProfile = () => {
  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <div className='w-full h-8'>
    <BreadCrumb link={'Dashboard'} activeLink={'My Profile'} />
      </div>
    </div>
  )
}

export default MyProfile