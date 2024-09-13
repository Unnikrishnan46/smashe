"use client";

const LeaderBoardLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <main className="h-full overflow-hidden overflow-x-hidden w-full">
      {children}
    </main>
  );
};

export default LeaderBoardLayout;
