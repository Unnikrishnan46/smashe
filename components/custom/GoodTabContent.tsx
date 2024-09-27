"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { imfell400 } from "@/utils/fonts";
import NewSearch from "./NewSearch";
import NewTable from "./NewTable";

type props = {
  allUsers: any[];
  activeElection: any;
  getComments: any;
  fetchTwitterUsers: any;
  twitterUsers: any;
  topTenOfAllTime: any;
};

function GoodTabContent({
  allUsers,
  activeElection,
  getComments,
  fetchTwitterUsers,
  twitterUsers,
  topTenOfAllTime,
}: props) {
  const [weeklySearchInput, setWeeklySearchInput] = useState("");
  const [allTimeSearchInput,setAllTimeSearchInput] = useState("");

  const filteredAllUsers = allUsers?.filter((user:any) =>
    user?.userName?.toLowerCase()?.includes(weeklySearchInput?.toLowerCase())
  );
  
  const filteredTopTenOfAllTime = topTenOfAllTime?.filter((user:any) =>
    user?.name?.toLowerCase()?.includes(allTimeSearchInput?.toLowerCase())
  );

  return (
    <div className="w-full mt-8">
      <div className="w-full">
        <Tabs defaultValue="thisWeek" className="w-full">
          <div className="flex justify-center items-center w-full">
            <TabsList className={`bg-black/20 ${imfell400.className} w-40`}>
              <TabsTrigger value="thisWeek">This Week</TabsTrigger>
              <TabsTrigger value="allTime">All Time</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="thisWeek">
            <div>
              <NewSearch
                setSearchInput={setWeeklySearchInput}
                searchInput={weeklySearchInput}
              />
              <NewTable
                allUsers={filteredAllUsers}
                activeElection={activeElection}
                getComments={getComments}
                fetchTwitterUsers={fetchTwitterUsers}
                twitterUsers={twitterUsers}
                searchInput={weeklySearchInput}
              />
            </div>
          </TabsContent>
          <TabsContent value="allTime">
            <NewSearch
              setSearchInput={setAllTimeSearchInput}
              searchInput={allTimeSearchInput}
            />
            <NewTable
              allUsers={filteredTopTenOfAllTime}
              activeElection={activeElection}
              getComments={getComments}
              fetchTwitterUsers={fetchTwitterUsers}
              twitterUsers={twitterUsers}
              searchInput={allTimeSearchInput}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default GoodTabContent;
