"use client"
import { imfell400 } from "@/utils/fonts";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function WhitePapper() {
  const headingRef = useRef(null);
  const whitePapperRef = useRef(null);
  const whitePapersecondHeading = useRef(null);

  useGSAP(()=>{

    gsap.from(headingRef.current,{
      scrollTrigger:{
        trigger:whitePapperRef.current,
        start:"top center",
      },
      y:20,
      opacity:0
    });

    gsap.from(whitePapersecondHeading.current,{
      scrollTrigger:{
        trigger:whitePapperRef.current,
        start:"top 30%",
      },
      x:-40,
      opacity:0
    });

    gsap.from(".white-paper-para",{
      scrollTrigger:{
        trigger:whitePapperRef.current,
        start:"top 20%",
      },
      x:-40,
      opacity:0
    });

    gsap.from(".white-paper-book-img",{
      scrollTrigger:{
        trigger:whitePapperRef.current,
        start:"top 30%",
      },
      x:40,
      opacity:0
    });

    gsap.from(".white-paper-btn",{
      scrollTrigger:{
        trigger:whitePapperRef.current,
        start:"top 20%",
      },
      x:-40,
      opacity:0
    });

  })
  return (
    <div 
    ref={whitePapperRef}
      className={`bg-[url(/images/whitepaper.png)] max-sm:bg-[url(/images/whitepaperBGMobile.png)] max-sm:bg-center h-[120vh] max-sm:z-20 max-sm:-top-6  py-32 relative z-10 bg-cover bg-no-repeat -mt-10 w-full max-[400px]:h-full max-[400px]:-mt-16 max-sm:h-full`}
    >
      <div className="max-sm:flex max-sm:flex-col justify-center items-center hidden px-8 max-sm:mb-8">
        <h1 ref={headingRef} className={`${imfell400.className} text-[#F2E0C8] text-6xl`}>
          Whitepaper
        </h1>
        <img src="/images/divider.png" alt="divider" />
      </div>
      <div className="w-full flex flex-row items-center px-20 h-full max-sm:px-8 max-sm:flex-col-reverse">
        <div className="flex flex-col justify-center items-start max-sm:items-center max-sm:justify-start h-full gap-8">
          <div className="max-sm:hidden">
            <h1 ref={headingRef} className={`${imfell400.className} text-[#F2E0C8] text-8xl max-[1200px]:text-7xl`}>
              Whitepaper
            </h1>
          </div>
          <h6 ref={whitePapersecondHeading} className={`${imfell400.className} text-[#F2E0C8] text-4xl max-sm:text-center max-sm:text-3xl`}>
            Lorem ipsum dolor sit amet consectetur
          </h6>
          <div
            className={`${imfell400.className} text-[#C3AF93] text-2xl gap-3 flex flex-col max-sm:text-base max-sm:text-center`}
          >
            <span className="white-paper-para">
              Lorem ipsum dolor sit amet consectetur. Sagittis aliquam lacinia
              enim at enim tempor lacinia lobortis cras.
            </span>
            <span className="white-paper-para">
              Lorem ipsum dolor sit amet consectetur. Sagittis aliquam lacinia
              enim at enim tempor lacinia lobortis cras.
            </span>
          </div>
          <button className="flex items-center justify-center p-0 hover:scale-110 transition-transform duration-300 white-paper-btn">
            <img src="/images/exploreBtnBg.png" alt="" className="h-full" />
            <h1
              className={`absolute font-bold text-lg ${imfell400.className} text-[#2E3A5B] text-xl`}
            >
              Explore Whitepaper
            </h1>
          </button>
        </div>
        <div className="flex max-sm:hidden max-md:hidden">
          <img className="max-w-max max-lg:w-[99%] white-paper-book-img" src="/images/book.png" alt="book" />
        </div>
        <div className="hidden max-sm:flex">
          <img className="max-w-max white-paper-book-img" src="/images/bookMobile.png" alt="book" />
        </div>
      </div>
    </div>
  );
}

export default WhitePapper;
