import React, { useEffect, useState } from "react";
import PositionBadge from "./PositionBadge";
import { LBCommentStore } from "@/store";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

type props = {
  previousTopTen:any;
  getComments:any;
}

function PositionWeekly({previousTopTen,getComments}:props) {
  const [isWidthBelow640, setIsWidthBelow640] = useState(false);
  const { isLBCommentsMobileSheetOpen, setIsLBCommentsMobileSheetOpen } =
  LBCommentStore();
  const { isLBCommentsSheetOpen, setIsLBCommentsSheetOpen } = LBCommentStore();

  useEffect(() => {
    const handleResize = () => {
      setIsWidthBelow640(window.innerWidth < 640);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openCommentSheet = (selectedUser:any) => {
    console.log("function called");
    
    const tl = gsap.timeline({ defaults: { ease: "power1" } });
    if (isWidthBelow640) {
      setIsLBCommentsMobileSheetOpen(true);
      getComments(selectedUser)
    } else {
      if (!isLBCommentsSheetOpen) {
        tl.to(".comment-main-ref", {
          display: "flex",
          onComplete: () => {
            tl.to(".comment-main-ref", {
              right: 0,
              transformOrigin: "right",
              onComplete: () => {
                setIsLBCommentsSheetOpen(false);
                getComments(selectedUser);
              },
            });
          },
        });
      }
    }
  };

  return (
    <div className="flex items-center">
      <PositionBadge
        avatarImage={previousTopTen[1]?.photoUrl}
        avatarImageTop="5"
        name={previousTopTen[1]?.name}
        position="2nd"
        backgroundImage="/images/Leaderboard-Place1.png"
        voteCount={previousTopTen[1]?.votes}
        left="37"
        avatarSize="48"
        fontSize="24"
        gap="1"
        top="30%"
        voteFontSize="14"
        // contentLeft="0"
        megaPhoneTop="30"
        megaphoneLeft="60"
        megaphoneSize="30"
        backgroundImageMobile="/images/Leaderboard-mobile-Place1.png"
        mobileMarginTop="0"
        userData={previousTopTen[1]}
        onSpeakerClick={openCommentSheet}
      />
      <PositionBadge
        avatarImage={previousTopTen[0]?.photoUrl}
        avatarImageTop="5"
        name={previousTopTen[0]?.name}
        position="1st"
        backgroundImage="/images/Leaderboard-Place2.png"
        voteCount={previousTopTen[0]?.votes}
        left={isWidthBelow640 ? "37" : "67.5" }
        avatarSize={isWidthBelow640 ? "48" :"73"}
        fontSize={isWidthBelow640 ? "24" :"34" }
        gap={isWidthBelow640 ? "1" :"2" }
        top="30%"
        voteFontSize={isWidthBelow640 ? "14" :"24" }
        // contentLeft={isWidthBelow640 ? "30" :"55" }
        megaPhoneTop={isWidthBelow640 ? "30" :"45" }
        megaphoneLeft={isWidthBelow640 ? "60" :"120" }
        megaphoneSize="30"
        backgroundImageMobile="/images/Leaderboard-mobile-Place2.png"
        mobileMarginTop={isWidthBelow640 ? "60" :"0" }
        userData={previousTopTen[0]}
        onSpeakerClick={openCommentSheet}
      />
      <PositionBadge
        avatarImage={previousTopTen[2]?.photoUrl}
        avatarImageTop="5"
        name={previousTopTen[2]?.name}
        position="3rd"
        backgroundImage="/images/Leaderboard-Place3.png"
        voteCount={previousTopTen[2]?.votes}
        left="37"
        avatarSize="48"
        fontSize="24"
        gap="1"
        top="30%"
        voteFontSize="14"
        // contentLeft="30"
        megaPhoneTop="30"
        megaphoneLeft="60"
        megaphoneSize="30"
        backgroundImageMobile="/images/Leaderboard-mobile-Place1.png"
        mobileMarginTop="0"
        userData={previousTopTen[2]}
        onSpeakerClick={openCommentSheet}
      />
    </div>
  );
}

export default PositionWeekly;
