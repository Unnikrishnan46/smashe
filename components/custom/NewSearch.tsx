import { imfell400 } from '@/utils/fonts';
import { LucideSearch } from 'lucide-react'
import React from 'react';

type props = {
    setSearchInput:any;
    searchInput:any;
}

function NewSearch({setSearchInput,searchInput}:props) {
  return (
    <div className="flex w-full justify-center mt-8">
      <div className="flex gap-3 items-center h-full w-[25rem] border-2 border-[#CDBDA0] p-2 max-sm:w-[80%]">
        <LucideSearch className="ml-3" color="#CDBDA0" size={20} />
        <input
        value={searchInput}
        onChange={(e)=>{setSearchInput(e.target.value)}}
          placeholder="Search"
          className={`outline-none bg-transparent placeholder-[#7B7263] text-[#CDBDA0] w-full placeholder:${imfell400.className}`}
        />
      </div>
    </div>
  )
}

export default NewSearch
