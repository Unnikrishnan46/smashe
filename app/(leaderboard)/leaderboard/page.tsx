"use client";
import LBCommentSheet from "@/components/custom/LBCommentSheet";
import LBContent from "@/components/custom/LBContent";
import LBMobileNavBar from "@/components/custom/LBMobileNavBar";
import LBNavbar from "@/components/custom/LBNavbar";
import Loader from "@/components/custom/Loader";
import { app, database } from "@/firebase/firebase.config";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { equalTo, get, onValue, orderByChild, push, query, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import LBVoteModal from "@/components/custom/LBVoteModal";
import { imfell400 } from "@/utils/fonts";
import VoteSuccessModal from "@/components/custom/VoteSuccessModal";
import TopTenModal from "@/components/custom/TopTenModal";
import TopTenOfAllTimeModal from "@/components/custom/TopTenOfAllTime";
import LBYourTopSpotModal from "@/components/custom/LBYourTopSpotModal";
import { LBVoteModalStore } from "@/store";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import LBNavMenuMobile from "@/components/custom/LBNavMenuMobile";
import LBCommentsMobileSheet from "@/components/custom/LBCommentsMobileSheet";

function LeaderBoard() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User>();
  const [allUsers, setAllUsers] = useState<any>([]);
  const [activeElection, setActiveElection] = useState<any>();
  const [comment,setComment] = useState<string>("");
  const [selectedUserComment,setSelectedUserComment] = useState<any>([]);
  const [selectedUser,setSelectedUser] = useState<any>(null!);
  const [topTenOfAllTime,setTopTenOfAllTime] = useState<any>([]);
  const [previousTopTen,setPreviousTopTen] = useState<any[]>([]);
 const [successUser,setSuccessUser] = useState<any>(null);
 const [twitterData, setTwitterData] = useState<string | null>(null);
 const [telegramData, setTelegramData] = useState<string | null>(null);
 const [eagleData, setEagleData] = useState<string | null>(null);

  const {
    isLBVoteModalOpen,
    setIsLBVoteModalOpen,
    setIsLBVoteSuccessModalOpen,
  } = LBVoteModalStore();
  
  const { toast } = useToast();
  const auth = getAuth(app);
  const router = useRouter();

  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(undefined!);
      router.replace("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const fetchActiveElection = async () => {
    try {
      const dbRef = ref(database, "/elections/");
      const snapshot = await get(dbRef);
  
      if (snapshot.exists()) {
        const elections = snapshot.val();
        const currentDate = new Date();
  
        // Find the election where the current time is between fromDate and toDate
        let activeElection = null;
        Object.keys(elections).forEach((key) => {
          const election = elections[key];
          const fromDate = new Date(election.fromDate);
          const toDate = new Date(election.toDate);
  
          if (currentDate >= fromDate && currentDate <= toDate) {
            activeElection = { id: key, ...election };
          }
        });
  
        if (activeElection) {
          setActiveElection(activeElection);
        } else {
          setActiveElection(null);
        }
      } else {
        setActiveElection(null);
      }
    } catch (error) {
      console.error("Error retrieving active election: ", error);
      setActiveElection(null);
    }
  };  

  const voteACandidate = async (votedUserId: string) => {
    if (!currentUser || !activeElection) {
      toast({
        title: "Error",
        description: "You need to be logged in and an active election must be ongoing.",
        className: `${imfell400.className}`,
      });
      return;
    }
  
    const now = new Date().getTime();
    const fromDate = new Date(activeElection.fromDate).getTime();
    const toDate = new Date(activeElection.toDate).getTime();
  
    if (now < fromDate || now > toDate) {
      toast({
        title: "Invalid Election Time",
        description: "The election is not currently active.",
        className: `${imfell400.className}`,
      });
      return;
    }
  
    if (currentUser.uid === votedUserId) {
      toast({
        title: "Invalid Vote",
        description: "You cannot vote for yourself.",
        className: `${imfell400.className}`,
      });
      return;
    }
  
  
    try {
      const votesRef = ref(database, `/votes/${activeElection.id}/`);
      const userVotesQuery = query(votesRef, orderByChild("voterId"), equalTo(currentUser.uid));
      const snapshot = await get(userVotesQuery);
  
      if (snapshot.exists()) {
        const userVotes = snapshot.val();
        const now = new Date().getTime();
  
        for (const voteKey in userVotes) {
          const vote = userVotes[voteKey];
  
          const [date, time] = vote.voteTime.split(", ");
          const [day, month, year] = date.split("/"); 
          const formattedVoteTime = `${month}/${day}/${year}, ${time}`; 
  
          const voteTime = new Date(formattedVoteTime).getTime(); 
  
          if (now - voteTime < 86400000) { 
            toast({
              title: "Cooldown Active",
              description: "You can only vote once every 24 hours.",
              className: `${imfell400.className}`,
            });
            return;
          }
        }
      }
  

      const newVoteRef = push(votesRef);
      await set(newVoteRef, {
        voterId: currentUser.uid,
        votedUserId: votedUserId,
        voteTime: new Date().toLocaleString("en-GB"),
      });

      const commentId = uuidv4();
      const commentRef = ref(database, `/comments/${commentId}`);
      
      if(comment){
        await set(commentRef,{
          id:commentId,
          commentFrom: currentUser.uid,
          commentFromName:currentUser.displayName,
          commentFromPhoto:currentUser.photoURL,
          commentTo:votedUserId,
          comment:comment,
          commentTime: new Date().toLocaleString(),
        });
      }
  
      toast({
        title: "Vote Cast",
        description: "Your vote has been successfully cast.",
        className: `${imfell400.className}`,
      });
      setIsLBVoteModalOpen(false);
    } catch (error) {
      console.error("Error casting vote: ", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        className: `${imfell400.className}`,
      });
    }
  };

  const getComments = async (selectedUser: any) => {
    setSelectedUser(selectedUser);
    try {
      const auth = getAuth();
      const currentUser = auth?.currentUser;
      if (currentUser) {
        const commentRef = ref(database, `/comments`);
        const snapshot = await get(commentRef);
  
        if (snapshot.exists()) {
          const allComments = snapshot.val();
          const matchingComments = [];
  
          for (const key in allComments) {
            if (allComments[key].commentTo === selectedUser.userId) {
              matchingComments.push(allComments[key]);
            }
          }
  
          // Function to parse the date string
          const parseDate = (dateString: string) => {
            const [day, month, year, time] = dateString.split(/\/|, | /);
            return new Date(`${year}-${month}-${day}T${time}`);
          };
  
          // Sort comments by parsed date
          matchingComments.sort((a, b) => {
            const dateA = parseDate(a.commentTime);
            const dateB = parseDate(b.commentTime);
            return dateB.getTime() - dateA.getTime(); // Sort in descending order
          });
  
          setSelectedUserComment(matchingComments); // Store the sorted comments in state
        }
      }
    } catch (error) {
      console.error("Error retrieving comments: ", error);
    }
  };
  

  const getAllUsersWithVotes = () => {
    try {
      const usersRef = ref(database, "/users/");
      onValue(usersRef, async (snapshot) => {
        const usersData = snapshot.val();
  
        if (!usersData) {
          return;
        }
  
        const usersArray = Object.values(usersData);
        const electionsRef = ref(database, "/elections/");
        const electionsSnapshot = await get(electionsRef);
        const electionsData = electionsSnapshot.val();
  
        if (!electionsData) {
          return;
        }
  
        // Get the current date
        const currentDate = new Date();
  
        // Find the election where the current time is between fromDate and toDate
        const activeElection = Object.values(electionsData).find(
          (election: any) => {
            const fromDate = new Date(election.fromDate);
            const toDate = new Date(election.toDate);
            return currentDate >= fromDate && currentDate <= toDate;
          }
        ) as any;
  
        if (!activeElection) {
          return;
        }
  
        const activeElectionId = activeElection.id;
        const votesRef = ref(database, `/votes/${activeElectionId}`);
        onValue(votesRef, (votesSnapshot) => {
          const votesData = votesSnapshot.val();
  
          const voteCounts: Record<string, number> = {};
  
          if (votesData) {
            Object.values(votesData).forEach((vote: any) => {
              const votedUserId = vote?.votedUserId;
              if (votedUserId) {
                if (voteCounts[votedUserId]) {
                  voteCounts[votedUserId]++;
                } else {
                  voteCounts[votedUserId] = 1;
                }
              }
            });
          } else {
            // console.log("No votes found for the active election.");
          }
  
          const updatedUsers = usersArray.map((user: any) => {
            const userId = user.userId;
            const votes = voteCounts[userId] || 0;
            return {
              ...user,
              votes,
            };
          });
          setAllUsers(updatedUsers);
        });
      });
    } catch (error) {
      console.error("Error retrieving and updating users with votes: ", error);
    }
  };
  

