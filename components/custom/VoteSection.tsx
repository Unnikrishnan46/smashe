import { imfell400, ringbearer } from '@/utils/fonts'
import React from 'react'

function VoteSection() {
  return (
    <div className='h-[90vh] bg-[#F2E0C8] max-sm:h-[60vh] max-sm:-top-16 relative'>
      <div className='flex flex-col justify-center items-center'>
        <div className={`max-sm:hidden ${ringbearer.className} text-center mt-8 mb-8`}>
            <div>
                <span className={`text-[#BAA076] text-4xl`}>Lorem ipsum dolor sit </span><span className='text-[#372400] text-4xl'>Lorem ipsum dolor sit amet</span>    
            </div>
            <div>
                <span className='text-[#372400] text-4xl'>consectetur</span><span className='text-[#BAA076] text-4xl'>orem ipsum dolor sit short</span>
            </div>
        </div>

        <div className={`${imfell400.className} text-center mt-24 mb-8 max-sm:px-5 hidden max-sm:flex`}>
          <p className={`text-[#BAA076] text-4xl`}>
          <span>Lorem ipsum dolor sit</span> <span className='text-[#372400] text-4xl'>Lorem ipsum dolor sit amet consectetur</span>orem ipsum dolor sit short 
          </p>
        </div>

        <div className="relative flex justify-center w-full max-sm:hidden">
            <img className='absolute' src="/images/voteList.png" alt="voteList" />
            <button className="flex items-center justify-center p-0 absolute z-50 top-[50vh]">
              <img
                src="/images/buyNowBtn.png"
                alt=""
                className="h-full object-cover"
              />
              <h1
                className={`absolute font-bold text-lg ${imfell400.className} text-[#2E3A5B] text-xl`}
              >
                BUY NOW
              </h1>
            </button>
        </div>

        <div className="relative max-sm:flex justify-center w-full max-sm:h-[30vh] hidden">
            <img className='absolute' src="/images/voteListMobile.png" alt="voteList" />
        </div>

      </div>
    </div>
  )
}

export default VoteSection
