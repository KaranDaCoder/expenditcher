import React from 'react'

const Loading = () => {
 console.log(`LOADIN IS RENDERED?`)
 return <div className='min-h-[100dvh] w-full flex items-center justify-center'>
   <span className='bg-green-900 loading loading-bars loading-md'></span>
   <span className='bg-fuchsia-900 loading loading-bars loading-md'></span>
   <span className='bg-red-900 loading loading-bars loading-md'></span>
   <span className='bg-green-900 loading loading-bars loading-md'></span>
   <span className='bg-fuchsia-900 loading loading-bars loading-md'></span>

 </div>;
}

export default Loading