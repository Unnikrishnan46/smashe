"use client";

import { imfell400 } from "@/utils/fonts";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function About() {
  const aboutMainRef = useRef(null);
  const headingRef = useRef(null);
  const aboutPara = useRef(null);
  useGSAP(() => {
    gsap.from(".about-heading", {
      scrollTrigger: {
        trigger: aboutMainRef.current,
        start: "top 65%",
      },
      duration: 1,
      opacity: 0,
    });

    gsap.from(".about-card-img", {
      scrollTrigger: {
        trigger: aboutMainRef.current,
        start: "top 20%",
        markers: false,
      },
      duration: 2,
      opacity: 0,
      x: 20,
    });

    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        markers: false,
      },
      duration: 2,
      opacity: 0,
    });

    const text = SplitType.create(aboutPara?.current!);

    gsap.from(text.lines, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 70%",
        markers: false,
      },
      duration: 2,
      opacity: 0,
      stagger: 0.2,
    });
  });

  return (
    <div
      ref={aboutMainRef}
      className={`bg-[url(/images/what.png)] max-sm:bg-[url(/images/aboutBGMobile.png)] h-[150vh] max-sm:h-[160vh] bg-cover bg-no-repeat -mt-7 w-full relative z-40 max-[400px]:h-[137vh] min-[1200px]:h-[180vh] min-[1400px]:-mt-10 max max-sm:-mt-9 aboutSection`}
    >
      <div className="w-full h-full justify-center items-center flex flex-col">
        <div className="w-full justify-center items-center flex flex-col max-sm:px-8">
          <h1
            className={`text-8xl max-sm:text-6xl max-[400px]:text-5xl ${imfell400.className} text-[#EAE5DA] about-heading`}
          >
            About us
          </h1>
          <img src="/images/divider.png" alt="divider" />
        </div>
        <div className="flex w-full max-sm:flex-col max-[850px]:flex-col">
          <div className="w-1/2 max-sm:w-full max-sm:justify-center max-[850px]:!items-center max-[850px]:flex max-sm:flex max-[850px]:w-full max-[850px]:justify-center">
            <img
              className="ml-16 max-sm:hidden max-[850px]:w-[20rem] max-[850px]:ml-0 about-card-img "
              src="/images/aboutCards.png"
              alt="card"
            />
            <img
              className="hidden max-sm:flex max-[400px]:w-3/4 about-card-img"
              src="/images/aboutCards2.png"
              alt="card"
            />
          </div>
          <div className="w-1/2 max-sm:w-full max-[850px]:w-full flex flex-col justify-center items-start max-sm:items-center gap-4 max-[850px]:text-center max-[850px]:items-center">
            <h1
              ref={headingRef}
              className={`text-[#F2E0C8] ${imfell400.className} text-5xl`}
            >
              What is $mashe?
            </h1>
            <div className="pr-40 max-sm:px-7 max-sm:text-center max-[850px]:w-full max-[850px]:text-center max-[850px]:pr-0">
              {/* <p
              ref={aboutPara}
                className={`text-[#C3AF93] ${imfell400.className} text-2xl max-sm:text-lg max-[400px]:text-sm`}
              >
                Lorem ipsum dolor sit amet consectetur. Sagittis aliquam lacinia
                enim at enim tempor lacinia lobortis cras. Lorem ipsum dolor sit
                amet consectetur. Sagittis aliquam lacinia enim at enim tempor
                lacinia lobortis cras. Lorem ipsum dolor sit amet consectetur.{" "}
              </p> */}
              <ol className={`text-[#C3AF93] ${imfell400.className} text-xl max-lg:text-lg max-md:text-sm max-md:gap-0 flex flex-col gap-8`}>
                <li>1. Convert some of your funds into Solana ($SOL) using a centralized exchange like Binance or Coinbase.</li>
                <li>2. Set up a new wallet using the Phantom App, and make sure to securely store your seed phrase by writing it down somewhere safe!</li>
                <li>3. Copy your Solana wallet address and transfer some Solana from your exchange account to your Phantom wallet.</li>
                <li className="max-md:hidden flex">4. Head over to an exchange platform like Raydium (use our buy button if you&apos;re having difficulties) and go to the &apos;Swap&apos; section. Connect your Phantom wallet when asked and &quot;Swap&quot; your Solana for Mashe. You can find Mashe by pasting the contract address below:</li>
              </ol>
            </div>

            <button className="flex items-center justify-center p-0 hover:scale-110 transition-transform duration-300">
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
