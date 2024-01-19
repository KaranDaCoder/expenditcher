import React from 'react'

const UserInfo = ({data}) => {
  return (
    <div className='flex flex-col items-start justify-center w-full h-full p-4 py-8 space-y-2 border shadow-md rounded-xl'>
      <h2 className='w-full text-2xl font-semibold text-center underline uppercase underline-offset-4 text-slate-600'>
        your profile
      </h2>
      <div className='flex flex-col items-start justify-start w-full h-auto gap-2 px-2 text-xl tracking-wider'>
        <label
          htmlFor='firstName'
          className='m-1 text-lg font-bold capitalize text-slate-700'
        >
          first name :{' '}
          <span className='text-base font-semibold text-slate-600' id='firstName'>
            {data?.firstName}
          </span>
        </label>
        <label
          htmlFor='firstName'
          className='m-1 text-lg font-bold capitalize text-slate-700'
        >
          last name :{' '}
          <span className='text-base font-semibold text-slate-600'>
            {data?.lastName}
          </span>
        </label>
        <label
          htmlFor='firstName'
          className='m-1 text-lg font-bold capitalize text-slate-700'
        >
          email :{' '}
          <span className='text-base font-semibold lowercase text-slate-600'>
            {data?.email}
          </span>
        </label>
        <label
          htmlFor='username'
          className='m-1 text-lg font-bold capitalize text-slate-700'
        >
          Username :{' '}
          <span className='text-base font-semibold lowercase text-slate-600'>
            {data?.username}
          </span>
        </label>
        <label
          htmlFor='member_since'
          className='m-1 text-lg font-bold capitalize text-slate-700'
        >
          user since :{' '}
          <span className='text-base font-semibold text-slate-600'>
            {data?.createdAt}
          </span>
        </label>
      </div>
      <div className='flex items-center justify-around w-full'>
        <button className='w-1/5 py-1 text-lg tracking-wider text-white capitalize bg-green-700 rounded-md'>
          edit
        </button>
        <button className='w-1/5 py-1 text-lg tracking-wider text-white capitalize bg-red-900 rounded-md'>
          delete
        </button>
      </div>
    </div>
  );
}

export default UserInfo