const getTopTenUsersAllElections = async () => {
  try {
    const usersRef = ref(database, "/users/");
    const usersSnapshot = await get(usersRef);
    const usersData = usersSnapshot.val();

    if (!usersData) {
      return;
    }

    const voteCounts: Record<string, { userId: string; votes: number; name: string; photoUrl: string }> = {};
    Object.keys(usersData).forEach((userId) => {
      const user = usersData[userId];
      voteCounts[userId] = {
        userId,
        votes: 0,
        name: user.userName || "Unknown",
        photoUrl: user.photoUrl || "",
      };
    });

    const electionsRef = ref(database, "/elections/");
    const electionsSnapshot = await get(electionsRef);
    const electionsData = electionsSnapshot.val();

    if (!electionsData) {
      return;
    }

    for (const electionId in electionsData) {
      const votesRef = ref(database, `/votes/${electionId}`);
      const votesSnapshot = await get(votesRef);
      const votesData = votesSnapshot.val();

      if (votesData) {
        Object.values(votesData).forEach((vote: any) => {
          const votedUserId = vote?.votedUserId;
          if (votedUserId && voteCounts[votedUserId]) {
            voteCounts[votedUserId].votes++;
          }
        });
      }
    }
    const usersWithVotes = Object.values(voteCounts);

    const topTenUsers = usersWithVotes
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 10);

    setTopTenOfAllTime(topTenUsers);
  } catch (error) {
    console.error("Error retrieving and calculating top 10 users:", error);
  }
};


