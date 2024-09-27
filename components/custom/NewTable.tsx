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
import {
  LBCommentStore,
  LBVoteModalStore,
  selectedUserStore,
  useSearchStore,
} from "@/store";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { get, ref, set } from "firebase/database";
import { database } from "@/firebase/firebase.config";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

type props = {
  allUsers: any[];
  activeElection: any;
  getComments: any;
  fetchTwitterUsers: any;
  twitterUsers: any;
  searchInput:any;
};

function NewTable({
  allUsers,
  activeElection,
  getComments,
  fetchTwitterUsers,
  twitterUsers,
  searchInput
}: props) {
  const { isLBCommentsSheetOpen, setIsLBCommentsSheetOpen } = LBCommentStore();
  const { isLBVoteModalOpen, setIsLBVoteModalOpen } = LBVoteModalStore();
  const { isLBCommentsMobileSheetOpen, setIsLBCommentsMobileSheetOpen } =
    LBCommentStore();
  const [isWidthBelow640, setIsWidthBelow640] = useState(false);
  const { selectedVoteUser, setSelectedVoteUser } = selectedUserStore();
  const { setSearchInput } = useSearchStore();
  const { toast } = useToast();

  useEffect(() => {
    const handleResize = () => {
      setIsWidthBelow640(window.innerWidth < 640);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openCommentSheet = (selectedUser: any) => {
    const tl = gsap.timeline({ defaults: { ease: "power1" } });
    if (isWidthBelow640) {
      setIsLBCommentsMobileSheetOpen(true);
      getComments(selectedUser);
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

  const openVoteModal = (item: any) => {
    setSelectedVoteUser(item);
    setIsLBVoteModalOpen(true);
  };

  const handleFindOnTwitter = () => {
    fetchTwitterUsers(searchInput);
  };

  const handleAddUser = async (user: any) => {
    try {
      const dbRef = ref(database, "/users/" + user?.id);
      const snapshot = await get(dbRef);
      await set(dbRef, {
        userId: user?.id,
        userName: user?.username,
        email: "",
        photoUrl: user?.profile_image_url,
        phoneNumber: "",
        userCreated: "",
      });
      toast({
        title: "Success",
        description: `${user.username} added successfully`,
        className: `${imfell400.className}`,
      });
      setSearchInput("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later",
        className: `${imfell400.className}`,
      });
    }
  };

  const sortedUsers = [...allUsers].sort(
    (a, b) => (b.votes || 0) - (a.votes || 0)
  );

  return (
    <div
      className={`flex px-20 max-md:px-4 max-lg:px-16 max-sm:px-4 ${imfell400.className} mt-6 w-full flex justify-center`}
    >
      <ScrollArea className="w-[80%] max-sm:w-full h-[40vh]">
        {allUsers?.length > 0 && (
          <table
            style={{ borderCollapse: "separate", borderSpacing: "0 0.5rem" }}
            className="min-w-[90%]"
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
              {sortedUsers?.map((item, index) => {
                // Define the background colors for the rows
                const backgroundColors = [
                  "#D87000", // First row
                  "#7787A6", // Second row
                  "#5B2928", // Third row
                  "#414434", // Fourth row
                  "#4A3B34", // Fifth row
                ];

                // Determine the background color based on the index
                const bgColor =
                  index < 3
                    ? backgroundColors[index]
                    : backgroundColors[(index % 2) + 3]; // Alternates between #414434 and #4A3B34 for the rest of the rows

                return (
                  <tr
                    key={index}
                    className={`text-[#FFD599]`}
                    style={{ backgroundColor: bgColor }} // Apply the background color
                  >
                    <td className="font-medium flex items-center gap-4 text-center">
                      <img
                        className="h-10 w-10 p-1"
                        src={item.photoUrl}
                        alt="profile-pic"
                      />
                      {item.userName || item.name}
                    </td>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{item?.votes}</td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          openCommentSheet(item);
                        }}
                        className="bg-[#EAE5DA] text-[#333030] hover:bg-[#f8ebcf] p-1 px-4 rounded-md"
                      >
                        Comment
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          openVoteModal(item);
                        }}
                        className="bg-[#EAE5DA] text-[#333030] hover:bg-[#f8ebcf] p-1 px-4 rounded-md"
                      >
                        Vote
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {allUsers?.length <= 0 && (
          <div className="flex flex-col w-full h-full mt-10">
            <div className="w-full flex flex-col justify-center items-center gap-3">
              <p className="text-center text-[#EAE5DA]">
                There is no such user in our database.But if you want you can
                add them.
              </p>
              <Button
                onClick={handleFindOnTwitter}
                className=""
                variant={"outline"}
              >
                Find on twitter
              </Button>
            </div>
            <div className="flex flex-col w-full items-center mt-8">
              {twitterUsers?.map((item: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center w-1/2 justify-between text-[#EAE5DA] bg-[#7B5645] p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="h-10 w-10 p-1"
                      src={item?.profile_image_url}
                      alt="profile-pic"
                    />
                    <p>{item?.username}</p>
                  </div>
                  <Button
                    onClick={() => {
                      handleAddUser(item);
                    }}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        <ScrollBar color="red" />
      </ScrollArea>
    </div>
  );
}

export default NewTable;
