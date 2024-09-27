// "use  client";
// import React from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { imfell400 } from "@/utils/fonts";

// function LBSelectMenu() {
//   return (
//     <Select>
//       <SelectTrigger
//         className={`bg-[#5D574F] border-none text-[#EAE5DA] ${imfell400.className} max-lg:py-7`}
//       >
//         <SelectValue placeholder="Share Meme!" />
//       </SelectTrigger>
//       <SelectContent
//         className={`p-0 bg-[#5D574F] text-[#EAE5DA] ${imfell400.className} border-none`}
//       >
//         <SelectItem
//           className="px-2"
//           value="light"
//         >
//           <div className="flex flex-row items-center justify-between w-full gap-4">
//             <p>Reiging Winner</p> <img src="/images/ShareFat.png" alt="" />
//           </div>
//         </SelectItem>
//         <SelectItem
//           className="px-2"
//           value="dark"
//         >
//           <div className="flex flex-row items-center justify-between w-full gap-4">
//             <p>This Week</p> <img src="/images/ShareFat.png" alt="" />
//           </div>
//         </SelectItem>
//         <SelectItem className="px-2" value="system">
//           <div className="flex flex-row items-center justify-between w-full gap-4">
//             <p>
//               All Time
//             </p>{" "}
//             <img src="/images/ShareFat.png" alt="" />
//           </div>
//         </SelectItem>
//       </SelectContent>
//     </Select>
//   );
// }

// export default LBSelectMenu;

"use  client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { imfell400 } from "@/utils/fonts";
import { ChevronDown } from "lucide-react";
import { LBTopTenStore, LBYourTopSpotStore } from "@/store";

function LBSelectMenu() {
  const { isLBTopTenModalOpen, setIsLBTopTenModalOpen,isLBTopTenOfAllTimeModalOpen, setIsLBTopTenOfAllTimeModalOpen } = LBTopTenStore();
  const { isLBYourTopSpotModalOpen, setIsLBYourTopSpotModalOpen } = LBYourTopSpotStore();
  const openTopTenModal = () => {
    setIsLBTopTenModalOpen(true);
  };

  const openTopTenOfAllTimeModalOpen = ()=>{
    setIsLBTopTenOfAllTimeModalOpen(true);
  }

  const openYourTopSpotModal = ()=>{
    setIsLBYourTopSpotModalOpen(true);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`bg-[#5D574F] z-50 max-sm:w-full max-md:w-full max-lg:w-full border-none text-[#EAE5DA] ${imfell400.className} max-lg:py-2 flex items-center gap-3 p-2 pr-0 justify-center rounded-md`}
      >
        Share Meme!
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`p-0 bg-[#5D574F] text-[#EAE5DA] ${imfell400.className} border-none w-36`}
      >
        <DropdownMenuItem onClick={openYourTopSpotModal}>
          <div className="flex flex-row items-center justify-between w-full gap-4">
            <p>Reigning Winner</p> <img src="/images/ShareFat.png" alt="" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openTopTenModal}>
          <div className="flex flex-row items-center justify-between w-full gap-4">
            <p>This Week</p> <img src="/images/ShareFat.png" alt="" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openTopTenOfAllTimeModalOpen}>
          <div className="flex flex-row items-center justify-between w-full gap-4">
            <p>All Time</p> <img src="/images/ShareFat.png" alt="" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LBSelectMenu;
