import { LBTopTenStore } from "@/store";
import React, { useRef } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { imfell400 } from "@/utils/fonts";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

type props = {
    topTenOFAllTime:any;
}

function TopTenOfAllTimeModal({topTenOFAllTime}:props) {
  const { isLBTopTenOfAllTimeModalOpen, setIsLBTopTenOfAllTimeModalOpen } = LBTopTenStore();
  const handleModalChange = () => {
    setIsLBTopTenOfAllTimeModalOpen(false);
  };

  const divRef = useRef(null);
  const closeBtnRef = useRef(null);
  const downloadBtnRef = useRef(null);

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(divRef.current!,{useCORS:true,ignoreElements: (element) => {
        return element === downloadBtnRef.current || element === closeBtnRef.current;
      },});
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  };


  const sortedUsers = [...topTenOFAllTime].sort((a, b) => (b.votes || 0) - (a.votes || 0)).slice(0, 10);

  return (
    <Dialog open={isLBTopTenOfAllTimeModalOpen} onOpenChange={handleModalChange}>
      <DialogContent
      ref={divRef}
        style={{ backgroundSize: "100% 100%" }}
        className="sm:max-w-[90%] max-sm:p-1 max-sm:border-none focus:outline-none outline-none w-[80%] bg-[url(/images/top-ten-bg.png)] max-sm:bg-[url(/images/top-10-mobile-ripped-paper.png)] max-sm:w-full bg-no-repeat bg-center bg-transparent border-none h-[95%]"
      >
        <div
          className={`${imfell400.className} gap-6 flex flex-col items-center justify-center`}
        >
          <button
          ref={closeBtnRef}
            onClick={handleModalChange}
            className="absolute top-16 left-12 max-sm:left-6 flex w-7 h-7 justify-center items-center rounded-full border-2 border-[#D2BFA1] bg-[#EAE5DA]"
          >
            <ChevronLeft size={15} />
          </button>
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-[#502A29] text-3xl font-extrabold">Top 10</h1>
            <img src="/images/top-10-divider.png" alt="" />
          </div>
          <div className="w-[80%] px-8 max-sm:w-full max-sm:px-2 justify-center flex flex-col items-center">
            <table
              style={{ borderCollapse: "separate", borderSpacing: "0 0.3rem" }}
              className="min-w-full"
            >
              <thead className=" w-full">
                <tr className="text-[#502A29] text-sm font-normal">
                  <th className="w-1/3 text-center">rank</th>
                  <th className="w-1/3 text-center">username</th>
                  <th className="w-1/3 text-center">all time votes</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers?.map((item, index) => (
                  <tr
                    key={index}
                    className={`text-[#FFD599] ${
                      index % 2 === 0
                        ? "bg-[#4A3B34]"
                       : "bg-[#414434]"
                    } `}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td className="font-medium flex items-center gap-4 text-center">
                      <img className="h-10 w-10 p-1" src={item.photoUrl} alt="" />
                      {item.userName}
                    </td>
                    <td className="text-center">{item.votes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button className="bg-[#796741] hover:bg-[#907946]" ref={downloadBtnRef} onClick={handleCaptureClick}>Download</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TopTenOfAllTimeModal;
