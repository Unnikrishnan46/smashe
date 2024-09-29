"use client";
import { imfell400 } from "@/utils/fonts";
import React, { useEffect, useState } from "react";
import LBFlagBanner from "./LBFlagBanner";
import PositionBadgeMain from "./PositionBadgeMain";
import LBSearch from "./LBSearch";
import LBTable from "./LBTable";
import LBSelectMenu from "./LBSelectMenu";
import { useSearchStore, useSelectedTabStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShowCaseWinners from "./ShowCaseWinners";
import GoodTabContent from "./GoodTabContent";
import EvilTabContent from "./EvilTabContent";
import NoElections from "./NoElections";

type props = {
  allGoodUsers:any;
  allEvilUsers: any;
  activeElectionGood: any;
  activeElectionEvil:any;
  getComments: any;
  previousTopTen: any;
  topTenOfAllTime: any;
  topTenEvilUsers:any;
  previousGoodElectionWinner:any;
  previousEvilElectionWinner:any;
  topTenOfAllTimeGood:any;
  topTenOfAllTimeEvil:any;
};

function LBContent({
  allGoodUsers,
  allEvilUsers,
  getComments,
  previousTopTen,
  topTenOfAllTime,
  topTenEvilUsers,
  activeElectionGood,
  activeElectionEvil,
  previousGoodElectionWinner,
  previousEvilElectionWinner,
  topTenOfAllTimeGood,
  topTenOfAllTimeEvil
}: props) {
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");
  const [timeLeftGood, setTimeLeftGood] = useState<string>("00:00:00");
  const [timeLeftEvil, setTimeLeftEvil] = useState<string>("00:00:00");
  const [twitterUsers, setTwitterUsers] = useState<any[]>([]);
  const {setSelectedTab,selectedTab} = useSelectedTabStore();
  const formatTimeLeft = (timeLeft: any) => {
    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  

  useEffect(() => {
    if (activeElectionGood?.toDate) {
      const endDate = new Date(activeElectionGood.toDate).getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeDiff = endDate - now;

        if (timeDiff <= 0) {
          clearInterval(interval);
          setTimeLeftGood("00:00:00");
        } else {
          setTimeLeftGood(formatTimeLeft(Math.floor(timeDiff / 1000)));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeElectionGood]);


  useEffect(() => {
    if (activeElectionEvil?.toDate) {
      const endDate = new Date(activeElectionEvil.toDate).getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeDiff = endDate - now;

        if (timeDiff <= 0) {
          clearInterval(interval);
          setTimeLeftEvil("00:00:00");
        } else {
          setTimeLeftEvil(formatTimeLeft(Math.floor(timeDiff / 1000)));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeElectionEvil]);


  const fetchTwitterUsers = async (searchQuery:string) => {
    try {
      const response = await fetch(`/api/twitterUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: searchQuery }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Twitter users: ${response.statusText}`
        );
      }

      const data = await response.json();
      const updatedData = {
        ...data.data,
        profile_image_url: data.data.profile_image_url.replace('_normal', ''), // Remove '_normal' for high-quality image
      };
      console.log(data);

      setTwitterUsers([updatedData]);
    } catch (error) {
      console.error("Error fetching Twitter users:", error);
    }
  };

  // console.log("activeElection  :  ",activeElection);
  

  return (
    <div className="flex flex-col w-full h-full pb-8 gap-12">
      <div className="flex h-1/4 w-full relative max-lg:flex-col max-lg:justify-center max-sm:justify-start max-lg:items-center max-[450px]:justify-start max-[450px]:h-[20%]">
        <div className="flex flex-col justify-center gap-4 px-8  max-sm:mt-12 max-sm:w-full max-lg:justify-center max-sm:flex-row-reverse max-lg:-mt-12">
          <div
            className={`bg-[#502A29] ${imfell400.className} justify-center flex items-center p-4 flex-col rounded-sm max-lg:w-full max-lg:p-1`}
          >
            <p className="text-[#FFD599] text-xl">{selectedTab === "good" ? timeLeftGood : timeLeftEvil}</p>
            <p className="text-[#EAE5DA] text-xs">time left for weekly vote</p>
          </div>
          <LBSelectMenu />
        </div>
        {/* <div className="items-center gap-4 w-full justify-center hidden max-sm:flex max-sm:mt-3">
          <LBFlagBanner
            name={previousTopTen[0]?.name}
            title="Reigning Weekly Winner"
            image={previousTopTen[0]?.photoUrl}
            flagImage={"/images/paperScroll1.png"}
            mode={"dark"}
          />
        </div> */}
        <div className="flex items-center gap-4 w-full absolute justify-center top-4 max-sm:top-24 max-sm:p-8">
          <ShowCaseWinners
            data={previousTopTen[0]}
            topTenOfAllTime={topTenOfAllTime}
            previousGoodElectionWinner={previousGoodElectionWinner}
            previousEvilElectionWinner={previousEvilElectionWinner}
            topTenOfAllTimeGood={topTenOfAllTimeGood}
            topTenOfAllTimeEvil={topTenOfAllTimeEvil}
          />
          {/* <LBFlagBanner
            name={previousTopTen[0]?.name}
            title="Reigning Weekly Winner"
            image={previousTopTen[0]?.photoUrl}
            flagImage={"/images/paperScroll1.png"}
            mode={"light"}
          /> */}
          {/* <LBFlagBanner
            name="@jhon"
            title="Reigning Weekly Winner"
            image="https://static.vecteezy.com/system/resources/previews/021/857/991/original/roronoa-zoro-symbols-flag-one-piece-free-vector.jpg"
            flagImage={"/images/paperScroll2.png"}
            mode={"dark"}
          /> */}
        </div>
      </div>
      {/* <div className="w-full flex justify-center max-lg:mt-16 max-[450px]:mt-16">
        <PositionBadgeMain
          previousTopTen={previousTopTen}
          topTenOfAllTime={topTenOfAllTime}
          getComments={getComments}
        />
      </div> */}
      <div className="max-sm:mt-44 mt-12">
        <Tabs defaultValue="good" onValueChange={(value) => setSelectedTab(value)} className="w-full mt-8">
          <div className="flex justify-center items-center">
            <TabsList
              className={`bg-black/20 ${imfell400.className} w-40 scale-125`}
            >
              <TabsTrigger className="w-full" value="good">
                GOOD
              </TabsTrigger>
              <TabsTrigger className="w-full" value="evil">
                EVIl
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent className="w-full" value="good">
            {activeElectionGood ? 
            <GoodTabContent
              allUsers={allGoodUsers}
              activeElection={activeElectionGood}
              getComments={getComments}
              fetchTwitterUsers={fetchTwitterUsers}
              twitterUsers={twitterUsers}
              topTenOfAllTime={topTenOfAllTime}
            /> : <NoElections electionMode={"Good"}/>}
          </TabsContent>
          <TabsContent value="evil">
          {activeElectionEvil ?
            <EvilTabContent
              allUsers={allEvilUsers}
              activeElection={activeElectionEvil}
              getComments={getComments}
              fetchTwitterUsers={fetchTwitterUsers}
              twitterUsers={twitterUsers}
              topTenOfAllTime={topTenEvilUsers}
            /> : <NoElections electionMode={"Evil"}/> }
          </TabsContent>
        </Tabs>
      </div>
      {/* <div className="w-full flex justify-center relative items-center mt-8 min-[1200px]:mt-24">
        <LBSearch />
      </div> */}
      {/* <div className="w-full flex items-center justify-center">
        <Tabs defaultValue="good" className="w-full mt-8">
          <div className="flex justify-center items-center">
            <TabsList className={`bg-black/20 ${imfell400.className} w-40`}>
              <TabsTrigger className="w-full" value="good">
                GOOD
              </TabsTrigger>
              <TabsTrigger className="w-full" value="evil">
                EVil
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="good">
            <LBTable
              allUsers={filteredUsers}
              activeElection={activeElection}
              getComments={getComments}
              fetchTwitterUsers={fetchTwitterUsers}
              twitterUsers={twitterUsers}
            />
          </TabsContent>
          <TabsContent value="evil">
            <LBTable
              allUsers={filteredUsers}
              activeElection={activeElection}
              getComments={getComments}
              fetchTwitterUsers={fetchTwitterUsers}
              twitterUsers={twitterUsers}
            />
          </TabsContent>
        </Tabs>
      </div> */}
    </div>
  );
}

export default LBContent;
