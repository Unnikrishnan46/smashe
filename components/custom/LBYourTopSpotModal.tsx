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
          <div ref={divRef} className="bg-[#2B1F1F]/70 p-8">
          <LBFlagBanner
            name={previousTopTen[0]?.name}
            title="Reigning Weekly Winner"
            image={previousTopTen[0]?.photoUrl}
            flagImage={"/images/paperScroll1.png"}
            mode={"light"}
          />
          </div>
          <Button ref={downloadBtnRef} onClick={handleCaptureClick} className="bg-[#796741] hover:bg-[#907946] mt-3">Download</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LBYourTopSpotModal;
