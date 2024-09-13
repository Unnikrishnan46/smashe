"use client";
import React, { useEffect, useState } from "react";
import { imfell400, ringbearer } from "@/utils/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LucideLogOut } from "lucide-react";
import Link from "next/link";
import { LBTopTenStore, LBYourTopSpotStore } from "@/store";
import { User } from "firebase/auth";
import { get, ref } from "firebase/database";
import { database } from "@/firebase/firebase.config";

const navLinks = [
  { id: 1, routeName: "Leaderboard", route: "/leaderboard" },
  { id: 2, routeName: "Home", route: "/" },
];

type props = {
  currentUser:User;
  logOut:any;
  twitterData:any;
  telegramData:any;
  eagleData:any;
}
  function LBNavbar({currentUser,logOut,twitterData,telegramData,eagleData}:props) {
  const [activeRoute, setActiveRoute] = useState("/leaderboard");

const openLinkInNewTab = (url: string): void => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    console.error('URL is required to open a link.');
  }
};

  return (
    <div
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      className="h-[7%] flex justify-between px-8 relative z-10 max-sm:hidden"
    >
      <div className="flex gap-24 items-center ml-8">
        {navLinks?.map((item, index) => (
          <div
            key={index}
            className="justify-center items-center flex nav-links"
          >
            {activeRoute === item?.route && (
              <img
                // style={{ filter: "drop-shadow(0 0 10px #F7F1E9)" }}
                className="absolute -z-[0] top-0  nav-link-bg"
                src="/images/LBNavBG.png"
                alt="activeNavBg"
              />
            )}
            <Link
              href={item?.route}
              className={`text-[#D2BFA1] ${imfell400.className} ${
                activeRoute === item.route && `text-[#FFD599]`
              } relative`}
            >
              {item?.routeName}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex items-center max-md:hidden">
        <h1
          className={`${ringbearer.className} text-[#EAE5DA] tracking-[0.05] text-4xl`}
          style={{
            WebkitTextFillColor: "#FBFBFB",
          }}
        >
          $MASHE
        </h1>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 max-sm:hidden">
          <button onClick={()=>openLinkInNewTab(twitterData!)} className="h-8 w-8 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1] hero-connects">
            <img className="scale-75" src="/images/xLogo.png" alt="xLogo" />
          </button>
          <button onClick={()=>openLinkInNewTab(telegramData!)}
            className="h-8 w-8 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1] hero-connects"
          >
            <img
              className="scale-75"
              src="/images/telegramLogo.png"
              alt="xLogo"
            />
          </button>
          <button onClick={()=>openLinkInNewTab(eagleData!)}
            className="h-8 w-8 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1] hero-connects"
          >
            <img className="scale-75" src="/images/eagleLogo.png" alt="xLogo" />
          </button>
        </div>
        <div className={`flex items-center gap-3 ${imfell400.className}`}>
          <Avatar>
            <AvatarImage src={currentUser?.photoURL!} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-[#EAE5DA]">{currentUser?.displayName}</h1>
          <Button onClick={logOut} size={"icon"} className="bg-transparent">
            <LucideLogOut color="#EAE5DA" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LBNavbar;
