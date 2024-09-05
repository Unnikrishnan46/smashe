"use client"
import LBCommentSheet from "@/components/custom/LBCommentSheet";
import LBContent from "@/components/custom/LBContent";
import LBMobileNavBar from "@/components/custom/LBMobileNavBar";
import LBNavbar from "@/components/custom/LBNavbar";
import LBTable from "@/components/custom/LBTable";
import React from "react";

function LeaderBoard() {
  return (
      <div className="h-[140vh] max-lg:h-[160vh] max-sm:h-[180vh] bg-black overflow-hidden">
        <div
          style={{ backgroundSize: "100% 100%" }}
          className=" bg-[url(/images/leaderboardBg.png)] bg-center bg-no-repeat w-full h-full relative"
        >
          <LBNavbar />
          <LBMobileNavBar/>
          <LBContent />
        </div>
        <LBCommentSheet/>
      </div>
  );
}

export default LeaderBoard;
