const HamburgerIcon = () => {
 return (
  <svg
   xmlns='http://www.w3.org/2000/svg'
   fill='none'
   viewBox='0 0 24 24'
   strokeWidth={3.0}
   stroke='green'
   className='size-8'
  >
   <path
    strokeLinecap='round'
    strokeLinejoin='round'
    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
   />
  </svg>
 );
};
const PlusIcon = () => {
 return (
  <svg
   xmlns='http://www.w3.org/2000/svg'
   fill='none'
   viewBox='0 0 24 24'
   strokeWidth={3.0}
   stroke='green'
   className='size-6'
  >
   <path
    strokeLinecap='round'
    strokeLinejoin='round'
    d='M12 4.5v15m7.5-7.5h-15'
   />
  </svg>
 );
};

const CloseIcon = () => {
 return (
  <svg xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 24 24" strokeWidth={2.0} stroke="blue" className="size-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
 )
}

export { HamburgerIcon, PlusIcon, CloseIcon }