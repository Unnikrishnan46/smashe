import { LBVoteModalStore } from "@/store";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { imfell400 } from "@/utils/fonts";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

function LBVoteModal() {
  const {
    isLBVoteModalOpen,
    setIsLBVoteModalOpen,
    setIsLBVoteSuccessModalOpen,
  } = LBVoteModalStore();
  const handleModalChange = () => {
    setIsLBVoteModalOpen(false);
  };

  const handleSubmit = () => {
    setIsLBVoteModalOpen(false);
    setIsLBVoteSuccessModalOpen(true);
  };

  return (
    <Dialog open={isLBVoteModalOpen} onOpenChange={handleModalChange}>
      <DialogContent
        style={{ backgroundSize: "100%" }}
        className="sm:max-w-[425px] bg-[url(/images/vote-for-bg.png)] max-sm:bg-[url(/images/vote-for-mobile-ripped-paper.png)] bg-no-repeat bg-center bg-contain bg-transparent border-none h-[500px] max-sm:w-full max-sm:bg-customfull max-sm:h-full"
      >
        <div
          className={`relative ${imfell400.className} gap-6 flex flex-col items-center justify-center`}
        >
          <button
            onClick={handleModalChange}
            className="absolute top-16 left-2 flex w-7 h-7 justify-center items-center rounded-full border-2 border-[#D2BFA1] bg-[#EAE5DA]"
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
              src="https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg"
              alt=""
            />
            <h1 className="text-[#502A29]">@jhon</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 max-sm:w-full max-md:w-full max-lg:w-[90%] w-[90%] max-xl:w-full">
            <div
              style={{ backgroundSize: "100% 100%" }}
              className="bg-[url(/images/vote-for-text-container.png)] bg-center bg-no-repeat h-[15vh] w-[17vw] max-sm:w-[90%] max-md:w-[90%] p-3 max-lg:w-full max-xl:w-[90%]"
            >
              <textarea
                placeholder="Leave your comments here"
                className="flex w-full h-full outline-none border-none bg-transparent"
                name=""
                id=""
              ></textarea>
            </div>
            <Button onClick={handleSubmit} className="bg-[#796741]">
              Submit Vote
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LBVoteModal;
