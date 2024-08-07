const DialogBox = ({ name, dialogBox, setDialogBox, handleDelete }) => {

  return (
    <div className='absolute inset-0 flex items-center justify-center w-full h-full bg-black/50'>
     <div className='flex flex-col items-center justify-start w-5/6 gap-8 p-4 bg-white border shadow-2xl lg:w-1/2 rounded-2xl min-h-64'>
      <h1 className='w-full text-xl text-center uppercase'>confirmation required</h1>
        <p className='w-full text-base text-center'> Are you sure you want to delete <span className='font-semibold'>{name}</span> ?</p>
      <div className='flex justify-around w-full gap-4'>
          <button className='w-1/4 py-2 bg-white border rounded-lg text-slate-800' onClick={() => {setDialogBox(!dialogBox), handleDelete()}}>YES</button>
          <button className='w-1/4 py-2 text-white border rounded-lg bg-slate-700' onClick={() => setDialogBox(!dialogBox)}>NO</button>
      </div>
     </div>
    </div>
  )
}

export default DialogBox