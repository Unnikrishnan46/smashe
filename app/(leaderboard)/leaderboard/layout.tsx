"use client"

import LBCommentsMobileSheet from "@/components/custom/LBCommentsMobileSheet";
import LBNavMenuMobile from "@/components/custom/LBNavMenuMobile";
import LBYourTopSpotModal from "@/components/custom/LBYourTopSpotModal";
import TopTenModal from "@/components/custom/TopTenModal";
import VoteSuccessModal from "@/components/custom/VoteSuccessModal";

const LeaderBoardLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <main className="h-full overflow-hidden overflow-x-hidden w-full">
      {children}
      <VoteSuccessModal/>
      <TopTenModal/>
      <LBYourTopSpotModal/>
      <LBCommentsMobileSheet/>
      <LBNavMenuMobile/>
    </main>
  );
};

export default LeaderBoardLayout;
