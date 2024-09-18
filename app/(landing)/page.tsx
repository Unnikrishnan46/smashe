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
import { useEffect, useRef, useState } from "react";
import "@/components/custom/particles.css";
import ParticlesOverlay from "@/components/custom/ParticlesOverlay";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { usePathname } from "next/navigation";
import { get, ref } from "firebase/database";
import { database } from "@/firebase/firebase.config";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const { homePageAnimationTl, sethomePageAnimationTl } = gsapAnimationStore();
  const homePageRef = useRef(null);
  const { load, play, pause, volume, playing } = useGlobalAudioPlayer();
  const pathname = usePathname();
  const [twitterData, setTwitterData] = useState<string | null>(null);
  const [telegramData, setTelegramData] = useState<string | null>(null);
  const [eagleData, setEagleData] = useState<string | null>(null);

  useGSAP(() => {
    homePageAnimationTl.to(
      homePageRef.current,
      {
        opacity: 1,
        duration: 1,
        onComplete: () => {
          if (pathname === "/") {
            load("/audios/bg-music.mp3", {
              autoplay: true,
              initialVolume: 0.2,
            });
            play();
          }
        },
      },
      "1"
    );
  });

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  const fetchSocialMediaData = async () => {
    try {
      const socialRef = ref(database, "/socials/");
      const snapshot = await get(socialRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setTwitterData(data.twitter || "");
        setTelegramData(data.telegram || "");
        setEagleData(data.eagle || "");
      }
    } catch (error) {
      console.error("Error fetching social media data: ", error);
    }
  };

  useEffect(()=>{
    fetchSocialMediaData();
  },[]);

  return (
    <div className="h-full opacity-0" ref={homePageRef}>
      <ParticlesOverlay />
      <HomeNavbar playing={playing} pause={pause} play={play} />
      <Hero playing={playing} pause={pause} play={play} twitterData={twitterData} telegramData={telegramData} eagleData={eagleData}/>
      <About />
      <Tokenomics />
      <WhitePapper />
      <VoteSection />
      <Footer twitterData={twitterData} telegramData={telegramData} eagleData={eagleData}/>
    </div>
  );
}
