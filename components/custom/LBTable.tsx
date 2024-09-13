"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { imfell400 } from "@/utils/fonts";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LBCommentStore, LBVoteModalStore, selectedUserStore } from "@/store";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: 1,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 2,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 3,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 4,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 5,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 6,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 7,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 8,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 9,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 10,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 11,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 12,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  {
    id: 13,
    name: "@jhon",
    avatar:
      "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
    rank: "4th",
    weeklyVotes: 1234,
  },
  //   {
  //     id: 14,
  //     name: "@jhon",
  //     avatar:
  //       "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
  //     rank: "4th",
  //     weeklyVotes: 1234,
  //   },
  //   {
  //     id: 15,
  //     name: "@jhon",
  //     avatar:
  //       "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
  //     rank: "4th",
  //     weeklyVotes: 1234,
  //   },
  //   {
  //     id: 16,
  //     name: "@jhon",
  //     avatar:
  //       "https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg",
  //     rank: "4th",
  //     weeklyVotes: 1234,
  //   },
];

type props = {
  allUsers:any[];
  activeElection:any;
  getComments:any;
}

function LBTable({allUsers,activeElection,getComments}:props) {
  const { isLBCommentsSheetOpen, setIsLBCommentsSheetOpen } = LBCommentStore();
  const { isLBVoteModalOpen, setIsLBVoteModalOpen } = LBVoteModalStore();
  const { isLBCommentsMobileSheetOpen, setIsLBCommentsMobileSheetOpen } =
  LBCommentStore();
  const [isWidthBelow640, setIsWidthBelow640] = useState(false);
  const {selectedVoteUser,setSelectedVoteUser} = selectedUserStore();

  useEffect(() => {
    const handleResize = () => {
      setIsWidthBelow640(window.innerWidth < 640);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openCommentSheet = (selectedUser:any) => {
    const tl = gsap.timeline({ defaults: { ease: "power1" } });
    if (isWidthBelow640) {
      setIsLBCommentsMobileSheetOpen(true);
      getComments(selectedUser)
    } else {
      if (!isLBCommentsSheetOpen) {
        tl.to(".comment-main-ref", {
          display: "flex",
          onComplete: () => {
            tl.to(".comment-main-ref", {
              right: 0,
              transformOrigin: "right",
              onComplete: () => {
                setIsLBCommentsSheetOpen(false);
                getComments(selectedUser);
              },
            });
          },
        });
      }
    }
  };

  const openVoteModal = (item:any) => {
    setSelectedVoteUser(item);
    setIsLBVoteModalOpen(true);
  };
  
  const sortedUsers = [...allUsers].sort((a, b) => (b.votes || 0) - (a.votes || 0));

  return (
    <div
      className={`flex px-20 max-lg:px-16 max-md:px-10 max-sm:px-4 ${imfell400.className} mt-6`}
    >
      <ScrollArea className="w-full h-[40vh]">
        <table
          style={{ borderCollapse: "separate", borderSpacing: "0 0.5rem" }}
          className="min-w-full"
        >
          <thead className=" w-full">
            <tr className="text-[#EAE5DA] text-sm font-normal">
              <th className="w-1/5">Username</th>
              <th className="w-1/5">Rank</th>
              <th className="w-1/5">Weekly Votes</th>
              <th className="w-1/5">Comments</th>
              <th className="w-1/5">Votes</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers?.map((item, index) => (
              <tr
                key={index}
                className={`text-[#FFD599] ${
                  index === 0
                    ? "bg-[#7B5645]"
                    : index % 2 === 0
                    ? "bg-[#3B392E]"
                    : "bg-[#352C27]"
                } `}
              >
                <td className="font-medium flex items-center gap-4 text-center">
                  <img className="h-10 w-10 p-1" src={item.photoUrl} alt="profile-pic" />
                  {item.userName}
                </td>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{item?.votes}</td>
                <td className="text-center">
                  <button
                    onClick={()=>{openCommentSheet(item)}}
                    className="bg-[#EAE5DA] text-[#333030] hover:bg-[#f8ebcf] p-1 px-4 rounded-md"
                  >
                    Comment
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={()=>{openVoteModal(item)}}
                    className="bg-[#EAE5DA] text-[#333030] hover:bg-[#f8ebcf] p-1 px-4 rounded-md"
                  >
                    Vote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ScrollBar color="red" />
      </ScrollArea>
    </div>
  );
}

export default LBTable;
