'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
const Search = () => {
 const searchParams = useSearchParams();
 const pathname = usePathname();
 const { replace } = useRouter();
 const handleSearch = useDebouncedCallback((searchParam) => {
  const params = new URLSearchParams(searchParams);
  if (searchParam) {
   params.set('search', searchParam);
  } else {
   params.delete('search');
  }
  replace(`${pathname}?${params.toString()}`);
 }, 500);
  return (
   <div className='flex flex-col items-center justify-center w-full h-12 text-base bg-white rounded-lg shadow-md lg:w-5/6 lg:text-sm'>
    <input type="text" placeholder='search by name or description' className='w-full h-full px-4 border rounded-lg shadow-md outline-none placeholder:italic placeholder:text-sm' onChange={(e) => handleSearch(e.target.value)}
     defaultValue={searchParams.get('search')?.toString()} />
   </div>
  )
}

export default Search