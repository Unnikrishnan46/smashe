"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { navigationMenuStore } from "@/store";
import { imfell400 } from "@/utils/fonts";
import Link from "next/link";

const navLinks = [
  { id: 1, routeName: "About Us", route: "/" },
  { id: 2, routeName: "Tokenomics", route: "/tokenomics" },
  { id: 3, routeName: "Whitepaper", route: "/whitepaper" },
  { id: 4, routeName: "Vote", route: "/vote" },
  { id: 5, routeName: "Join Us", route: "/join" },
];

function NavigationMenu() {
  const { isNavMenuOpen, setIsNavMenuOpen } = navigationMenuStore();
  const [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, []);
  const handleCloseChange = () => {
    setIsNavMenuOpen(false);
  };

  return (
    <Dialog open={isNavMenuOpen} onOpenChange={handleCloseChange} modal={true}>
      <DialogContent
      className="overflow-y-scroll"
        style={{
          background: "url(/images/menuRippedPaper.png)",
          height: "90vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          border: "none",
        }}
      >
        <div className="p-1 items-center flex flex-col w-full">
          <div className="w-full">
            <div className="flex flex-col items-center gap-6 mt-8">
              <h1 className={`text-7xl ${imfell400.className} text-[#502A29]`}>
                Menu
              </h1>
              <img src="/images/menuDivider.png" alt="" />
            </div>
            <div className="w-full flex flex-col gap-8 mt-8">
              {navLinks?.map((item, index) => (
                <div
                  key={index}
                  className={`h-14 flex items-center px-4 ${
                    activeRoute === item.route
                      ? "bg-[url(/images/activeMenuBg.png)] bg-no-repeat bg-cover"
                      : ""
                  }`}
                >
                  <Link
                    className={`${imfell400.className} ${
                      activeRoute === item.route
                        ? "text-[#FFD599]"
                        : "text-[#502A29]"
                    } text-lg`}
                    href={item?.route}
                  >
                    {item?.routeName}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="h-full justify-end flex">
            <div className="flex items-center gap-6">
              <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
                <img src="/images/xLogo.png" alt="xLogo" />
              </button>
              <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
                <img src="/images/telegramLogo.png" alt="xLogo" />
              </button>
              <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
                <img src="/images/eagleLogo.png" alt="xLogo" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NavigationMenu;