const parseCustomDate = (dateString:any) => {
  const [datePart, timePart] = dateString.split(', ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [time, period] = timePart.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  const hours24 = period === 'PM' && hours < 12 ? hours + 12 : (period === 'AM' && hours === 12 ? 0 : hours);

  return new Date(year, month - 1, day, hours24, minutes);
};

// const getTopTenUsersPreviousElection = async () => {
//   try {
//     const usersRef = ref(database, "/users/");
//     const usersSnapshot = await get(usersRef);
//     const usersData = usersSnapshot.val();

//     if (!usersData) {
//       return;
//     }

//     const voteCounts: Record<string, { userId: string; votes: number; name: string; photoUrl: string }> = {};
//     Object.keys(usersData).forEach((userId) => {
//       const user = usersData[userId];
//       voteCounts[userId] = {
//         userId,
//         votes: 0,
//         name: user.userName || "Unknown",
//         photoUrl: user.photoUrl || "",
//       };
//     });

//     const electionsRef = ref(database, "/elections/");
//     const electionsSnapshot = await get(electionsRef);
//     const electionsData = electionsSnapshot.val();

//     if (!electionsData) {
//       return;
//     }

//     const sortedElections = Object.values(electionsData).sort(
//       (a: any, b: any) => parseCustomDate(b.createdDate).getTime() - parseCustomDate(a.createdDate).getTime()
//     );

//     if (sortedElections.length < 2) {
//       return;
//     }

//     const previousElection = sortedElections[1] as any;
//     const previousElectionId = previousElection.id;

//     const votesRef = ref(database, `/votes/${previousElectionId}`);
//     const votesSnapshot = await get(votesRef);
//     const votesData = votesSnapshot.val();

//     if (!votesData) {
//       return;
//     }

//     Object.values(votesData).forEach((vote: any) => {
//       const votedUserId = vote?.votedUserId;
//       if (votedUserId && voteCounts[votedUserId]) {
//         voteCounts[votedUserId].votes++;
//       }
//     });

//     const usersWithVotes = Object.values(voteCounts);
//     const topTenUsers = usersWithVotes
//       .sort((a, b) => b.votes - a.votes)
//       .slice(0, 10);

//     setPreviousTopTen(topTenUsers);
//   } catch (error) {
//     console.error("Error retrieving and calculating top 10 users for the previous election:", error);
//   }
// };


const getTopTenUsersActiveElection = async () => {
  try {
    const usersRef = ref(database, "/users/");
    const usersSnapshot = await get(usersRef);
    const usersData = usersSnapshot.val();

    if (!usersData) {
      return;
    }

    const voteCounts: Record<string, { userId: string; votes: number; name: string; photoUrl: string }> = {};
    Object.keys(usersData).forEach((userId) => {
      const user = usersData[userId];
      voteCounts[userId] = {
        userId,
        votes: 0,
        name: user.userName || "Unknown",
        photoUrl: user.photoUrl || "",
      };
    });

    const electionsRef = ref(database, "/elections/");
    const electionsSnapshot = await get(electionsRef);
    const electionsData = electionsSnapshot.val();

    if (!electionsData) {
      return;
    }

    // Get the current date
    const currentDate = new Date();

    // Find the active election where current time is between fromDate and toDate
    const activeElection = Object.values(electionsData).find(
      (election: any) => {
        const fromDate = new Date(election.fromDate);
        const toDate = new Date(election.toDate);
        return currentDate >= fromDate && currentDate <= toDate;
      }
    ) as any;

    if (!activeElection) {
      console.error("No active election found");
      return;
    }

    const activeElectionId = activeElection.id;
    const votesRef = ref(database, `/votes/${activeElectionId}`);
    const votesSnapshot = await get(votesRef);
    const votesData = votesSnapshot.val();

    if (!votesData) {
      return;
    }

    Object.values(votesData).forEach((vote: any) => {
      const votedUserId = vote?.votedUserId;
      if (votedUserId && voteCounts[votedUserId]) {
        voteCounts[votedUserId].votes++;
      }
    });

    const usersWithVotes = Object.values(voteCounts);
    const topTenUsers = usersWithVotes
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 10);

    setPreviousTopTen(topTenUsers);  // This could be renamed to `setActiveTopTen` if it's specifically for the active election
  } catch (error) {
    console.error("Error retrieving and calculating top 10 users for the active election:", error);
  }
};



