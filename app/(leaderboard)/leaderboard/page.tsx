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
import {
  equalTo,
  get,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";
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
  const [allGoodUsers, setAllGoodUsers] = useState<any>([]);
  const [allEvilUsers, setAllEvilUsers] = useState<any>([]);
  const [comment, setComment] = useState<string>("");
  const [selectedUserComment, setSelectedUserComment] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null!);
  const [topTenOfAllTime, setTopTenOfAllTime] = useState<any>([]);
  const [previousTopTen, setPreviousTopTen] = useState<any[]>([]);
  const [successUser, setSuccessUser] = useState<any>(null);
  const [twitterData, setTwitterData] = useState<string | null>(null);
  const [telegramData, setTelegramData] = useState<string | null>(null);
  const [eagleData, setEagleData] = useState<string | null>(null);
  const [topTenEvilUsers, setTopTenEvilUsers] = useState<any>([]);
  const [activeElectionGood, setActiveElectionGood] = useState<any>(null);
  const [activeElectionEvil, setActiveElectionEvil] = useState<any>(null);
  const [previousGoodElectionWinner, setPreviousGoodElectionWinner] =
    useState<any>(null);
  const [previousEvilElectionWinner, setPreviousEvilElectionWinner] =
    useState<any>(null);
    const [previousTopTenGood,setPreviousTopTenGood] = useState<any>([]);
    const [previousTopTenEvil,setPreviousTopTenEvil] = useState<any>([]);
    const [topTenOfAllTimeGood,setTopTenOfAllTimeGood] = useState<any>([]);
    const [topTenOfAllTimeEvil,setTopTenOfAllTimeEvil] = useState<any>([]);
    

  const {
    setIsLBVoteModalOpen,
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

  const fetchActiveElections = async () => {
    try {
      const dbRef = ref(database, "/elections/");
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const elections = snapshot.val();
        const currentDate = new Date();

        // Initialize variables to store active elections for both modes
        let activeGoodElection = null;
        let activeEvilElection = null;

        // Iterate over the elections and find active elections for both "good" and "evil" modes
        Object.keys(elections).forEach((key) => {
          const election = elections[key];
          const fromDate = new Date(election.fromDate);
          const toDate = new Date(election.toDate);

          // Check if the current date is between fromDate and toDate for both modes
          if (currentDate >= fromDate && currentDate <= toDate) {
            if (election.electionMode === "good") {
              activeGoodElection = { id: key, ...election };
            } else if (election.electionMode === "evil") {
              activeEvilElection = { id: key, ...election };
            }
          }
        });
        console.log("activeGoodElection  :  ", activeGoodElection);

        // Set active elections for both modes
        setActiveElectionGood(activeGoodElection || null); // Handle case when no active good election is found
        setActiveElectionEvil(activeEvilElection || null); // Handle case when no active evil election is found
      } else {
        // Set both to null if no elections exist
        setActiveElectionGood(null);
        setActiveElectionEvil(null);
      }
    } catch (error) {
      console.error("Error retrieving active elections: ", error);
      // Set both to null in case of an error
      setActiveElectionGood(null);
      setActiveElectionEvil(null);
    }
  };

  const voteACandidate = async (votedUserId: string, electionType: string) => {
    const activeElection =
      electionType === "good" ? activeElectionGood : activeElectionEvil;

    if (!currentUser || !activeElection) {
      toast({
        title: "Error",
        description:
          "You need to be logged in and an active election must be ongoing.",
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
        description: `The ${electionType} election is not currently active.`,
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
      const userVotesQuery = query(
        votesRef,
        orderByChild("voterId"),
        equalTo(currentUser.uid)
      );
      const snapshot = await get(userVotesQuery);

      if (snapshot.exists()) {
        const userVotes = snapshot.val();
        for (const voteKey in userVotes) {
          const vote = userVotes[voteKey];

          const [date, time] = vote.voteTime.split(", ");
          const [day, month, year] = date.split("/");
          const formattedVoteTime = `${month}/${day}/${year}, ${time}`;

          const voteTime = new Date(formattedVoteTime).getTime();

          if (now - voteTime < 86400000) {
            // 24 hours cooldown
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

      if (comment) {
        await set(commentRef, {
          id: commentId,
          commentFrom: currentUser.uid,
          commentFromName: currentUser.displayName,
          commentFromPhoto: currentUser.photoURL,
          commentTo: votedUserId,
          comment: comment,
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

  const getAllUsersWithGoodVotes = () => {
    try {
      const usersRef = ref(database, "/users/");
      onValue(usersRef, async (snapshot) => {
        const usersData = snapshot.val();

        if (!usersData) {
          return;
        }

        const usersArray = Object.values(usersData);
        const electionsRef = ref(database, "/elections/");
        const goodElectionsQuery = query(
          electionsRef,
          orderByChild("electionMode"),
          equalTo("good")
        );
        const electionsSnapshot = await get(goodElectionsQuery);
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
          setAllGoodUsers(updatedUsers);
        });
      });
    } catch (error) {
      console.error("Error retrieving and updating users with votes: ", error);
    }
  };

  const getAllUsersWithEvilVotes = () => {
    try {
      const usersRef = ref(database, "/users/");
      onValue(usersRef, async (snapshot) => {
        const usersData = snapshot.val();

        if (!usersData) {
          return;
        }

        const usersArray = Object.values(usersData);
        const electionsRef = ref(database, "/elections/");
        const evilElectionsQuery = query(
          electionsRef,
          orderByChild("electionMode"),
          equalTo("evil")
        );
        const electionsSnapshot = await get(evilElectionsQuery);
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
          setAllEvilUsers(updatedUsers);
        });
      });
    } catch (error) {
      console.error("Error retrieving and updating users with votes: ", error);
    }
  };

  const getTopTenUsersInEvilElections = async () => {
    try {
      // Reference to users data
      const usersRef = ref(database, "/users/");
      const usersSnapshot = await get(usersRef);
      const usersData = usersSnapshot.val();

      if (!usersData) {
        return;
      }

      const voteCounts: Record<
        string,
        { userId: string; votes: number; name: string; photoUrl: string }
      > = {};
      Object.keys(usersData).forEach((userId) => {
        const user = usersData[userId];
        voteCounts[userId] = {
          userId,
          votes: 0,
          name: user.userName || "Unknown",
          photoUrl: user.photoUrl || "",
        };
      });

      // Query for elections with electionMode set to "evil"
      const electionsRef = query(
        ref(database, "/elections/"),
        orderByChild("electionMode"),
        equalTo("evil")
      );
      const electionsSnapshot = await get(electionsRef);
      const electionsData = electionsSnapshot.val();

      if (!electionsData) {
        return;
      }

      // Iterate over elections and collect vote data
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

      // Get top 10 users by votes
      const usersWithVotes = Object.values(voteCounts);
      const topTenEvilUsers = usersWithVotes
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 10);
      console.log("topTenEvilUsers  : ", topTenEvilUsers);

      setTopTenEvilUsers(topTenEvilUsers);
    } catch (error) {
      console.error(
        "Error retrieving and calculating top 10 users in evil elections:",
        error
      );
    }
  };

  const getTopTenUsersGoodElections = async () => {
    try {
      const usersRef = ref(database, "/users/");
      const usersSnapshot = await get(usersRef);
      const usersData = usersSnapshot.val();

      if (!usersData) {
        return;
      }

      const voteCounts: Record<
        string,
        { userId: string; votes: number; name: string; photoUrl: string }
      > = {};
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
      const goodElectionsQuery = query(
        electionsRef,
        orderByChild("electionMode"),
        equalTo("good")
      );
      const electionsSnapshot = await get(goodElectionsQuery);
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

  const getTopTenUsersPreviousGoodElection = async () => {
    try {
      const electionsRef = ref(database, "/elections/");
      const goodElectionsQuery = query(
        electionsRef,
        orderByChild("electionMode"),
        equalTo("good")
      );
      const electionsSnapshot = await get(goodElectionsQuery);
      const electionsData = electionsSnapshot.val();
  
      if (!electionsData) {
        return;
      }
  
      const currentDate = new Date();
  
      // Filter completed good elections (those that ended before the current date)
      const completedElections = Object.values(electionsData).filter(
        (election: any) => new Date(election.toDate) < currentDate
      );
  
      if (!completedElections.length) {
        return;
      }
  
      // Find the most recent completed good election
      const previousGoodElection = completedElections.reduce((prev: any, curr: any) => {
        return new Date(curr.toDate) > new Date(prev.toDate) ? curr : prev;
      }) as any;
  
      const previousGoodElectionId = previousGoodElection.id;
  
      const votesRef = ref(database, `/votes/${previousGoodElectionId}`);
      const votesSnapshot = await get(votesRef);
      const votesData = votesSnapshot.val();
  
      if (!votesData) {
        return;
      }
  
      const voteCounts: Record<
        string,
        { userId: string; votes: number; name: string; photoUrl: string }
      > = {};
  
      const usersRef = ref(database, "/users/");
      const usersSnapshot = await get(usersRef);
      const usersData = usersSnapshot.val();
  
      if (!usersData) {
        return;
      }
  
      // Initialize vote count for each user
      Object.keys(usersData).forEach((userId) => {
        const user = usersData[userId];
        voteCounts[userId] = {
          userId,
          votes: 0,
          name: user.userName || "Unknown",
          photoUrl: user.photoUrl || "",
        };
      });
  
      // Count votes for the previous good election
      Object.values(votesData).forEach((vote: any) => {
        const votedUserId = vote?.votedUserId;
        if (votedUserId && voteCounts[votedUserId]) {
          voteCounts[votedUserId].votes++;
        }
      });
  
      // Get top 10 users
      const usersWithVotes = Object.values(voteCounts);
      const topTenUsersPreviousGoodElection = usersWithVotes
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 10);
  
      setPreviousTopTenGood(topTenUsersPreviousGoodElection);  // Store the result
    } catch (error) {
      console.error("Error retrieving top 10 users for the previous good election:", error);
    }
  };

  const getTopTenUsersPreviousEvilElection = async () => {
    try {
      const electionsRef = ref(database, "/elections/");
      const evilElectionsQuery = query(
        electionsRef,
        orderByChild("electionMode"),
        equalTo("evil")
      );
      const electionsSnapshot = await get(evilElectionsQuery);
      const electionsData = electionsSnapshot.val();
  
      if (!electionsData) {
        return;
      }
  
      const currentDate = new Date();
  
      // Filter completed evil elections (those that ended before the current date)
      const completedElections = Object.values(electionsData).filter(
        (election: any) => new Date(election.toDate) < currentDate
      );
  
      if (!completedElections.length) {
        return;
      }
  
      // Find the most recent completed evil election
      const previousEvilElection = completedElections.reduce((prev: any, curr: any) => {
        return new Date(curr.toDate) > new Date(prev.toDate) ? curr : prev;
      }) as any;
  
      const previousEvilElectionId = previousEvilElection.id;
  
      const votesRef = ref(database, `/votes/${previousEvilElectionId}`);
      const votesSnapshot = await get(votesRef);
      const votesData = votesSnapshot.val();
  
      if (!votesData) {
        return;
      }
  
      const voteCounts: Record<
        string,
        { userId: string; votes: number; name: string; photoUrl: string }
      > = {};
  
      const usersRef = ref(database, "/users/");
      const usersSnapshot = await get(usersRef);
      const usersData = usersSnapshot.val();
  
      if (!usersData) {
        return;
      }
  
      // Initialize vote count for each user
      Object.keys(usersData).forEach((userId) => {
        const user = usersData[userId];
        voteCounts[userId] = {
          userId,
          votes: 0,
          name: user.userName || "Unknown",
          photoUrl: user.photoUrl || "",
        };
      });
  
      // Count votes for the previous evil election
      Object.values(votesData).forEach((vote: any) => {
        const votedUserId = vote?.votedUserId;
        if (votedUserId && voteCounts[votedUserId]) {
          voteCounts[votedUserId].votes++;
        }
      });
  
      // Get top 10 users
      const usersWithVotes = Object.values(voteCounts);
      const topTenUsersPreviousEvilElection = usersWithVotes
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 10);
  
      setPreviousTopTenEvil(topTenUsersPreviousEvilElection);  // Store the result
    } catch (error) {
      console.error("Error retrieving top 10 users for the previous evil election:", error);
    }
  };
  
  const getTopTenUsersAllTimeGoodElections = async () => {
    try {
      const usersRef = ref(database, "/users/");
      const usersSnapshot = await get(usersRef);
      const usersData = usersSnapshot.val();
  
      if (!usersData) {
        return;
      }
  
      const voteCounts: Record<
        string,
        { userId: string; votes: number; name: string; photoUrl: string }
      > = {};
      
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
      const goodElectionsQuery = query(
        electionsRef,
        orderByChild("electionMode"),
        equalTo("good")
      );
      const electionsSnapshot = await get(goodElectionsQuery);
      const electionsData = electionsSnapshot.val();
  
      if (!electionsData) {
        return;
      }
  
      // Loop through all good elections and count the votes for each user
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
  
      // Sort users by their total votes and get the top 10
      const topTenUsersAllTimeGood = usersWithVotes
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 10);
  
      setTopTenOfAllTimeGood(topTenUsersAllTimeGood);  // Store the result in your state
    } catch (error) {
      console.error("Error retrieving top 10 users of all time for good elections:", error);
    }
  };
  
  const getTopTenUsersAllTimeEvilElections = async () => {
    try {
      const usersRef = ref(database, "/users/");
      const usersSnapshot = await get(usersRef);
      const usersData = usersSnapshot.val();
  
      if (!usersData) {
        return;
      }
  
      const voteCounts: Record<
        string,
        { userId: string; votes: number; name: string; photoUrl: string }
      > = {};
      
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
      const evilElectionsQuery = query(
        electionsRef,
        orderByChild("electionMode"),
        equalTo("evil")
      );
      const electionsSnapshot = await get(evilElectionsQuery);
      const electionsData = electionsSnapshot.val();
  
      if (!electionsData) {
        return;
      }
  
      // Loop through all evil elections and count the votes for each user
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
  
      // Sort users by their total votes and get the top 10
      const topTenUsersAllTimeEvil = usersWithVotes
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 10);
  
      setTopTenOfAllTimeEvil(topTenUsersAllTimeEvil);  // Store the result in your state
    } catch (error) {
      console.error("Error retrieving top 10 users of all time for evil elections:", error);
    }
  };

  const parseCustomDate = (dateString: any) => {
    const [datePart, timePart] = dateString.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [time, period] = timePart.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    const hours24 =
      period === "PM" && hours < 12
        ? hours + 12
        : period === "AM" && hours === 12
        ? 0
        : hours;

    return new Date(year, month - 1, day, hours24, minutes);
  };

  const getTopTenUsersActiveElection = async () => {
    try {
      const usersRef = ref(database, "/users/");
      const usersSnapshot = await get(usersRef);
      const usersData = usersSnapshot.val();

      if (!usersData) {
        return;
      }

      const voteCounts: Record<
        string,
        { userId: string; votes: number; name: string; photoUrl: string }
      > = {};
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

      setPreviousTopTen(topTenUsers); // This could be renamed to `setActiveTopTen` if it's specifically for the active election
    } catch (error) {
      console.error(
        "Error retrieving and calculating top 10 users for the active election:",
        error
      );
    }
  };

  const getPreviousGoodElectionWinner = async () => {
    try {
      const electionsRef = ref(database, "/elections/");
      const goodElectionsQuery = query(
        electionsRef,
        orderByChild("electionMode"),
        equalTo("good")
      );
      const electionsSnapshot = await get(goodElectionsQuery);
      const electionsData = electionsSnapshot.val();

      if (!electionsData) {
        return;
      }

      const currentDate = new Date();

      // Filter completed good elections
      const completedElections = Object.values(electionsData).filter(
        (election: any) => new Date(election.toDate) < currentDate
      );

      if (!completedElections.length) {
        return;
      }

      // Find the election that ended closest to the current date
      const previousElection = completedElections.reduce(
        (prev: any, curr: any) => {
          return new Date(curr.toDate) > new Date(prev.toDate) ? curr : prev;
        }
      ) as any;

      const previousElectionId = previousElection.id;
      const votesRef = ref(database, `/votes/${previousElectionId}`);
      const votesSnapshot = await get(votesRef);
      const votesData = votesSnapshot.val();

      if (!votesData) {
        return;
      }

      const voteCounts: Record<string, number> = {};

      Object.values(votesData).forEach((vote: any) => {
        const votedUserId = vote?.votedUserId;
        if (votedUserId) {
          voteCounts[votedUserId] = (voteCounts[votedUserId] || 0) + 1;
        }
      });

      const winnerUserId = Object.keys(voteCounts).reduce((a, b) =>
        voteCounts[a] > voteCounts[b] ? a : b
      );
      const winnerRef = ref(database, `/users/${winnerUserId}`);
      const winnerSnapshot = await get(winnerRef);
      const winnerData = winnerSnapshot.val();

      setPreviousGoodElectionWinner(winnerData);
    } catch (error) {
      console.error("Error retrieving previous good election winner: ", error);
    }
  };

  const getPreviousEvilElectionWinner = async () => {
    try {
      const electionsRef = ref(database, "/elections/");
      const evilElectionsQuery = query(
        electionsRef,
        orderByChild("electionMode"),
        equalTo("evil")
      );
      const electionsSnapshot = await get(evilElectionsQuery);
      const electionsData = electionsSnapshot.val();

      if (!electionsData) {
        return;
      }

      const currentDate = new Date();

      // Filter completed evil elections
      const completedElections = Object.values(electionsData).filter(
        (election: any) => new Date(election.toDate) < currentDate
      );

      if (!completedElections.length) {
        return;
      }

      // Find the election that ended closest to the current date
      const previousElection = completedElections.reduce(
        (prev: any, curr: any) => {
          return new Date(curr.toDate) > new Date(prev.toDate) ? curr : prev;
        }
      ) as any;

      const previousElectionId = previousElection.id;
      const votesRef = ref(database, `/votes/${previousElectionId}`);
      const votesSnapshot = await get(votesRef);
      const votesData = votesSnapshot.val();

      if (!votesData) {
        return;
      }

      const voteCounts: Record<string, number> = {};

      Object.values(votesData).forEach((vote: any) => {
        const votedUserId = vote?.votedUserId;
        if (votedUserId) {
          voteCounts[votedUserId] = (voteCounts[votedUserId] || 0) + 1;
        }
      });

      const winnerUserId = Object.keys(voteCounts).reduce((a, b) =>
        voteCounts[a] > voteCounts[b] ? a : b
      );
      const winnerRef = ref(database, `/users/${winnerUserId}`);
      const winnerSnapshot = await get(winnerRef);
      const winnerData = winnerSnapshot.val();

      setPreviousEvilElectionWinner(winnerData);
    } catch (error) {
      console.error("Error retrieving previous evil election winner: ", error);
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

  const { pause } = useGlobalAudioPlayer();

  useEffect(() => {
    pause();
    fetchSocialMediaData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getAllUsersWithGoodVotes();
        getAllUsersWithEvilVotes();
        fetchActiveElections();
        getTopTenUsersGoodElections();
        getPreviousGoodElectionWinner();
        getPreviousEvilElectionWinner();
        getTopTenUsersInEvilElections();
        getTopTenUsersActiveElection();
        getTopTenUsersPreviousGoodElection();
        getTopTenUsersPreviousEvilElection();
        getTopTenUsersAllTimeGoodElections();
        getTopTenUsersAllTimeEvilElections();
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
    <div className="h-[150vh] max-lg:h-[180vh] max-sm:h-[180vh] bg-black overflow-hidden">
      <div
        style={{ backgroundSize: "100% 100%" }}
        className="bg-[url(/images/leaderboardBg.png)] bg-center bg-no-repeat w-full h-full relative"
      >
        <LBNavbar
          currentUser={currentUser!}
          logOut={logOut}
          twitterData={twitterData}
          telegramData={telegramData}
          eagleData={eagleData}
        />
        <LBMobileNavBar currentUser={currentUser!} logOut={logOut} />
        <LBNavMenuMobile
          twitterData={twitterData}
          telegramData={telegramData}
          eagleData={eagleData}
        />
        <LBContent
          allGoodUsers={allGoodUsers}
          allEvilUsers={allEvilUsers}
          activeElectionGood={activeElectionGood}
          activeElectionEvil={activeElectionEvil}
          getComments={getComments}
          previousTopTen={previousTopTen}
          topTenOfAllTime={topTenOfAllTime}
          topTenEvilUsers={topTenEvilUsers}
          previousGoodElectionWinner={previousGoodElectionWinner}
          previousEvilElectionWinner={previousEvilElectionWinner}
          topTenOfAllTimeGood={topTenOfAllTimeGood}
          topTenOfAllTimeEvil={topTenOfAllTimeEvil}
        />
      </div>
      <LBCommentSheet
        selectedUserComment={selectedUserComment}
        selectedUser={selectedUser}
        currentUser={currentUser}
        getComments={getComments}
      />
      <LBCommentsMobileSheet
        selectedUserComment={selectedUserComment}
        selectedUser={selectedUser}
        currentUser={currentUser}
        getComments={getComments}
      />
      <LBVoteModal voteACandidate={voteACandidate} setComment={setComment} />
      <VoteSuccessModal
        successUser={successUser}
        setSuccessUser={setSuccessUser}
      />
      <TopTenModal allUsers={previousTopTen} previousTopTenGood={allGoodUsers} previousTopTenEvil={allEvilUsers}/>
      <TopTenOfAllTimeModal topTenOFAllTime={topTenOfAllTime} topTenOfAllTimeGood={topTenOfAllTimeGood} topTenOfAllTimeEvil={topTenOfAllTimeEvil}/>
      <LBYourTopSpotModal
        previousTopTen={previousTopTen}
        previousGoodElectionWinner={previousGoodElectionWinner}
        previousEvilElectionWinner={previousEvilElectionWinner}
      />
    </div>
  );
}

export default LeaderBoard;
