"use client"
import { imfell400 } from "@/utils/fonts";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Tokenomics() {
  const tokenomicsMainRef = useRef(null);
  const tokenomicsHeadRef = useRef(null);
  const tokenomicsPara = useRef(null);
  useGSAP(()=>{

    gsap.from(tokenomicsHeadRef.current, {
      scrollTrigger: {
        trigger:tokenomicsHeadRef.current,
        start:"top 90%",
      },
      duration:1,
      opacity:0
    });

    gsap.from(".aboutDivider",{
      scrollTrigger:{
        trigger:tokenomicsHeadRef.current,
        start:"top 70%",
      },
      duration:1,
      scaleX:0,
      transformOrigin:"center"
    });

    gsap.from(".aboutDivider",{
      scrollTrigger:{
        trigger:tokenomicsHeadRef.current,
        start:"top 70%",
      },
      duration:1,
      opacity:0,
    });

    gsap.from(".tokenomics-f-img",{
      scrollTrigger:{
        trigger:tokenomicsHeadRef.current,
        start:"top 50%",
      },
      duration:1,
      opacity:0,
      stagger:0.2
    });

    const text = SplitType.create(tokenomicsPara?.current!);

    gsap.from(text.lines,{
      scrollTrigger:{
        trigger:".tokenomics-f-img",
        start:"top 30%",
      },
      duration:1,
      opacity:0,
      stagger:0.2
    });

  });

  return (
    <div
    ref={tokenomicsMainRef}
      className={`bg-[url(/images/tokenomicsBG.png)] max-sm:bg-[url(/images/tokenomicsBGMobile.png)] h-[120vh] max-sm:h-full max-sm:-top-7 relative z-20 max-sm:z-40 bg-cover bg-no-repeat -mt-10 w-full min-[768px]:h-[140vh] tokenomicsSection`}
    >
      <div className="flex justify-center items-center w-full h-full flex-col gap-8 max-sm:pb-14">
        <div className="w-full justify-center items-center flex flex-col max-sm:px-8 max-sm:mt-24">
          <h1 ref={tokenomicsHeadRef}
            className={`text-8xl max-sm:text-7xl ${imfell400.className} text-[#EAE5DA]`}
          >
            Tokenomics
          </h1>
          <img className="aboutDivider" src="/images/divider.png" alt="divider" />
        </div>
        <div className="flex items-center gap-8 mt-8 max-sm:hidden max-md:gap-2">
          <img
            className="mb-12 sm:w-48 md:w-auto max-[1270px]:h-[45%] tokenomics-f-img"
            src="/images/tokenContainer1.png"
            alt="tokenContainer"
          />
          <img
            className="-mb-12 sm:w-48 md:w-auto max-[1270px]:h-[45%] tokenomics-f-img"
            src="/images/tokenContainer2.png"
            alt="tokenContainer"
          />
          <img
            className="mb-12 sm:w-48 md:w-auto max-[1270px]:h-[45%] tokenomics-f-img"
            src="/images/tokenContainer3.png"
            alt="tokenContainer"
          />
          <img
            className="-mb-12 sm:w-48 md:w-auto max-[1270px]:h-[45%] tokenomics-f-img"
            src="/images/tokenContainer4.png"
            alt="tokenContainer"
          />
          <img
            className="mb-12 sm:w-48 md:w-auto max-[1270px]:h-[45%] tokenomics-f-img"
            src="/images/tokenContainer5.png"
            alt="tokenContainer"
          />
        </div>

        <div className="px-[25%] text-center max-sm:px-4 max-md:px-8">
          <p ref={tokenomicsPara} className={`text-[#BEB3A8] ${imfell400.className} text-xl`}>
            Lorem ipsum dolor sit amet consectetur. Sagittis aliquam lacinia
            enim at enim tempor lacinia lobortis cras. Dignissim lobortis
            consequat sem porttitor purus enim. Proin donec malesuada fringilla
            volutpat porttitor. Cursus fames lacus rutrum fermentum ornare.
          </p>
        </div>
        <div className="max-sm:flex hidden w-full justify-center">
          <img
            className=""
            src="/images/tokenFeaturesMobile.png"
            alt="tokenContainer"
          />
        </div>
      </div>
    </div>
  );
}

export default Tokenomics;
