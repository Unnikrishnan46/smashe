import { imfell400 } from "@/utils/fonts";
import React from "react";

function ShowCaseWinners({ data, topTenOfAllTime }: any) {
  return (
    <div className="">
      <div className="flex items-center gap-4 max-sm:hidden">
        <div
          className={`flex flex-col justify-center items-center ${imfell400.className}`}
        >
          <h1 className="text-white text-lg">{data?.name}</h1>
          <h3 className="text-white opacity-75 text-sm m-0">
            Reigning Weekly Winner
          </h3>
          <div className="flex justify-center items-center relative z-10 h-auto w-auto p-0">
            <img
              className="scale-75 max-sm:scale-100 max-sm:h-32 max-sm:w-32 max-[450px]:h-28 max-[450px]:w-28"
              src="/images/winnerFrame.png"
              alt=""
            />
            <img
              className="absolute scale-[2] max-sm:scale-100 max-sm:h-16 max-sm:w-20 max-sm:top-[35%] max-sm:bottom-[65%] max-[450px]:h-14 max-[450px]:w-16 -z-10 top-[48%] bottom-[52%]"
              src={data?.photoUrl}
              alt=""
            />
          </div>
        </div>

        <div className="mt-40">
          <img src="/images/foxMan.png" alt="" />
        </div>

        <div
          className={`flex flex-col justify-center items-center ${imfell400.className}`}
        >
          <h1 className="text-white text-lg max-[450px]:text-sm">
            {topTenOfAllTime[0]?.name}
          </h1>
          <h3 className="text-white opacity-75 text-sm m-0 max-[450px]:text-xs">
            All Time Winner
          </h3>
          <div className="flex justify-center items-center relative z-10 h-auto w-auto p-0">
            <img
              className="scale-75 max-sm:scale-100 max-sm:h-32 max-sm:w-32 max-[450px]:h-28 max-[450px]:w-28"
              src="/images/winnerFrame.png"
              alt=""
            />
            <img
              className="absolute scale-[2] max-sm:scale-100 max-sm:h-16 max-sm:w-20 max-sm:top-[35%] max-sm:bottom-[65%] max-[450px]:h-14 max-[450px]:w-16 -z-10 top-[48%] bottom-[52%]"
              src={topTenOfAllTime[0]?.photoUrl}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="hidden items-center max-sm:flex max-sm:flex-col">
        <div className="flex gap-4">
          <div
            className={`flex flex-col justify-center items-center ${imfell400.className}`}
          >
            <h1 className="text-white text-lg">{data?.name}</h1>
            <h3 className="text-white opacity-75 text-sm m-0">
              Reigning Weekly Winner
            </h3>
            <div className="flex justify-center items-center relative z-10 h-auto w-auto p-0">
              <img
                className="scale-75 max-sm:scale-100 max-sm:h-32 max-sm:w-32 max-[450px]:h-28 max-[450px]:w-28"
                src="/images/winnerFrame.png"
                alt=""
              />
              <img
                className="absolute scale-[2] max-sm:scale-100 max-sm:h-16 max-sm:w-20 max-sm:top-[35%] max-sm:bottom-[65%] max-[450px]:h-14 max-[450px]:w-16 -z-10 top-[48%] bottom-[52%]"
                src={data?.photoUrl}
                alt=""
              />
            </div>
          </div>

          <div
            className={`flex flex-col justify-center items-center ${imfell400.className}`}
          >
            <h1 className="text-white text-lg max-[450px]:text-sm">
              {topTenOfAllTime[0]?.name}
            </h1>
            <h3 className="text-white opacity-75 text-sm m-0 max-[450px]:text-xs">
              All Time Winner
            </h3>
            <div className="flex justify-center items-center relative z-10 h-auto w-auto p-0">
              <img
                className="scale-75 max-sm:scale-100 max-sm:h-32 max-sm:w-32 max-[450px]:h-28 max-[450px]:w-28"
                src="/images/winnerFrame.png"
                alt=""
              />
              <img
                className="absolute scale-[2] max-sm:scale-100 max-sm:h-16 max-sm:w-20 max-sm:top-[35%] max-sm:bottom-[65%] max-[450px]:h-14 max-[450px]:w-16 -z-10 top-[48%] bottom-[52%]"
                src={topTenOfAllTime[0]?.photoUrl}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="">
          <img src="/images/foxMan.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default ShowCaseWinners;
