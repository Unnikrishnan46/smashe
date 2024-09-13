import { LBVoteModalStore } from '@/store'
import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog';
import { imfell400 } from '@/utils/fonts';
import { ChevronLeft } from 'lucide-react';

type props = {
  successUser:any;
  setSuccessUser:any;
}


function VoteSuccessModal({successUser,setSuccessUser}:props) {
    const {isLBVoteSuccessModalOpen,setIsLBVoteSuccessModalOpen} = LBVoteModalStore();
    const handleModalChange = ()=>{
        setIsLBVoteSuccessModalOpen(false);
        setSuccessUser(null);
    }
  return (
    <Dialog open={isLBVoteSuccessModalOpen} onOpenChange={handleModalChange}>
      <DialogContent className="bg-[url(/images/vote-success-bg.png)] max-sm:bg-[url(/images/vote-success-ripped-paper.png)] bg-no-repeat bg-center bg-contain bg-transparent border-none h-[304px] max-sm:w-full max-sm:h-screen max-sm:bg-custom">
        <div
          className={`relative ${imfell400.className} gap-6 flex flex-col items-center justify-center`}
        >
          <button
            onClick={handleModalChange}
            className="absolute top-32 left-2 flex w-7 h-7 justify-center items-center rounded-full border-2 border-[#D2BFA1] bg-[#EAE5DA]"
          >
            <ChevronLeft size={15} />
          </button>
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-[#502A29] text-2xl">Vote For</h1>
            <img src="/images/vote-for-divider.png" alt="" />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img
              className="w-16 h-16 rounded-full"
              src={successUser?.photoUrl}
              alt=""
            />
            <h1 className="text-[#502A29]">{successUser?.userName}</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 max-sm:w-full">
            <div className='flex p-2 bg-[#502A29] max-sm:w-full max-sm:justify-center'>
                <h1 className='text-[#F7F1E9] text-2xl'>Vote Submited!</h1>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VoteSuccessModal
