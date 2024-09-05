"use client";
import React, { useState } from "react";
import PositionBadge from "./PositionBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PositionWeekly from "./PositionWeekly";
import PositionAllTime from "./PositionAllTime";
import { cn } from "@/lib/utils";
import { imfell400 } from "@/utils/fonts";

function PositionBadgeMain() {
  const [currentTabValue, setCurrentTabValue] = useState("this-week");
  return (
    <Tabs defaultValue="this-week" className="w-auto -mt-12 relative flex flex-col justify-center items-center">
      <TabsList
        className={`bg-black/20 ${imfell400.className} w-auto`}
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
        <PositionWeekly />
      </TabsContent>
      <TabsContent value="all-time">
        <PositionAllTime />
      </TabsContent>
    </Tabs>
  );
}

export default PositionBadgeMain;
