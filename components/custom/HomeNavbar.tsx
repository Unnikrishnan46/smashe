"use client";
import { imfell400 } from "@/utils/fonts";
import { LucidePlay } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const navLinks = [
  { id: 1, routeName: "About Us", route: "/" },
  { id: 2, routeName: "Tokenomics", route: "/tokenomics" },
  { id: 3, routeName: "Whitepaper", route: "/whitepaper" },
  { id: 4, routeName: "Vote", route: "/vote" },
  { id: 5, routeName: "Join Us", route: "/join" },
];

function HomeNavbar() {
  const [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, []);
  return (
    <div
      className="absolute top-0 h-16 w-full z-0 max-sm:hidden"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="flex flex-row justify-center items-center w-full h-full gap-16 text-xl text-[#D2BFA1]">
        {navLinks?.map((item, index) => (
          <div key={index} className="justify-center items-center flex">
            {activeRoute === item?.route && (
              <img
                className="absolute top-0 -z-[1]"
                src="/images/activeNavBg.png"
                alt="activeNavBg"
              />
            )}
            <Link href={item?.route} className={`${imfell400.className}`}>
              {item?.routeName}
            </Link>
          </div>
        ))}
      </div>
      <button className="h-8 w-8 justify-center items-center flex rounded-full bg-[#F7F1E9] border border-[#D2BFA1] absolute right-14 top-4 z-10 max-lg:hidden">
        <LucidePlay />
      </button>
    </div>
  );
}

export default HomeNavbar;
