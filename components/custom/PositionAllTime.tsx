import React, { useEffect, useState } from "react";
import PositionBadge from "./PositionBadge";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { LBCommentStore } from "@/store";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);


type props = {
  topTenOfAllTime:any;
  getComments:any;
}

function PositionAllTime({topTenOfAllTime,getComments}:props) {
  const [isWidthBelow640, setIsWidthBelow640] = useState(false);
  const [isWidthAbove1200, setIsWidthAbove1200] = useState(false);
  const { isLBCommentsMobileSheetOpen, setIsLBCommentsMobileSheetOpen } =
  LBCommentStore();
  const { isLBCommentsSheetOpen, setIsLBCommentsSheetOpen } = LBCommentStore();


  const openCommentSheet = (selectedUser:any) => {
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
  
  useEffect(() => {
    const handleResize = () => {
      setIsWidthBelow640(window.innerWidth < 640);
      setIsWidthAbove1200(window.innerWidth >= 1200); // Set true if width is above 1200px
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex items-center" style={{gap:isWidthAbove1200?"4rem":"0rem"}}>
      <PositionBadge
        avatarImage={topTenOfAllTime[1]?.photoUrl}
        avatarImageTop={isWidthAbove1200?"-30":"5"}
        name={topTenOfAllTime[1]?.name}
        position="2nd"
        backgroundImage="/images/Leaderboard-Place1.png"
        voteCount={topTenOfAllTime[1]?.votes}
        left="37"
        avatarSize="48"
        fontSize={isWidthAbove1200? "34":"24"}
        gap="1"
        top="30%"
        voteFontSize={isWidthAbove1200 ? "24":"14"}
        megaPhoneTop={isWidthAbove1200?"11":"30"}
        megaphoneLeft="60"
        megaphoneSize="30"
        backgroundImageMobile="/images/Leaderboard-mobile-Place1.png"
        mobileMarginTop="0"
        userData={topTenOfAllTime[1]}
        onSpeakerClick={openCommentSheet}
        bgScale={isWidthAbove1200?1.5:1}
        profileScale={isWidthAbove1200?1.5:1}
      />
      <PositionBadge
        avatarImage={topTenOfAllTime[0]?.photoUrl}
        avatarImageTop={isWidthAbove1200?"-46":"5"}
        name={topTenOfAllTime[0]?.name}
        position="1st"
        backgroundImage="/images/Leaderboard-Place2.png"
        voteCount={topTenOfAllTime[0]?.votes}
        left={isWidthBelow640 ? "37" : "67.5" }
        avatarSize={isWidthBelow640 ? "48" :"73"}
        fontSize={isWidthAbove1200? "34":"24"}
        gap="1"
        top="30%"
        voteFontSize={isWidthAbove1200 ? "24":"14"}
        megaPhoneTop={isWidthAbove1200?"25":"30"}
        megaphoneLeft={isWidthAbove1200?"120":"60"}
        megaphoneSize="30"
        backgroundImageMobile="/images/Leaderboard-mobile-Place1.png"
        mobileMarginTop="0"
        userData={topTenOfAllTime[0]}
        onSpeakerClick={openCommentSheet}
        bgScale={isWidthAbove1200?1.5:1}
        profileScale={isWidthAbove1200?1.5:1}
      />
      <PositionBadge
        avatarImage={topTenOfAllTime[2]?.photoUrl}
        avatarImageTop={isWidthAbove1200?"-30":"5"}
        name={topTenOfAllTime[2]?.name}
        position="3rd"
        backgroundImage="/images/Leaderboard-Place3.png"
        voteCount={topTenOfAllTime[2]?.votes}
        left="37"
        avatarSize="48"
        fontSize={isWidthAbove1200? "34":"24"}
        gap="1"
        top="30%"
        voteFontSize={isWidthAbove1200 ? "24":"14"}
        megaPhoneTop={isWidthAbove1200?"11":"30"}
        megaphoneLeft="60"
        megaphoneSize="30"
        backgroundImageMobile="/images/Leaderboard-mobile-Place1.png"
        mobileMarginTop="0"
        userData={topTenOfAllTime[2]}
        onSpeakerClick={openCommentSheet}
        bgScale={isWidthAbove1200?1.5:1}
        profileScale={isWidthAbove1200?1.5:1}
      />
    </div>
  )
}

export default PositionAllTime
