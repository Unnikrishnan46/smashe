import { LBVoteModalStore, selectedUserStore } from "@/store";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { imfell400 } from "@/utils/fonts";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import { database } from "@/firebase/firebase.config";

type props = {
  voteACandidate: any;
  setComment: any;
};

function LBVoteModal({ voteACandidate, setComment }: props) {
  const {
    isLBVoteModalOpen,
    setIsLBVoteModalOpen,
    setIsLBVoteSuccessModalOpen,
  } = LBVoteModalStore();
  const { selectedVoteUser, setSelectedVoteUser } = selectedUserStore();
  const [activeElection, setActiveElection] = useState<any>();

  const handleModalChange = () => {
    setSelectedVoteUser(null);
    setIsLBVoteModalOpen(false);
  };

  const fetchActiveElection = async () => {
    try {
      const dbRef = ref(database, "/elections/");
      const activeElectionQuery = query(
        dbRef,
        orderByChild("isActive"),
        equalTo(true)
      );
      const snapshot = await get(activeElectionQuery);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const electionId = Object.keys(data)[0];
        setActiveElection({ id: electionId, ...data[electionId] });
      } else {
        setActiveElection(null);
      }
    } catch (error) {
      console.error("Error retrieving active election: ", error);
      setActiveElection(null);
    }
  };

  const handleSubmit = async () => {
    try {
      voteACandidate(selectedVoteUser.userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActiveElection();
  }, []);

  return (
    <Dialog open={isLBVoteModalOpen} onOpenChange={handleModalChange}>
      <DialogContent
        style={{ backgroundSize: "100%" }}
        className="sm:max-w-[425px] bg-[url(/images/vote-for-bg.png)] max-sm:bg-[url(/images/vote-for-mobile-ripped-paper.png)] bg-no-repeat bg-center bg-contain bg-transparent border-none h-[500px] max-sm:w-full max-sm:bg-customfull max-sm:h-full"
      >
        <div
          className={`relative ${imfell400.className} gap-6 flex flex-col items-center justify-center`}
        >
          <button
            onClick={handleModalChange}
            className="absolute top-16 left-2 flex w-7 h-7 justify-center items-center rounded-full border-2 border-[#D2BFA1] bg-[#EAE5DA]"
          >
            <ChevronLeft size={15} />
          </button>
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-[#502A29] text-2xl">Vote For</h1>
            <img src="/images/vote-for-divider.png" alt="" />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <img
              className="w-16 h-16 rounded-full"
              src={selectedVoteUser?.photoUrl}
              alt=""
            />
            <h1 className="text-[#502A29]">{selectedVoteUser?.userName}</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 max-sm:w-full max-md:w-full max-lg:w-[90%] w-[90%] max-xl:w-full">
            <div
              style={{ backgroundSize: "100% 100%" }}
              className="bg-[url(/images/vote-for-text-container.png)] bg-center bg-no-repeat h-[15vh] w-[17vw] max-sm:w-[90%] max-md:w-[90%] p-3 max-lg:w-full max-xl:w-[90%]"
            >
              <textarea
                onChange={(e)=>{setComment(e.target.value)}}
                placeholder="Leave your comments here"
                className="flex w-full h-full outline-none border-none bg-transparent"
                name=""
                id=""
              ></textarea>
            </div>
            <Button onClick={handleSubmit} className="bg-[#796741]">
              Submit Vote
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LBVoteModal;
