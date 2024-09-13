import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { imfell400 } from "@/utils/fonts";
import { LBCommentStore } from "@/store";
import { Button } from "../ui/button";
import LBComment from "./LBComment";
import { ChevronLeft } from "lucide-react";

type props = {
  selectedUserComment:any[];
  selectedUser:any;
  currentUser:any;
  getComments:any;
}

function LBCommentsMobileSheet({selectedUserComment,selectedUser,currentUser,getComments}:props) {
  const { isLBCommentsMobileSheetOpen, setIsLBCommentsMobileSheetOpen } =
    LBCommentStore();
  const handleModalChange = () => {
    setIsLBCommentsMobileSheetOpen(false);          
  };
  return (
    <Dialog open={isLBCommentsMobileSheetOpen} onOpenChange={handleModalChange}>
      <DialogContent
        style={{ backgroundSize: "100% 100%" }}
        className="sm:max-w-full h-[95%] bg-[url(/images/comments-ripped-paper-mobile.png)] bg-no-repeat bg-center bg-contain bg-transparent border-none overflow-y-scroll"
      >
        <button
            onClick={handleModalChange}
            className="absolute top-16 left-2 flex w-7 h-7 justify-center items-center rounded-full border-2 border-[#D2BFA1] bg-[#EAE5DA]"
          >
            <ChevronLeft size={15} />
          </button>
        <div
          className={`${imfell400.className} gap-6 flex flex-col items-center justify-center`}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-[#502A29] text-2xl">Comments For</h1>
            <img src="/images/lb-comments-sheet-mobile-Divider.png" alt="" />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img
              className="w-16 h-16 rounded-full"
              src={selectedUser?.photoUrl}
              alt=""
            />
            <h1 className="text-[#502A29]">{selectedUser?.userName}</h1>
          </div>
          <div className="flex flex-col w-full items-center justify-center gap-3">
          {selectedUserComment?.map((comment,index)=>(
          <LBComment width="full" marginLeft="0rem" isMobile={true} comment={comment} key={index}/>
        ))}
            {/* <LBComment width="full" marginLeft="0rem" isMobile={true} />
            <LBComment width="full" marginLeft="0rem" isMobile={true} />
            <LBComment width="full" marginLeft="0rem" isMobile={true} />
            <LBComment width="full" marginLeft="0rem" isMobile={true} /> */}
          </div>
          <div
            className={`${imfell400.className} flex flex-col justify-center items-center gap-4 right-7 w-full`}
          >
            <div
              style={{ backgroundSize: "100% 100%" }}
              className="bg-[url(/images/LBCommentsContainer.png)] bg-center bg-no-repeat h-[100%] w-[95%] p-3"
            >
              <textarea
                placeholder="Leave your comment here"
                className="flex w-full h-full p-1 outline-none border-none bg-transparent placeholder:text-[#796741]"
                name=""
                id=""
              ></textarea>
            </div>
            <Button className="bg-[#796741]">Comment</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LBCommentsMobileSheet;
