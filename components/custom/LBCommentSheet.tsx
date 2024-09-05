import React, { useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LBCommentStore } from "@/store";
import { imfell400 } from "@/utils/fonts";
import LBComment from "./LBComment";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import LBVoteModal from "./LBVoteModal";

gsap.registerPlugin(ScrollTrigger);

function LBCommentSheet() {
  const { isLBCommentsSheetOpen, setIsLBCommentsSheetOpen } = LBCommentStore();
  const mainRef = useRef(null);

  const handleCloseSheet = () => {
    const tl = gsap.timeline({ defaults: { ease: "power1" } });
    tl.to(mainRef.current, {
      right: "-105%",
      transformOrigin: "right",
      ease: "power2.in",
    });
    tl.to(mainRef.current, {
      display: "none",
      onComplete: () => {
        setIsLBCommentsSheetOpen(false);
      },
    });
  };

  return (
    <div
      ref={mainRef}
      // style={{ transform: "translateX(205%)" }}
      className={`bg-[url(/images/LBCommentsSheet.png)] h-[130.5vh] absolute w-[25%] bg-cover bg-no-repeat top-[9.5%] -right-[105%] comment-main-ref flex-col hidden`}
    >
      <div
        className={`flex items-center flex-col justify-center ${imfell400.className} h-[182px] gap-4 mt-5`}
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-[#EAE5DA] text-4xl">Comments For</h1>
          <img src="/images/LBCommentsDivider.png" alt="" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-[#EAE5DA] text-xl">@jhon</h1>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 mt-16 items-center">
        <LBComment width="80%" marginLeft="1.25rem" isMobile={false}/>
        <LBComment width="80%" marginLeft="1.25rem" isMobile={false}/>
        <LBComment width="80%" marginLeft="1.25rem" isMobile={false}/>
        <LBComment width="80%" marginLeft="1.25rem" isMobile={false}/>
      </div>
      <div
        className={`mt-5 ${imfell400.className} flex flex-col justify-center items-center gap-4 right-7`}
      >
        <div
          style={{ backgroundSize: "100% 100%" }}
          className="bg-[url(/images/LBCommentsContainer.png)] bg-center bg-no-repeat h-[20vh] w-[20vw] p-3"
        >
          <textarea
            className="flex w-full h-full outline-none border-none bg-transparent"
            name=""
            id=""
          ></textarea>
        </div>
        <Button className="bg-[#796741]">Comment</Button>
      </div>
      <button
        onClick={handleCloseSheet}
        className="w-12 h-12 bg-[#EAE5DA] border-2 border-[#D2BFA1] flex justify-center items-center rounded-full absolute top-1/2 -left-3"
      >
        <ChevronRight />
      </button>
      <LBVoteModal />
    </div>
  );
}

export default LBCommentSheet;
