"use client"

import { imfell400 } from "@/utils/fonts";
import React from "react";

function About() {
  return (
    <div
      className={`bg-[url(/images/what.png)] max-sm:bg-[url(/images/aboutBGMobile.png)] h-[150vh] max-sm:h-[120vh] bg-cover bg-no-repeat -mt-7 w-full relative z-40 max-[400px]:h-[137vh]`}
    >
      <div className="w-full h-full justify-center items-center flex flex-col">
        <div className="w-full justify-center items-center flex flex-col max-sm:px-8">
          <h1 className={`text-8xl max-[400px]:text-5xl ${imfell400.className} text-[#EAE5DA]`}>
            About us
          </h1>
          <img src="/images/divider.png" alt="divider" />
        </div>
        <div className="flex w-full max-sm:flex-col">
          <div className="w-1/2 max-sm:w-full max-sm:justify-center max-sm:flex">
            <img className="ml-16 max-sm:hidden" src="/images/aboutCards.png" alt="card" />
            <img className="hidden max-sm:flex max-[400px]:w-3/4" src="/images/aboutCards2.png" alt="card" />
          </div>
          <div className="w-1/2 max-sm:w-full flex flex-col justify-center items-start max-sm:items-center gap-4">
            <h1 className={`text-[#F2E0C8] ${imfell400.className} text-5xl`}>
              What is $mashe?
            </h1>
            <div className="pr-40 max-sm:px-7 max-sm:text-center ">
              <p className={`text-[#C3AF93] ${imfell400.className} text-2xl max-sm:text-xl max-[400px]:text-sm`}>
              Lorem ipsum dolor sit amet consectetur. Sagittis aliquam lacinia
              enim at enim tempor lacinia lobortis cras. Lorem ipsum dolor sit
              amet consectetur. Sagittis aliquam lacinia enim at enim tempor
              lacinia lobortis cras. Lorem ipsum dolor sit amet consectetur.{" "}
            </p>
            </div>
            
            <button className="flex items-center justify-center p-0">
              <img
                src="/images/buyNowBtn.png"
                alt=""
                className="h-full object-cover"
              />
              <h1
                className={`absolute font-bold text-lg ${imfell400.className} text-[#2E3A5B] text-xl`}
              >
                BUY NOW
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
