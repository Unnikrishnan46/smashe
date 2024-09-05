"use  client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { imfell400 } from "@/utils/fonts";

function LBSelectMenu() {
  return (
    <Select>
      <SelectTrigger
        className={`bg-[#5D574F] border-none text-[#EAE5DA] ${imfell400.className} max-lg:py-7`}
      >
        <SelectValue placeholder="Share Meme!" />
      </SelectTrigger>
      <SelectContent
        className={`p-0 bg-[#5D574F] text-[#EAE5DA] ${imfell400.className} border-none`}
      >
        <SelectItem
          className="px-2"
          value="light"
        >
          <div className="flex flex-row items-center justify-between w-full gap-4">
            <p>Reiging Winner</p> <img src="/images/ShareFat.png" alt="" />
          </div>
        </SelectItem>
        <SelectItem
          className="px-2"
          value="dark"
        >
          <div className="flex flex-row items-center justify-between w-full gap-4">
            <p>This Week</p> <img src="/images/ShareFat.png" alt="" />
          </div>
        </SelectItem>
        <SelectItem className="px-2" value="system">
          <div className="flex flex-row items-center justify-between w-full gap-4">
            <p>
              All Time
            </p>{" "}
            <img src="/images/ShareFat.png" alt="" />
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default LBSelectMenu;
