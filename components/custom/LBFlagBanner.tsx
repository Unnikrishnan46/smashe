import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { imfell400 } from "@/utils/fonts";
import { cn } from "@/lib/utils";

type props = {
    name:string;
    title:string;
    image:string;
    flagImage:string;
    mode:string;
}

function LBFlagBanner({name,title,image,flagImage,mode}:props) {
  return (
    <div className={`${imfell400.className} flex items-center justify-center max-sm:w-full max-sm:h-10rem max-sm:relative`}>
      <img className="min-[1200px]:scale-125" src={flagImage} alt="paperScroll" />
      <div className="flex items-center absolute gap-3 min-[1200px]:gap-10">
        <Avatar className="h-12 w-12 border-[#2B1F1F] border-[3px] min-[1200px]:scale-125">
          <AvatarImage src={image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
            <h1 style={{ filter: "drop-shadow(0 0 5px #FFD599)" }} className={cn("text-[#502A29] min-[1200px]:scale-125",mode === "dark" ? "text-[#EAE5DA]" : "text-[#502A29]" )}>{name}</h1>
            <p className={cn("text-[#502A29] text-sm min-[1200px]:scale-125",mode==="dark" ? "text-[#EAE5DA]" : "text-[#502A29]")}>{title}</p>
        </div>
      </div>
    </div>
  );
}

export default LBFlagBanner;
