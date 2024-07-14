'use client';

import { useState } from "react";

const { useRouter } = require("next/navigation");

const EditDeleteBtn = ({ payment_mode_id }) => {
  const [isEdit, setEdit] = useState(false);
  console.log(isEdit)
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const request = await fetch(`/api/payment-modes/${payment_mode_id}`, { method: 'Delete', cache: 'no-cache', redirect: 'follow' });
      const response = await request.json();
      if (request.ok) {
        router.refresh();
        return response;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='relative flex justify-center w-full h-full gap-2 mt-2 text-sm'>
      <button className='w-1/4 py-1 text-center capitalize border rounded-md' onClick={() => setEdit(!isEdit)}>Edit</button>
      <button className='w-1/4 py-1 text-center capitalize border rounded-md' value={payment_mode_id} onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default EditDeleteBtn