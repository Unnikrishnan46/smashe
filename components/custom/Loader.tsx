import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

function Loader() {
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    gsap.to(".dot", {
      y: 10,
      stagger: 0.1,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      duration: 0.6,
      backgroundColor: "#000000",
    });
  });
  return (
    <div className="w-full h-screen justify-center items-center flex gap-2">
      <div className="h-5 w-5 rounded-full bg-red-500 dot"></div>
      <div className="h-5 w-5 rounded-full bg-red-500 dot"></div>
      <div className="h-5 w-5 rounded-full bg-red-500 dot"></div>
    </div>
  );
}

export default Loader;