const fetchSocialMediaData = async () => {
  try {
    const socialRef = ref(database, "/socials/");
    const snapshot = await get(socialRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setTwitterData(data.twitter || "");
      setTelegramData(data.telegram || "");
      setEagleData(data.eagle || "");
    }
  } catch (error) {
    console.error("Error fetching social media data: ", error);
  }
};


const {pause} = useGlobalAudioPlayer();

useEffect(()=>{
  pause();
  fetchSocialMediaData();
},[]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getAllUsersWithVotes()
        fetchActiveElection();
        getTopTenUsersAllElections();
        // getTopTenUsersPreviousElection();
        getTopTenUsersActiveElection()
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <Loader />;
  }

  

  return (
    <div className="h-[140vh] max-lg:h-[160vh] max-sm:h-[180vh] bg-black overflow-hidden">
      <div
        style={{ backgroundSize: "100% 100%" }}
        className=" bg-[url(/images/leaderboardBg.png)] bg-center bg-no-repeat w-full h-full relative"
      >
        <LBNavbar currentUser={currentUser!} logOut={logOut} twitterData={twitterData} telegramData={telegramData} eagleData={eagleData}/>
        <LBMobileNavBar currentUser={currentUser!} logOut={logOut}/>
        <LBNavMenuMobile twitterData={twitterData} telegramData={telegramData} eagleData={eagleData}/>
        <LBContent allUsers={allUsers} activeElection={activeElection} getComments={getComments} previousTopTen={previousTopTen} topTenOfAllTime={topTenOfAllTime}/>
      </div>
      <LBCommentSheet selectedUserComment={selectedUserComment} selectedUser={selectedUser} currentUser={currentUser} getComments={getComments}/>
      <LBCommentsMobileSheet selectedUserComment={selectedUserComment} selectedUser={selectedUser} currentUser={currentUser} getComments={getComments}/>
      <LBVoteModal voteACandidate={voteACandidate} setComment={setComment}/>
      <VoteSuccessModal successUser={successUser} setSuccessUser={setSuccessUser}/>
      <TopTenModal allUsers={previousTopTen}/>
      <TopTenOfAllTimeModal topTenOFAllTime={topTenOfAllTime}/>
      <LBYourTopSpotModal previousTopTen={previousTopTen}/>
    </div>
  );
}

export default LeaderBoard;
