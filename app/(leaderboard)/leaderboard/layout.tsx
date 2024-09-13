"use client"

import LBCommentsMobileSheet from "@/components/custom/LBCommentsMobileSheet";

const LeaderBoardLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <main className="h-full overflow-hidden overflow-x-hidden w-full">
      {children}
      <LBCommentsMobileSheet/>
    </main>
  );
};

export default LeaderBoardLayout;
