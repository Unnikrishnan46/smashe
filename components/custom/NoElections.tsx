import { imfell400 } from '@/utils/fonts';
import React from 'react';

type props = {
    electionMode:string;
}

function NoElections({electionMode}:props) {
  return (
    <div className={`${imfell400.className} flex justify-center mt-14`}>
        <div className='w-1/2 max-md:w-full max-md:px-8'>
            <h1 className='text-2xl text-[#EAE5DA] text-center max-sm:text-xl'>Sorry, there is no ongoing election in the {electionMode} Election mode. Perhaps you could check the {electionMode === "Good" ? "Evil" : "Good"} Election.</h1>
        </div>
    </div>
  )
}

export default NoElections
