"use client";

import About from "@/components/custom/About";
import Footer from "@/components/custom/Footer";
import Hero from "@/components/custom/Hero";
import HomeNavbar from "@/components/custom/HomeNavbar";
import Tokenomics from "@/components/custom/Tokenomics";
import VoteSection from "@/components/custom/VoteSection";
import WhitePapper from "@/components/custom/WhitePapper";
import { gsapAnimationStore } from "@/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import "@/components/custom/particles.css";
import ParticlesOverlay from "@/components/custom/ParticlesOverlay";
import { useGlobalAudioPlayer } from "react-use-audio-player";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const { homePageAnimationTl, sethomePageAnimationTl } = gsapAnimationStore();
  const homePageRef = useRef(null);
  const { load,play,pause,volume ,playing} = useGlobalAudioPlayer();

  useGSAP(() => {
    homePageAnimationTl.from(
      homePageRef.current,
      {
        opacity: 0,
        duration: 1,
        onComplete:()=>{
          load('/audios/bg-music.mp3', {
            autoplay: true,
            initialVolume:0.2
          });
          play();
        }
      },
      "1"
    );
  });


  return (
    <div className="h-full" ref={homePageRef}>
      {/* <ParticlesOverlay /> */}
      <HomeNavbar playing={playing} pause={pause} play={play}/>
      <Hero playing={playing} pause={pause} play={play}/>
      <About />
      <Tokenomics />
      <WhitePapper />
      <VoteSection />
      <Footer />
    </div>
  );
}
