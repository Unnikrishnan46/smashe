"use client";
import React, { useState } from "react";
import NavLinkActiveBG from "./NavLinkActiveBG";
import { cn } from "@/lib/utils";
import { imfell400, ringbearer } from "@/utils/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LucideLogOut } from "lucide-react";
import SvgComponent from "./NavLinkActiveBG";
import Link from "next/link";
import { LBTopTenStore, LBYourTopSpotStore } from "@/store";

const navLinks = [
  { id: 1, routeName: "Leaderboard", route: "/leaderboard" },
  { id: 2, routeName: "Home", route: "/" },
];

function LBNavbar() {
  const [activeRoute, setActiveRoute] = useState("/leaderboard");
  const { isLBTopTenModalOpen, setIsLBTopTenModalOpen } = LBTopTenStore();
  const { isLBYourTopSpotModalOpen, setIsLBYourTopSpotModalOpen } =
    LBYourTopSpotStore();

  const openTopTenModal = () => {
    setIsLBTopTenModalOpen(true);
  };

  const openTopSpotModal = () => {
    setIsLBYourTopSpotModalOpen(true);
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
          <button className="h-8 w-8 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1] hero-connects">
            <img className="scale-75" src="/images/xLogo.png" alt="xLogo" />
          </button>
          <button
            onClick={openTopTenModal}
            className="h-8 w-8 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1] hero-connects"
          >
            <img
              className="scale-75"
              src="/images/telegramLogo.png"
              alt="xLogo"
            />
          </button>
          <button
            onClick={openTopSpotModal}
            className="h-8 w-8 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1] hero-connects"
          >
            <img className="scale-75" src="/images/eagleLogo.png" alt="xLogo" />
          </button>
        </div>
        <div className={`flex items-center gap-3 ${imfell400.className}`}>
          <Avatar>
            <AvatarImage src="https://i.ytimg.com/vi/8LUan4KWVMk/maxresdefault.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-[#EAE5DA]">@jhon</h1>
          <Button size={"icon"} className="bg-transparent">
            <LucideLogOut color="#EAE5DA" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LBNavbar;
