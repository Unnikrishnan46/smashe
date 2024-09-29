import { useSelectedTabStore } from "@/store";
import { imfell400 } from "@/utils/fonts";
import React from "react";

function ShowCaseWinners({ data, topTenOfAllTime,previousGoodElectionWinner,previousEvilElectionWinner,topTenOfAllTimeGood ,topTenOfAllTimeEvil}: any) {
  const {setSelectedTab,selectedTab} = useSelectedTabStore();
  
  return (
    <div className="">
      <div className="flex items-center gap-4 max-sm:hidden">
        <div
          className={`flex flex-col justify-center items-center ${imfell400.className}`}
        >
          <h1 className="text-white text-lg">{selectedTab === "good" ? previousGoodElectionWinner?.userName : previousEvilElectionWinner?.userName }</h1>
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
              className="absolute scale-[2] max-sm:scale-100 h-12 w-12 max-sm:h-16 max-sm:w-20 max-sm:top-[35%] max-sm:bottom-[65%] max-[450px]:h-14 max-[450px]:w-16 -z-10 top-[48%] bottom-[52%]"
              src={selectedTab === "good" ? previousGoodElectionWinner?.photoUrl : previousEvilElectionWinner?.photoUrl}
              alt="profile pic"
            />
          </div>
        </div>

        <div className="mt-40">
          <img className="w-[176px] h-[176px]" src="/images/foxMan.png" alt="" />
        </div>

        <div
          className={`flex flex-col justify-center items-center ${imfell400.className}`}
        >
          <h1 className="text-white text-lg max-[450px]:text-sm">
            {selectedTab === "good" ? topTenOfAllTimeGood[0]?.name : topTenOfAllTimeEvil[0]?.name}
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
              className="absolute scale-[2] max-sm:scale-100 h-12 w-12 max-sm:h-16 max-sm:w-20 max-sm:top-[35%] max-sm:bottom-[65%] max-[450px]:h-14 max-[450px]:w-16 -z-10 top-[48%] bottom-[52%]"
              src={selectedTab === "good" ? topTenOfAllTimeGood[0]?.photoUrl : topTenOfAllTimeEvil[0]?.photoUrl}
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
          <img className="w-[176px] h-[176px]" src="/images/foxMan.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default ShowCaseWinners;
