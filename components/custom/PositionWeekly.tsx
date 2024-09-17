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
  const [isWidthAbove1200, setIsWidthAbove1200] = useState(false);
  const { isLBCommentsMobileSheetOpen, setIsLBCommentsMobileSheetOpen } =
  LBCommentStore();
  const { isLBCommentsSheetOpen, setIsLBCommentsSheetOpen } = LBCommentStore();

  useEffect(() => {
    const handleResize = () => {
      setIsWidthBelow640(window.innerWidth < 640);
      setIsWidthAbove1200(window.innerWidth >= 1200); // Set true if width is above 1200px
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <div className="flex items-center" style={{gap:isWidthAbove1200?"4rem":"0rem"}}>
      <PositionBadge
        avatarImage={previousTopTen[1]?.photoUrl}
        avatarImageTop={isWidthAbove1200?"-30":"5"}
        name={previousTopTen[1]?.name}
        position="2nd"
        backgroundImage="/images/Leaderboard-Place1.png"
        voteCount={previousTopTen[1]?.votes}
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
        userData={previousTopTen[1]}
        onSpeakerClick={openCommentSheet}
        bgScale={isWidthAbove1200?1.5:1}
        profileScale={isWidthAbove1200?1.5:1}
      />
      <PositionBadge
        avatarImage={previousTopTen[0]?.photoUrl}
        avatarImageTop={isWidthAbove1200?"-46":"5"}
        name={previousTopTen[0]?.name}
        position="1st"
        backgroundImage="/images/Leaderboard-Place2.png"
        voteCount={previousTopTen[0]?.votes}
        left={isWidthBelow640 ? "37" : "67.5" }
        avatarSize={isWidthBelow640 ? "48" :"73"}
        fontSize={isWidthAbove1200? "34":"24"}
        gap={isWidthBelow640 ? "1" :"2" }
        top="30%"
        voteFontSize={isWidthAbove1200 ? "24":"14"}
        megaPhoneTop={isWidthAbove1200?"25":"30"}
        megaphoneLeft={isWidthBelow640 ? "60" :"120" }
        megaphoneSize="30"
        backgroundImageMobile="/images/Leaderboard-mobile-Place2.png"
        mobileMarginTop={isWidthBelow640 ? "60" :"0" }
        userData={previousTopTen[0]}
        onSpeakerClick={openCommentSheet}
        bgScale={isWidthAbove1200?1.5:1}
        profileScale={isWidthAbove1200?1.5:1}
      />
      <PositionBadge
        avatarImage={previousTopTen[2]?.photoUrl}
        avatarImageTop={isWidthAbove1200?"-30":"5"}
        name={previousTopTen[2]?.name}
        position="3rd"
        backgroundImage="/images/Leaderboard-Place3.png"
        voteCount={previousTopTen[2]?.votes}
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
        userData={previousTopTen[2]}
        onSpeakerClick={openCommentSheet}
        bgScale={isWidthAbove1200?1.5:1}
        profileScale={isWidthAbove1200?1.5:1}
      />
    </div>
  );
}

export default PositionWeekly;
