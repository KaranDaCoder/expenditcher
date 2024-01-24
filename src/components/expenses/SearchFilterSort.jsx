'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchFilterSort = () => {
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
    <div className='w-full h-10'>
      <input
        type='search'
        name='search'
        id='search'
        className='w-full h-full px-2 bg-transparent border rounded-lg outline-none text-slate-600 focus:ring-1 ring-green-800'
        placeholder='Search By Name or Description'
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  );
};

export default SearchFilterSort;
