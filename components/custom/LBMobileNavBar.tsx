import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LucideCheck, LucideLogOut, LucideMenu } from "lucide-react";
import { imfell400 } from "@/utils/fonts";
import { LBNavigationStore } from "@/store";

type props = {
  currentUser:any;
  logOut:any;
}

function LBMobileNavBar({currentUser,logOut}:props) {
  const {isLBMobileNavModalOpen,setIsLBMobileNavModalOpen} = LBNavigationStore();
  const handleMenuClick = ()=>{
    setIsLBMobileNavModalOpen(true);
  }
  return (
    <div
      className={`w-full hidden max-sm:flex ${imfell400.className} flex-col justify-between`}
    >
      <div className="flex justify-between w-full p-6">
        <div className="flex items-center gap-2">
          <Avatar className="h-14 w-14">
            <AvatarImage src="https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-[#EAE5DA]">{currentUser?.displayName}</h1>
          <Button onClick={logOut} size={"icon"} className="bg-transparent">
            <LucideLogOut color="#EAE5DA" />
          </Button>
        </div>
        <div>
          <button onClick={handleMenuClick} className="flex h-12 w-12 justify-center items-center border-[3px] border-[#D2BFA1] bg-[#F7F1E9] rounded-full">
            <LucideMenu color="#502A29" />
          </button>
        </div>
      </div>
      {/* <div className="hidden max-sm:flex w-full bg-[#502A29] justify-center items-center p-3">
        <LucideCheck color="#FFD599"/>
        <p className={`${imfell400.className} text-[#FFD599]`}>Weekly Vote Submitted</p>
      </div> */}
    </div>
  );
}

export default LBMobileNavBar;
