import { imfell400 } from "@/utils/fonts";
import React from "react";

type props = {
  width: string;
  marginLeft: string;
  isMobile: boolean;
  comment:any;
};

function LBComment({ width, marginLeft, isMobile ,comment}: props) {
  
  return (
    <div
      key={comment?.id}
      className={`bg-[#F1F0EF] p-4 flex gap-2 ${imfell400.className} w-[${width}] ml-[${marginLeft}] rounded-md`}
    >
      <div>
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={comment?.commentFromPhoto}
          alt=""
          style={{ width: isMobile ? "40px" : "40px", height: "40px" }} // Ensure constant size
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-sm text-[#700000]">{comment?.commentFromName}</h1>
        <p className="text-sm text-[#372400]">
          {comment?.comment}
        </p>
      </div>
    </div>
  );
}

export default LBComment;
