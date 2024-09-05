import { imfell400 } from "@/utils/fonts";
import React from "react";

type props = {
  width: string;
  marginLeft: string;
  isMobile: boolean;
};

function LBComment({ width, marginLeft, isMobile }: props) {
  return (
    <div
      className={`bg-[#F1F0EF] p-4 flex gap-2 ${imfell400.className} w-[${width}] ml-[${marginLeft}] rounded-md`}
    >
      <div>
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg"
          alt=""
          style={{ width: isMobile ? "40px" : "51px", height: "40px" }} // Ensure constant size
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-sm text-[#700000]">@jhon</h1>
        <p className="text-sm text-[#372400]">
          this game is so fun, I just voted for @john to win it all!
        </p>
      </div>
    </div>
  );
}

export default LBComment;
