import { cn } from "@/lib/utils";
import { imfell400 } from "@/utils/fonts";
import { LucideMegaphone } from "lucide-react";
import React from "react";

type props = {
  avatarImage: string;
  backgroundImage: string;
  backgroundImageMobile:string;
  position: string;
  name: string;
  voteCount: string;
  left: string;
  avatarSize: string;
  fontSize: string;
  gap: string;
  top: string;
  voteFontSize: string;
  megaPhoneTop: string;
  megaphoneLeft: string;
  avatarImageTop: string;
  megaphoneSize: string;
  mobileMarginTop:string;
  userData:any;
  onSpeakerClick:any;
  bgScale:any;
  profileScale:any;
};

function PositionBadge({
  avatarImage,
  backgroundImage,
  backgroundImageMobile,
  position,
  avatarImageTop,
  name,
  voteCount,
  left,
  avatarSize,
  gap,
  fontSize,
  top,
  voteFontSize,
  megaPhoneTop,
  megaphoneLeft,
  megaphoneSize,
  mobileMarginTop,
  userData,
  onSpeakerClick,
  bgScale,
  profileScale
}: props) {
  return (
    <div className="relative flex justify-center" style={{marginBottom:mobileMarginTop && `${mobileMarginTop}px`}}>
      <img style={{scale:bgScale}} className="max-sm:hidden flex" src={backgroundImage} alt="Leaderboard-Place" />
      <img className="max-sm:flex hidden" src={backgroundImageMobile} alt="Leaderboard-Place" />

      <div>
        <img
          className={cn("rounded-full absolute", {
            [`left-[${left}px]`]: left,
          })}
          style={{
            width: avatarSize === "0" ? 0 : `${avatarSize}px`,
            height: avatarSize === "0" ? 0 : `${avatarSize}px`,
            left: left && `${left}px`,
            top: avatarImageTop && `${avatarImageTop}px`,
            scale:profileScale
          }}
          src={avatarImage}
          alt=""
        />
      </div>

      <div
        className="bg-[#EAE5DA] border-[3px] rounded-full absolute border-[#D2BFA1] justify-center items-center flex"
        style={{
          top: megaPhoneTop && `${megaPhoneTop}px`,
          left: megaphoneLeft && `${megaphoneLeft}px`,
          height: megaphoneSize && `${megaphoneSize}px`,
          width: megaphoneSize && `${megaphoneSize}px`,
        }}
      >
        <LucideMegaphone onClick={()=>{onSpeakerClick(userData)}} size={15}/>
        {/* <img style={{height: megaphoneSize && `${megaphoneSize}px`,width: megaphoneSize && `${megaphoneSize}px`,}} src="/images/Megaphone.png" alt="Megaphone" /> */}
      </div>
      <div
        className={`flex flex-col items-center justify-center absolute ${imfell400.className}`}
        style={{
          gap: gap && `${gap}rem`,
          top: top && `${top}`,
          // left: contentLeft && `${contentLeft}px`,
        }}
      >
        <h1 className="text-[#EAE5DA] min-[1200px]:text-xl">{name}</h1>
        <div className="flex flex-col items-center justify-center">
          <h1
            style={{
              filter: "drop-shadow(0 0 5px #FFD599)",
              fontSize: fontSize && `${fontSize}px`,
            }}
            className={`text-[#EAE5DA]`}
          >
            {position}
          </h1>
          <p
            style={{ fontSize: voteFontSize && `${voteFontSize}px` }}
            className="text-[#EAE5DA]"
          >
            {voteCount} votes
          </p>
        </div>
      </div>
    </div>
  );
}

export default PositionBadge;
