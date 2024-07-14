'use client';
import { useRouter } from "next/navigation";
import { useState } from "react"

const AddPaymentForm = ({owner_id}) => {
 
 const router = useRouter()
 const [paymentMode, setPaymentMode] = useState({
  payment_mode_name: '',
  payment_mode_type: 'Credit Card',
  owner_id
 })

 const handleFormSubmission = (e) => {
  setPaymentMode((prev) => ({
   ...prev,
   [e.target.name]: e.target.value
  }))
 }


 const handleFormReset = (e) => {
  e.preventDefault();
  setPaymentMode({
   payment_mode_name: '',
   payment_mode_type: 'Credit Card',
   owner_id: owner_id
  })
 }

 const addPaymentMode = async(e) => {
  e.preventDefault();
  console.log(paymentMode);
  try {
   const request = await fetch(`/api/payment-modes`, {method: 'POST' , cache: 'no-cache', body: JSON.stringify(paymentMode)});
   const response = await request.json();
   if(!request.ok) {
    console.log(`Throw An Error`)
   }
   router.refresh();
   console.log(response)
  } catch (error) {
    throw new Error(error);
  }
  handleFormReset(e);
 }

 return (
  <form className='flex flex-col items-center w-full h-full gap-5 space-y-4' onReset={handleFormReset} onSubmit={addPaymentMode}>
    <div className='w-3/4 text-start'>
     <p className='w-3/4 text-sm text-start'>Payment Mode Name:</p>
    <input type="text" name="payment_mode_name" value={paymentMode.payment_mode_name} className='w-full px-2 py-1 text-sm bg-white border rounded-md outline-none lg:py-2 lg:w-full bg-inherit' onChange={handleFormSubmission} minLength={3} maxLength={30}/>
    </div>
    <div className='w-3/4'>
     <p className='w-3/4 text-sm text-start'>Payment Mode Type:</p>
    <select name="payment_mode_type" id="" className='w-full px-2 py-1 text-sm bg-white border rounded-md outline-none cursor-pointer lg:py-2 lg:w-full bg-inherit' value={paymentMode.payment_mode_type} onChange={handleFormSubmission}>
      <option value="Credit Card">Credit Card</option>
      <option value="Debit Card">Debit Card</option>
      <option value="Checking Account">Checking Account</option>
      <option value="Saving Account">Saving Account</option>
     </select>
    </div>
    <div className='flex items-center justify-start w-3/4 gap-3 rounded-md'>
     <button className='w-1/2 py-2 text-white rounded-md bg-slate-800' type="reset">Cancel</button>
     <button className={`${paymentMode.payment_mode_name.length > 2 ? 'w-1/2 py-2 text-white bg-green-800 rounded-md hover:bg-green-900' : 'hidden'}`}>Add</button>
    </div>
   </form>
  )
}

export default AddPaymentForm