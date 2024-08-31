import { imfell400 } from "@/utils/fonts";
import React from "react";

function Tokenomics() {
  return (
    <div
      className={`bg-[url(/images/tokenomicsBG.png)] max-sm:bg-[url(/images/tokenomicsBGMobile.png)] h-[120vh] max-sm:h-full max-sm:-top-7 relative z-20 bg-cover bg-no-repeat -mt-10 w-full`}
    >
      <div className="flex justify-center items-center w-full h-full flex-col gap-8 max-sm:pb-14">
        <div className="w-full justify-center items-center flex flex-col max-sm:px-8 max-sm:mt-24">
          <h1
            className={`text-8xl max-sm:text-7xl ${imfell400.className} text-[#EAE5DA]`}
          >
            Tokenomics
          </h1>
          <img src="/images/divider.png" alt="divider" />
        </div>
        <div className="flex items-center gap-8 mt-8 max-sm:hidden sm:flex-wrap sm:justify-center">
          <img
            className="mb-12 sm:w-48 md:w-auto"
            src="/images/tokenContainer1.png"
            alt="tokenContainer"
          />
          <img
            className="-mb-12 sm:w-48 md:w-auto"
            src="/images/tokenContainer2.png"
            alt="tokenContainer"
          />
          <img
            className="mb-12 sm:w-48 md:w-auto"
            src="/images/tokenContainer3.png"
            alt="tokenContainer"
          />
          <img
            className="-mb-12 sm:w-48 md:w-auto"
            src="/images/tokenContainer4.png"
            alt="tokenContainer"
          />
          <img
            className="mb-12 sm:w-48 md:w-auto"
            src="/images/tokenContainer5.png"
            alt="tokenContainer"
          />
        </div>

        <div className="px-[25%] text-center max-sm:px-4 max-md:px-8">
          <p className={`text-[#BEB3A8] ${imfell400.className} text-xl`}>
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
