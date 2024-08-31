import { imfell400, ringbearer } from "@/utils/fonts";
import { LucideClipboard } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div
      className={`bg-[url(/images/footerBG.png)] max-sm:bg-[url(/images/sample.png)] h-[100vh] max-sm:h-[105vh] max-sm:bg-center bg-cover bg-no-repeat -mt-7 w-full relative z-50 max-sm:-mt-24`}
    >
      <div className="w-full flex flex-col h-full justify-center items-center gap-8">
        <div className="max-sm:hidden">
          <h1
            className={`${ringbearer.className} text-8xl max-sm:text-7xl max-sm:text-center text-[#EAE5DA] tracking-[0.05] max-sm:tracking-[0.1]`}
            style={{
              textShadow: "1 7px 0px #372400",
              color: "transparent",
              WebkitTextFillColor: "#EAE5DA",
            }}
          >
            Buy Now, Join Us
          </h1>
        </div>
        <div className="max-sm:flex hidden max-sm:px-6">
          <h1
            className={`${imfell400.className} text-8xl max-sm:text-8xl max-sm:text-center text-[#EAE5DA] tracking-[0.05]`}
            style={{
              textShadow: "1 7px 0px #372400",
              color: "transparent",
              WebkitTextFillColor: "#EAE5DA",
            }}
          >
            Buy Now, Join Us
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button className="h-14 w-14 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
            <img src="/images/xLogo.png" alt="xLogo" />
          </button>
          <button className="h-14 w-14 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
            <img src="/images/telegramLogo.png" alt="xLogo" />
          </button>
          <button className="h-14 w-14 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
            <img src="/images/eagleLogo.png" alt="xLogo" />
          </button>
        </div>
        {/* TODO ADDRESS */}
        <div className="flex items-center h-[45px] mb-20 bg-contain bg-no-repeat bg-[url(/images/addressFrame.png)] max-sm:hidden">
          <div className="flex items-center justify-center px-8">
            <LucideClipboard color="white" />
            <p
              className={`text-white font-bold text-center text-base ${imfell400.className} text-[#EAE5DA]`}
            >
              0x5de758bba013e58dae2693aea3f0b12b31a3023d
            </p>
          </div>
        </div>
        {/* TODO ADDRESS */}
        <div
          className={`flex max-sm:hidden max-sm:px-8 px-60 max-lg:px-12 text-center ${imfell400.className} text-white text-sm absolute bottom-16`}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur. Sagittis aliquam lacinia
            enim at enim tempor lacinia lobortis cras. Dignissim lobortis
            consequat Lorem ipsum dolor sit amet consectetur. Sagittis aliquam
            lacinia enim at enim tempor lacinia lobortis cras. Dignissim
            lobortis consequat Lorem ipsum dolor sit amet consectetur. Sagittis
            aliquam lacinia enim at enim tempor lacinia lobortis cras. Dignissim
            lobortis consequat{" "}
          </p>
        </div>

        <div className="items-center h-[45px] mb-20 bg-contain bg-no-repeat bg-[url(/images/addressFrame.png)] hidden max-sm:flex">
          <div className="flex items-center justify-center px-8">
            <LucideClipboard color="white" />
            <p
              className={`text-white font-bold text-center text-base ${imfell400.className} text-[#EAE5DA]`}
            >
              0x5de758bba013e58dae2693aea3f0b12b31a3023d
            </p>
          </div>
        </div>

        <div
          className={`max-sm:flex hidden max-sm:px-8 px-60 text-center ${imfell400.className} text-white text-sm absolute bottom-32`}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur. Sagittis aliquam lacinia
            enim at enim tempor lacinia lobortis cras. Lorem ipsum dolor sit
            amet consectetur. Sagittis aliquam lacinia enim at enim tempor
            lacinia lobortis cras. Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
