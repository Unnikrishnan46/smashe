"use client"
import { imfell400, ringbearer } from "@/utils/fonts";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { loadingPageStore } from "@/store";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP);

function LoadingPage() {
  const { setIsLoadingPageDone } = loadingPageStore();
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const landingPageRef = useRef(null);

  const handleCountinueClick = () => {
    gsap.to(landingPageRef.current,{
      opacity:0,
      duration:1,
      onComplete:()=>{setIsLoadingPageDone(true)}
    });
    
  };

  useGSAP(() => {
    var tl = gsap.timeline({ defaults: { ease: "power1" } });
    const text = SplitType.create(headingRef?.current!);
    
    tl.to(landingPageRef.current,{
      opacity:1
    })

    tl.from(text.chars, {
      yPercent: 150,
      ease: "power4",
      stagger: 0.1,
    });

    tl.from(buttonRef.current, {
      opacity: 0,
      y: 20,
    });
  });


  return (
    <div ref={landingPageRef} className="flex h-screen w-screen bg-[#EAE5DA] overflow-hidden justify-center items-center flex-col gap-8 opacity-0">
      <div
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          padding: "1rem",
        }}
        className=""
      >
        <h1
          ref={headingRef}
          className={`${ringbearer.className} text-[#D2BFA1] tracking-[0.05] text-9xl max-md:text-7xl max-sm:text-6xl`}
          style={{
            textShadow: "1px 5px 0px #372400",
            color: "transparent",
            WebkitTextFillColor: "#b97405",
          }}
        >
          $MASHE
        </h1>
      </div>
      <div ref={buttonRef} className="border border-gray-700 p-1 rounded-full">
        <Button
          onClick={handleCountinueClick}
          className={`rounded-full px-12 ${imfell400.className} text-lg hover:bg-gray-500`}
        >
          Countinue
        </Button>
      </div>
    </div>
  );
}

export default LoadingPage;
