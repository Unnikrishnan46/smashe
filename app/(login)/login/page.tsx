import { imfell400, ringbearer } from "@/utils/fonts";
import React from "react";

function LoginPage() {
  return (
    <div
      className="h-screen w-screen bg-[url(/images/xLoginBG.png)] bg-center bg-no-repeat bg-cover flex justify-center items-center max-sm:bg-cover"
      // style={{ backgroundSize: "100% 100%" }}
    >
      <div className={`${imfell400.className} flex flex-col justify-center items-center gap-6`}>
        <div>
          <h1
            className={`${ringbearer.className} text-[#EAE5DA] tracking-[0.05] text-7xl`}
            style={{
              textShadow: "1px 7px 0px #372400",
              color: "transparent",
              WebkitTextFillColor: "#EAE5DA",
            }}
          >
            $MASHE
          </h1>
        </div>
        <div>
          <p className="text-[#DFDFDF] text-lg">
            Vote on the player each week for prizes.
          </p>
        </div>
        <button className="hover:scale-110 transition-transform duration-300">
          <img className="scale-75" src="/images/xLoginButton.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
