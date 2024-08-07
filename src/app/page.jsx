import Image from "next/image";
import React from 'react'

const Home = () => {
  return (
    <main className="flex flex-col w-full h-full gap-10">
      <div className="w-full h-auto leading-10">
        <div className="flex flex-col w-full gap-2 mx-auto h-80 lg:flex-row">
          <div className="flex items-center justify-center w-full h-full">
            <h2 className="flex flex-wrap items-center justify-center w-full gap-4 text-6xl tracking-wide text-center lg:text-8xl"> <span className="text-red-500 capitalize w-fit">spend</span> anywhere... <span className="px-5 py-2 text-green-800 capitalize"> manage </span>them here!</h2>
          </div>
        </div>
        <div className="items-center justify-around hidden w-5/6 h-auto px-2 py-4 mx-auto bg-slate-100 lg:flex">
          <div className="w-1/3 h-auto py-4 space-y-2 text-white transition-all duration-300 shadow-lg rounded-xl bg-slate-800 hover:scale-105">
            <h2 className="w-full text-lg font-bold tracking-wider text-center">ex·pend·i·ture</h2>
            <p className="w-full text-sm text-center">/ik&apos;spendəCHər,ek&apos;spendəCHər/</p>
            <p className="w-full text-sm italic text-center text-slate-300">noun</p>
            <p className="w-full text-sm text-center text-white">the action of spending funds.</p>
            <p className="w-full text-sm text-center text-slate-300">&quot;the expenditure of taxpayers&apos; money&quot;</p>
            <p className="w-full px-10 text-xs italic text-end text-slate-400"> - Oxford</p>
          </div>
          <p className="text-2xl italic font-light">v.</p>
          <div className="w-1/3 h-auto py-4 space-y-2 text-white transition-all duration-300 shadow-lg rounded-xl bg-slate-800 hover:scale-105">
            <h2 className="w-full text-lg font-bold tracking-wider text-center">ex·pen·ditch·er</h2>
            <p className="w-full text-sm text-center">/ik&apos;spendəCHər,ek&apos;spendəCHər/</p>
            <p className="w-full text-sm italic text-center text-slate-300">adj.</p>
            <p className="w-full text-sm text-center text-white">the action of ditching your expense tracking.</p>
            <p className="w-full text-sm text-center text-slate-300">&quot;the expenditcher app helps me track my expenses&quot;</p>
            <p className="w-full px-10 text-xs italic text-end text-slate-400"> - expenditcher</p>
          </div>
        </div>
      </div>
      <h2 className="w-full mx-auto text-xl italic tracking-wide text-center lg:w-5/6 lg:text-2xl">What&apos;s inside?</h2>
      
      <div className="flex flex-col items-center justify-between w-full h-auto gap-2 lg:flex-row">
        <div className="flex flex-col items-center justify-center w-full h-full space-y-2 transition-all duration-500 ease-in-out border border-l lg:w-1/2 rounded-xl bg-blue-950 text-slate-100 hover:rotate-2">
          <h2 className="text-xl font-semibold tracking-wide text-center">Your Own Dedicated Dashboard.</h2>
          <p className="text-center">Have a dedicated dashboard to track your expenses by category, payment modes, statuses, and a lot more.</p>
        </div>
        <div className="w-full h-full">
          <Image src={'/image1.png'} alt="image1" width={1920} height={1080} className="object-cover w-full h-full duration-500 ease-in-out border rounded-lg hover:scale-105"/>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full h-auto gap-2 lg:flex-row">
        <div className="flex flex-col items-center justify-center w-full h-full space-y-2 transition-all duration-500 ease-in-out border border-l bg-slate-800 lg:w-1/2 rounded-xl text-slate-100 hover:rotate-2">
          <h2 className="text-xl font-semibold tracking-wide text-center">Adding expense just got easier.</h2>
          <p className="text-center">Adding expense gets as easier as it gets. With just few simple clicks and text, you can add an expense.</p>
        </div>
        <div className="w-full h-full">
          <Image src={'/image3.png'} alt="image3" width={1920} height={1080} className="object-contain w-full h-full duration-500 ease-in-out border rounded-lg hover:scale-105" />
        </div>
      </div>

      <div className="flex flex-col items-center w-full h-auto gap-2 lg:flex-row ">
        <div className="flex flex-col items-center justify-center w-full h-full space-y-2 transition-all duration-500 ease-in-out bg-green-900 border border-l lg:w-1/2 rounded-xl text-slate-100 hover:-rotate-2">
          <h2 className="text-xl font-semibold tracking-wide text-center">Ease of viewing expenses.</h2>
          <p className="text-center">Filter, search or view your expenses by category, payment modes, statuses, and a lot more.</p>
        </div>
        <div className="w-full h-full">
          <Image src={'/image2.png'} alt="image2" width={1920} height={1080} className="object-contain w-full h-full duration-500 ease-in-out border rounded-lg hover:scale-105" />
        </div>
       
      
      </div>
 
    
    </main>

  )
}

export default Home

// transition-all duration-500 ease-in-out translate-x-1/4 hover:-translate-x-0