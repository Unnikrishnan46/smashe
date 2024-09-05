import { LBTopTenStore } from "@/store";
import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { imfell400 } from "@/utils/fonts";
import { ChevronLeft } from "lucide-react";

const data = [
  {
    id: 1,
    rank: 1,
    username: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    weeklyVote: "1234",
  },
  {
    id: 2,
    rank: 1,
    username: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    weeklyVote: "1234",
  },
  {
    id: 3,
    rank: 1,
    username: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    weeklyVote: "1234",
  },
  {
    id: 4,
    rank: 1,
    username: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    weeklyVote: "1234",
  },
  {
    id: 5,
    rank: 1,
    username: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    weeklyVote: "1234",
  },
  {
    id: 6,
    rank: 1,
    username: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    weeklyVote: "1234",
  },
  {
    id: 7,
    rank: 1,
    username: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    weeklyVote: "1234",
  },
  {
    id: 8,
    rank: 1,
    username: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    weeklyVote: "1234",
  },
  {
    id: 9,
    rank: 1,
    username: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    weeklyVote: "1234",
  },
  {
    id: 10,
    rank: 1,
    username: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    weeklyVote: "1234",
  },
];

function TopTenModal() {
  const { isLBTopTenModalOpen, setIsLBTopTenModalOpen } = LBTopTenStore();
  const handleModalChange = () => {
    setIsLBTopTenModalOpen(false);
  };
  return (
    <Dialog open={isLBTopTenModalOpen} onOpenChange={handleModalChange}>
      <DialogContent
        style={{ backgroundSize: "100% 100%" }}
        className="sm:max-w-[90%] max-sm:p-1 max-sm:border-none focus:outline-none outline-none w-[80%] bg-[url(/images/top-ten-bg.png)] max-sm:bg-[url(/images/top-10-mobile-ripped-paper.png)] max-sm:w-full bg-no-repeat bg-center bg-transparent border-none h-[95%]"
      >
        <div
          className={`${imfell400.className} gap-6 flex flex-col items-center justify-center`}
        >
          <button
            onClick={handleModalChange}
            className="absolute top-16 left-12 max-sm:left-6 flex w-7 h-7 justify-center items-center rounded-full border-2 border-[#D2BFA1] bg-[#EAE5DA]"
          >
            <ChevronLeft size={15} />
          </button>
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-[#502A29] text-3xl font-extrabold">Top 10</h1>
            <img src="/images/top-10-divider.png" alt="" />
          </div>
          <div className="w-[80%] px-8 max-sm:w-full max-sm:px-2">
            <table
              style={{ borderCollapse: "separate", borderSpacing: "0 0.3rem" }}
              className="min-w-full"
            >
              <thead className=" w-full">
                <tr className="text-[#502A29] text-sm font-normal">
                  <th className="w-1/3 text-center">rank</th>
                  <th className="w-1/3 text-center">username</th>
                  <th className="w-1/3 text-center">weekly votes</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`text-[#FFD599] ${
                      index % 2 === 0
                        ? "bg-[#4A3B34]"
                       : "bg-[#414434]"
                    } `}
                  >
                    <td className="text-center">{item.id}</td>
                    <td className="font-medium flex items-center gap-4 text-center">
                      <img className="h-10 w-10 p-1" src={item.avatar} alt="" />
                      {item.username}
                    </td>
                    <td className="text-center">{item.weeklyVote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TopTenModal;
