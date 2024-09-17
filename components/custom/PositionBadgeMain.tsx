"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PositionWeekly from "./PositionWeekly";
import PositionAllTime from "./PositionAllTime";
import { imfell400 } from "@/utils/fonts";

type props = {
  previousTopTen:any;
  topTenOfAllTime:any;
  getComments:any;
}

function PositionBadgeMain({previousTopTen,topTenOfAllTime,getComments}:props) {
  const [currentTabValue, setCurrentTabValue] = useState("this-week");
  return (
    <Tabs defaultValue="this-week" className="w-auto -mt-12 relative flex flex-col justify-center items-center">
      <TabsList
        className={`bg-black/20 ${imfell400.className} w-auto min-[1200px]:mb-28 min-[1200px]:scale-125`}
        defaultValue={currentTabValue}
      >
        <TabsTrigger
          onClick={() => {
            setCurrentTabValue("this-week");
          }}
          value="this-week"
        >
          This week
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setCurrentTabValue("all-time");
          }}
          value="all-time"
        >
          All time
        </TabsTrigger>
      </TabsList>
      <TabsContent value="this-week">
        <PositionWeekly previousTopTen={previousTopTen} getComments={getComments}/>
      </TabsContent>
      <TabsContent value="all-time">
        <PositionAllTime topTenOfAllTime={topTenOfAllTime} getComments={getComments}/>
      </TabsContent>
    </Tabs>
  );
}

export default PositionBadgeMain;
