"use client"
import { LBYourTopSpotStore } from "@/store";
import React, { useRef } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { imfell400 } from "@/utils/fonts";
import LBFlagBanner from "./LBFlagBanner";
import { Button } from "../ui/button";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

type props = {
  previousTopTen:any;
}


function LBYourTopSpotModal({previousTopTen}:props) {
  const { isLBYourTopSpotModalOpen, setIsLBYourTopSpotModalOpen } =
    LBYourTopSpotStore();
  const handleModalChange = () => {
    setIsLBYourTopSpotModalOpen(false);
  };

  const divRef = useRef(null);
  const downloadBtnRef = useRef(null);

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(divRef.current!,{useCORS:true,ignoreElements: (element) => {
      return element === downloadBtnRef.current;
    },});
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  };

  return (
    <Dialog open={isLBYourTopSpotModalOpen} onOpenChange={handleModalChange}>
      <DialogContent className="sm:max-w-[410px] bg-[url(/images/your-top-spot-bg.png)] max-sm:bg-[url(/images/top-spot-ripped-paper.png)] bg-no-repeat bg-center bg-contain bg-transparent border-none h-[521px]">
        <div
          className={`${imfell400.className} gap-6 flex flex-col items-center justify-center`}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-[#502A29] text-2xl font-semibold">Capture Your Top Spot</h1>
            <img src="/images/lb-your-top-spot-divider.png" alt="" />
          </div>
          <div ref={divRef} className="bg-[#2B1F1F]/70 p-8 w-[90%]">

          <div
            className={`flex flex-col justify-center items-center ${imfell400.className}`}
          >
            <h1 className="text-white text-lg">{previousTopTen[0]?.name}</h1>
            <h3 className="text-white opacity-75 text-sm m-0">
              Reigning Weekly Winner
            </h3>
            <div className="flex justify-center items-center relative z-10 h-auto w-auto p-0">
              <img
                className="h-40 w-40"
                src="/images/winnerFrame.png"
                alt=""
              />
              <img
                className="absolute h-24 w-24 -z-10 top-[30%] bottom-[70%]"
                src={previousTopTen[0]?.photoUrl}
                alt=""
              />
            </div>
          </div>
          {/* <LBFlagBanner
            name={previousTopTen[0]?.name}
            title="Reigning Weekly Winner"
            image={previousTopTen[0]?.photoUrl}
            flagImage={"/images/paperScroll1.png"}
            mode={"light"}
          /> */}
          </div>
          <Button ref={downloadBtnRef} onClick={handleCaptureClick} className="bg-[#796741] hover:bg-[#907946] mt-3">Download</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LBYourTopSpotModal;
