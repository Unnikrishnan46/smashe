"use client";
import { gsapAnimationStore, navigationMenuStore } from "@/store";
import { imfell400, ringbearer } from "@/utils/fonts";
import {
  LucideClipboard,
  LucideMenu,
  LucidePause,
  LucidePlay,
} from "lucide-react";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type props = {
  playing: any;
  pause: any;
  play: any;
};

function Hero({ playing, pause, play }: props) {
  const { setIsNavMenuOpen } = navigationMenuStore();
  const { homePageAnimationTl } = gsapAnimationStore();
  const headingRef = useRef(null);
  const descripTionRef = useRef(null);
  const addressRef = useRef(null);
  const scrollMoreRef = useRef(null);

  useGSAP(() => {
    homePageAnimationTl?.from(
      headingRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.2,
      },
      "6"
    );

    homePageAnimationTl?.from(
      descripTionRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.2,
      },
      "6"
    );

    homePageAnimationTl.from(
      ".hero-btns",
      {
        // scale:0,
        // transformOrigin:"center",
        opacity: 0,
        stagger: 0.3,
      },
      "6"
    );

    homePageAnimationTl.from(
      ".hero-connects",
      {
        y: 80,
        stagger: 0.2,
      },
      "7"
    );

    homePageAnimationTl.from(
      addressRef.current,
      {
        scaleX: 0,
        transformOrigin: "left",
      },
      "8"
    );

    homePageAnimationTl.from(
      scrollMoreRef?.current,
      {
        y: -50,
        opacity: 0,
      },
      "8"
    );

    homePageAnimationTl.from(
      ".scroll-text",
      {
        y: -50,
        opacity: 0,
      },
      "8"
    );

    homePageAnimationTl.from(
      ".scroll-img-con",
      {
        y: -50,
        opacity: 0,
      },
      "8"
    );

    homePageAnimationTl.from(
      ".scroll-img",
      {
        y: -20,
        opacity: 0,
        repeat: -1,
        repeatDelay: 5,
        duration: 1,
      },
      "8"
    );
  });

  const handleMenuOpen = () => {
    setIsNavMenuOpen(true);
  };

  return (
    <div
      className={`bg-[url(/images/heroBG.png)] h-[95vh] bg-cover bg-no-repeat max-sm:bg-center`}
    >
      <div className="h-full justify-end flex pl-20 flex-col gap-6 max-sm:justify-center max-sm:px-4 max-sm:items-center">
        <div className="hidden absolute max-md:top-14 max-sm:top-16 top-24 max-[400px]:top-16 max-sm:flex items-center h-[45px] mb-20 bg-contain bg-no-repeat bg-[url(/images/addressFrame.png)] max-[400px]:h-[37px]">
          <div className="flex items-center justify-center px-8 h-full w-full">
            <LucideClipboard color="white" />
            <p
              className={`text-white font-bold text-center text-base max-[400px]:text-[0.9rem] max-[350px]:text-xs ${imfell400.className} text-[#EAE5DA] `}
            >
              0x5de758bba013e58dae2693aea3f0b12b31a3023d
            </p>
          </div>
        </div>
        <div>
          <h1
            ref={headingRef}
            className={`${ringbearer.className} text-[#EAE5DA] tracking-[0.05] text-7xl`}
            style={{
              textShadow: "1px 7px 0px #372400",
              color: "transparent",
              WebkitTextFillColor: "#EAE5DA",
            }}
          >
            $MASHE
          </h1>
        </div>
        <div className="max-sm:text-2xl max-md:hidden max-sm:w-full  max-sm:text-center max-sm:mt-4">
          <p
            ref={descripTionRef}
            className={`max-sm:text-wrap leading-6 max-sm:leading-7 text-white ${imfell400.className} max-sm:text-xl`}
          >
            Lorem ipsum dolor sit amet consectetur. Sagittis aliquam <br />{" "}
            lacinia enim at enim tempor lacinia lobortis cras.
          </p>
        </div>
        <div className="hidden w-[75%] max-md:flex max-sm:text-2xl max-sm:w-full  max-sm:text-center max-sm:mt-4">
          <p
            className={`max-sm:text-wrap leading-6 max-sm:leading-7 text-white ${imfell400.className} max-sm:text-xl`}
          >
            Lorem ipsum dolor sit amet consectetur. Sagittis aliquam lacinia
            enim at enim tempor lacinia lobortis cras.
          </p>
        </div>
        <div className="flex flex-row items-center gap-8 max-sm:hidden">
          <button className="relative flex items-center justify-center p-0 hero-btns hover:scale-110 transition-transform duration-300">
            <img
              src="/images/buyNowBtn.png"
              alt=""
              className="w-full h-full object-cover"
            />
            <h1
              className={`absolute font-bold text-lg ${imfell400.className} text-[#2E3A5B] text-xl`}
            >
              BUY NOW
            </h1>
          </button>
          <button className="relative flex items-center justify-center p-0 hero-btns hover:scale-110 transition-transform duration-300">
            <img
              src="/images/voteNowBtn.png"
              alt=""
              className="w-full h-full object-cover"
            />
            <h1
              className={`absolute text-white font-bold text-lg ${imfell400.className} text-[#EAE5DA] text-xl`}
            >
              Vote Now
            </h1>
          </button>
        </div>
        <div className="hidden max-sm:flex max-sm:flex-col gap-4 mt-4">
          <button className="relative flex items-center justify-center p-0">
            <img
              src="/images/buyNowBtnLarge.png"
              alt=""
              className="w-full h-full object-cover"
            />
            <h1
              className={`absolute font-bold text-lg ${imfell400.className} text-[#2E3A5B] text-xl`}
            >
              BUY NOW
            </h1>
          </button>
          <button className="relative flex items-center justify-center p-0">
            <img
              src="/images/voteNowBtnLarge.png"
              alt=""
              className="w-full h-full object-cover"
            />
            <h1
              className={`absolute text-white font-bold text-lg ${imfell400.className} text-[#EAE5DA] text-xl`}
            >
              Vote Now
            </h1>
          </button>
        </div>
        <div
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            padding: "0.5rem",
          }}
          className="flex items-center gap-6 max-sm:hidden"
        >
          <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1] hero-connects">
            <img src="/images/xLogo.png" alt="xLogo" />
          </button>
          <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1] hero-connects">
            <img src="/images/telegramLogo.png" alt="xLogo" />
          </button>
          <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1] hero-connects">
            <img src="/images/eagleLogo.png" alt="xLogo" />
          </button>
        </div>

        <div
          ref={addressRef}
          className="flex items-center h-[45px] mb-20 bg-contain bg-no-repeat bg-[url(/images/addressFrame.png)] max-sm:hidden"
        >
          <div className="flex items-center justify-center pl-12">
            <LucideClipboard color="white" />
            <p
              className={`text-white font-bold text-center text-base ${imfell400.className} text-[#EAE5DA]`}
            >
              0x5de758bba013e58dae2693aea3f0b12b31a3023d
            </p>
          </div>
        </div>
      </div>
      <div
        ref={scrollMoreRef}
        className="flex flex-col max-lg:hidden justify-center items-center absolute z-50 left-0 right-0 top-3/4 gap-2"
      >
        <div className="h-9 w-9 rounded-full justify-center items-center border-2 flex bg-[#F7F1E9] border-[#D2BFA1] scroll-img-con">
          <img
            className="scroll-img"
            src="/images/doubleArrowDown.png"
            alt="doubleArrowDown"
          />
        </div>
        <p
          className={`text-center text-base ${imfell400.className} text-[#FFD599] scroll-text`}
        >
          Scroll for more
        </p>
      </div>
      <div
        ref={scrollMoreRef}
        className="hidden max-sm:flex flex-col justify-center items-center absolute z-50 left-0 right-0 top-[80%] gap-2"
      >
        <div className="h-9 w-9 rounded-full justify-center items-center border-2 flex bg-[#F7F1E9] border-[#D2BFA1]">
          <img
          className="scroll-img"
            src="/images/doubleArrowDown.png"
            alt="doubleArrowDown"
          />
        </div>
        <p
          className={`text-center text-base ${imfell400.className} text-[#FFD599] scroll-text`}
        >
          Scroll for more
        </p>
      </div>
      {playing ? (
        <button onClick={pause} className="max-sm:hidden h-14 w-14 justify-center items-center rounded-full bg-[#F7F1E9] border border-[#D2BFA1] absolute right-10 bottom-[10%] z-10 hidden max-lg:flex">
          <LucidePause
            color="#502A29"
            size={25}
            strokeWidth={3}
            fill="#502A29"
          />
        </button>
      ) : (
        <button onClick={play} className="max-sm:hidden h-14 w-14 justify-center items-center rounded-full bg-[#F7F1E9] border border-[#D2BFA1] absolute right-10 bottom-[10%] z-10 hidden max-lg:flex">
          <LucidePlay
            color="#502A29"
            size={25}
            strokeWidth={3}
            fill="#502A29"
          />
        </button>
      )}

      <div className="hidden gap-4 absolute right-4 top-6 max-[400px]:top-3 z-10 max-sm:flex">
        {playing ?
        <button onClick={pause} className="h-12 w-12 max-md:h-8 max-md:w-8 max-[400px]:h-10 max-[400px]:w-10 hidden justify-center items-center rounded-full bg-[#F7F1E9] border border-[#D2BFA1] max-sm:flex">
        <LucidePause
          color="#502A29"
          size={15}
          strokeWidth={3}
          fill="#502A29"
        />
      </button> : 
        <button onClick={play} className="h-12 w-12 max-md:h-8 max-md:w-8 max-[400px]:h-10 max-[400px]:w-10 hidden justify-center items-center rounded-full bg-[#F7F1E9] border border-[#D2BFA1] max-sm:flex">
          <LucidePlay
            color="#502A29"
            size={15}
            strokeWidth={3}
            fill="#502A29"
          />
        </button>
      }
        
        <button
          onClick={handleMenuOpen}
          className="h-12 w-12 max-md:h-8 max-md:w-8 max-[400px]:h-10 max-[400px]:w-10 hidden justify-center items-center rounded-full bg-[#F7F1E9] border border-[#D2BFA1] max-sm:flex"
        >
          <LucideMenu color="#502A29" size={15} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

export default Hero;
