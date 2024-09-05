"use client";
import { gsapAnimationStore } from "@/store";
import { imfell400 } from "@/utils/fonts";
import { useGSAP } from "@gsap/react";
import { LucidePause, LucidePlay } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { id: 1, routeName: "About Us", route: "/" },
  { id: 2, routeName: "Tokenomics", route: "/tokenomics" },
  { id: 3, routeName: "Whitepaper", route: "/whitepaper" },
  { id: 4, routeName: "Vote", route: "/vote" },
  { id: 5, routeName: "Join Us", route: "/join" },
];

function HomeNavbar({ playing ,pause,play}: { playing: boolean , pause:any,play:any}) {
  const [activeRoute, setActiveRoute] = useState("/");
  const { homePageAnimationTl, sethomePageAnimationTl } = gsapAnimationStore();
  const navRef = useRef(null);
  const navBarPlay = useRef(null);
  const activeNavRef = useRef(null);

  useGSAP(() => {
    homePageAnimationTl?.from(
      navRef.current,
      {
        opacity: 0,
        duration: 0.3,
      },
      "2"
    );

    homePageAnimationTl?.from(
      ".nav-links",
      {
        opacity: 0,
        stagger: 0.1,
      },
      "3"
    );

    homePageAnimationTl?.from(
      navBarPlay.current,
      {
        opacity: 0,
        x: 10,
      },
      "4"
    );

    homePageAnimationTl?.from(
      ".nav-link-bg",
      {
        scaleY: 0,
        transformOrigin: "top",
      },
      "5"
    );
  });

  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, []);
  return (
    <div
      ref={navRef}
      className="absolute top-0 h-16 w-full z-0 max-sm:hidden"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="flex flex-row justify-center items-center w-full h-full gap-16 text-xl text-[#D2BFA1]">
        {navLinks?.map((item, index) => (
          <div
            key={index}
            className="justify-center items-center flex nav-links"
          >
            {activeRoute === item?.route && (
              <img
                style={{ filter: "drop-shadow(0 0 10px #F7F1E9)" }}
                ref={activeNavRef}
                className="absolute top-0 -z-[1] nav-link-bg"
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
      {playing ? (
        <button
        onClick={pause}
          ref={navBarPlay}
          className="h-8 w-8 justify-center items-center flex rounded-full bg-[#F7F1E9] border border-[#D2BFA1] absolute right-14 top-4 z-10 max-lg:hidden"
        >
          <LucidePause />
        </button>
      ) : (
        <button
        onClick={play}
          ref={navBarPlay}
          className="h-8 w-8 justify-center items-center flex rounded-full bg-[#F7F1E9] border border-[#D2BFA1] absolute right-14 top-4 z-10 max-lg:hidden"
        >
          <LucidePlay />
        </button>
      )}
    </div>
  );
}

export default HomeNavbar;
