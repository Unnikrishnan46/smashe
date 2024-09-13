import { useSearchStore } from "@/store";
import { imfell400 } from "@/utils/fonts";
import { LucideSearch } from "lucide-react";
import React from "react";

function LBSearch() {
  const {searchInput,setSearchInput} = useSearchStore();
  return (
    <div className="flex">
      <img className="absolute -z-0" src="/images/LBsearch.png" alt="" />
      <div className="flex gap-3 items-center m-2 h-full relative z-10 w-[21rem]">
        <LucideSearch className="ml-3" color="#CDBDA0" size={20} />
        <input
        onChange={(e)=>{setSearchInput(e.target.value)}}
          placeholder="Search"
          className={`outline-none bg-transparent placeholder-[#7B7263] text-[#CDBDA0] w-full placeholder:${imfell400.className}`}
        />
      </div>
    </div>
  );
}

export default LBSearch;
