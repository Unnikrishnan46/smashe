"use client"
import { imfell400 } from "@/utils/fonts";
import React, { useEffect, useState } from "react";
import LBFlagBanner from "./LBFlagBanner";
import PositionBadgeMain from "./PositionBadgeMain";
import LBSearch from "./LBSearch";
import LBTable from "./LBTable";
import LBSelectMenu from "./LBSelectMenu";
import { useSearchStore } from "@/store";

type props = {
  allUsers:any;
  activeElection:any;
  getComments:any;
  previousTopTen:any;
  topTenOfAllTime:any;
}

function LBContent({allUsers,activeElection,getComments,previousTopTen,topTenOfAllTime}:props) {
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");
  const {searchInput} = useSearchStore();
  const formatTimeLeft = (timeLeft:any) => {
    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (activeElection?.toDate) {
      const endDate = new Date(activeElection.toDate).getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeDiff = endDate - now;

        if (timeDiff <= 0) {
          clearInterval(interval);
          setTimeLeft("00:00:00");
        } else {
          setTimeLeft(formatTimeLeft(Math.floor(timeDiff / 1000)));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeElection]);

  const filteredUsers = allUsers?.filter((user: any) =>
    user?.userName?.toLowerCase()?.includes(searchInput?.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex h-1/4 w-full relative max-lg:flex-col max-lg:justify-center max-lg:items-center max-[450px]:justify-start max-[450px]:h-[20%]">
        <div className="flex flex-col justify-center gap-4 px-8 max-lg:flex-row max-lg:w-1/2 max-lg:mt-36 max-sm:mt-12 max-sm:w-full max-lg:self-auto self-end max-sm:flex-row-reverse">
          <div
            className={`bg-[#502A29] ${imfell400.className} justify-center flex items-center p-4 flex-col rounded-sm max-lg:w-full max-lg:p-1`}
          >
            <p className="text-[#FFD599] text-xl">{timeLeft}</p>
            <p className="text-[#EAE5DA] text-xs">time left for weekly vote</p>
          </div>
          <LBSelectMenu/>
        </div>
        <div className="items-center gap-4 w-full justify-center hidden max-sm:flex max-sm:mt-3">
          <LBFlagBanner
            name={previousTopTen[0]?.name}
            title="Reigning Weekly Winner"
            image={previousTopTen[0]?.photoUrl}
            flagImage={"/images/paperScroll1.png"}
            mode={"dark"}
          />
        </div>
        <div className="flex items-center gap-4 w-full absolute justify-center top-4 max-sm:hidden">
          <LBFlagBanner
            name={previousTopTen[0]?.name}
            title="Reigning Weekly Winner"
            image={previousTopTen[0]?.photoUrl}
            flagImage={"/images/paperScroll1.png"}
            mode={"light"}
          />
          {/* <LBFlagBanner
            name="@jhon"
            title="Reigning Weekly Winner"
            image="https://static.vecteezy.com/system/resources/previews/021/857/991/original/roronoa-zoro-symbols-flag-one-piece-free-vector.jpg"
            flagImage={"/images/paperScroll2.png"}
            mode={"dark"}
          /> */}
        </div>
      </div>
      <div className="w-full flex justify-center max-lg:mt-16 max-[450px]:mt-16">
        <PositionBadgeMain previousTopTen={previousTopTen} topTenOfAllTime={topTenOfAllTime} getComments={getComments}/>
      </div>
      <div className="w-full flex justify-center relative items-center mt-8">
        <LBSearch />
      </div>
      <div className="h-[30vh]">
        <LBTable allUsers={filteredUsers} activeElection={activeElection} getComments={getComments}/>
      </div>
    </div>
  );
}

export default LBContent;
