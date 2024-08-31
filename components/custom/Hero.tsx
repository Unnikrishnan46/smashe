"use client"
import { navigationMenuStore } from "@/store";
import { imfell400, ringbearer } from "@/utils/fonts";
import { LucideClipboard, LucideMenu, LucidePlay } from "lucide-react";
import React from "react";

function Hero() {
  const {setIsNavMenuOpen} = navigationMenuStore();

  const handleMenuOpen = ()=>{
    setIsNavMenuOpen(true);
  }
  return (
    <div
      className={`bg-[url(/images/heroBG.png)] h-[95vh] bg-cover bg-no-repeat max-sm:bg-center`}
    >
      <div className="h-full justify-end flex pl-20 flex-col gap-6 max-sm:justify-center max-sm:px-4 max-sm:items-center">
      <div className="hidden absolute top-24 max-sm:flex items-center h-[45px] mb-20 bg-contain bg-no-repeat bg-[url(/images/addressFrame.png)]">
          <div className="flex items-center justify-center px-8">
            <LucideClipboard color="white" />
            <p
              className={`text-white font-bold text-center text-base ${imfell400.className} text-[#EAE5DA]`}
            >
              0x5de758bba013e58dae2693aea3f0b12b31a3023d
            </p>
          </div>
        </div>
        <div>
          <h1
            className={`${ringbearer.className} text-7xl text-[#EAE5DA] tracking-[0.05] max-sm:text-8xl`}
            style={{
              textShadow: "1px 7px 0px #372400",
              color: "transparent",
              WebkitTextFillColor: "#EAE5DA",
            }}
          >
            $MASHE
          </h1>
        </div>
        <div className="max-sm:text-2xl max-sm:w-full  max-sm:text-center max-sm:mt-4">
          <p
            className={`max-md:truncate max-sm:text-wrap leading-6 max-sm:leading-7 text-white ${imfell400.className} max-sm:text-`}
          >
            Lorem ipsum dolor sit amet consectetur. Sagittis aliquam lacinia
            enim at enim tempor lacinia lobortis cras.
          </p>
        </div>
        <div className="flex flex-row items-center gap-8 max-sm:hidden">
          <button className="relative flex items-center justify-center p-0">
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
          <button className="relative flex items-center justify-center p-0">
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
        <div className="flex items-center gap-6 max-sm:hidden">
          <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
            <img src="/images/xLogo.png" alt="xLogo" />
          </button>
          <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
            <img src="/images/telegramLogo.png" alt="xLogo" />
          </button>
          <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
            <img src="/images/eagleLogo.png" alt="xLogo" />
          </button>
        </div>

        <div className="flex items-center h-[45px] mb-20 bg-contain bg-no-repeat bg-[url(/images/addressFrame.png)] max-sm:hidden">
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
      <div className="flex flex-col max-lg:hidden justify-center items-center absolute z-50 left-0 right-0 top-3/4 gap-2">
        <div className="h-9 w-9 rounded-full justify-center items-center border-2 flex bg-[#F7F1E9] border-[#D2BFA1]">
          <img src="/images/doubleArrowDown.png" alt="doubleArrowDown" />
        </div>
        <p
          className={`text-center text-base ${imfell400.className} text-[#FFD599]`}
        >
          Scroll for more
        </p>
      </div>
      <div className="hidden max-sm:flex flex-col justify-center items-center absolute z-50 left-0 right-0 top-[80%] gap-2">
        <div className="h-9 w-9 rounded-full justify-center items-center border-2 flex bg-[#F7F1E9] border-[#D2BFA1]">
          <img src="/images/doubleArrowDown.png" alt="doubleArrowDown" />
        </div>
        <p
          className={`text-center text-base ${imfell400.className} text-[#FFD599]`}
        >
          Scroll for more
        </p>
      </div>
      <button className="max-sm:hidden h-20 w-20 justify-center items-center rounded-full bg-[#F7F1E9] border border-[#D2BFA1] absolute right-10 bottom-[10%] z-10 hidden max-lg:flex">
        <LucidePlay color="#502A29" size={35} strokeWidth={3} fill="#502A29"/>
      </button>
      <div className="hidden gap-4 absolute right-4 top-6 z-10 max-sm:flex">
        <button className="h-12 w-12 hidden justify-center items-center rounded-full bg-[#F7F1E9] border border-[#D2BFA1] max-sm:flex">
          <LucidePlay color="#502A29" strokeWidth={3} fill="#502A29"/>
        </button>
        <button onClick={handleMenuOpen} className="h-12 w-12 hidden justify-center items-center rounded-full bg-[#F7F1E9] border border-[#D2BFA1] max-sm:flex">
          <LucideMenu color="#502A29" strokeWidth={3}/>
        </button>
      </div>
    </div>
  );
}

export default Hero;
