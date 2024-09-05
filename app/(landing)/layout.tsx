"use client"
import LoadingPage from "@/components/custom/LoadingPage";
import { loadingPageStore } from "@/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";
gsap.registerPlugin(useGSAP);

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const {isLoadingPageDone} = loadingPageStore();
  
  return (
    <main className="h-full overflow-auto">
      {isLoadingPageDone ? children : <LoadingPage/>}
    </main>
  );
};

export default LandingLayout;
