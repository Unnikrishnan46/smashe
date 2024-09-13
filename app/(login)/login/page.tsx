"use client";

import { imfell400, ringbearer } from "@/utils/fonts";
import React, { useEffect, useState } from "react";
import {
  TwitterAuthProvider,
  UserCredential,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { app, database } from "@/firebase/firebase.config";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/custom/Loader";
import { get, ref, set } from "firebase/database";
import { getCurrentDayDetails } from "@/utils/currentTime";
import { useGlobalAudioPlayer } from "react-use-audio-player";

const LoginPage = () => {
  const auth = getAuth(app);
  const twitterProvider = new TwitterAuthProvider();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/leaderboard");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const {pause} = useGlobalAudioPlayer();

useEffect(()=>{
  pause();
},[]);

  const setData = async (
    userId: string,
    displayName: string,
    email: string,
    photoUrl: string,
    phoneNumber: string
  ) => {
    try {
      const dbRef = ref(database, "/users/" + userId);
      const snapshot = await get(dbRef);
      const currentDate = getCurrentDayDetails(new Date());
      if (snapshot.exists()) {
        await set(dbRef, {
          userId: userId,
          userName: displayName,
          email: email,
          photoUrl: photoUrl,
          phoneNumber: phoneNumber,
          userCreated: snapshot.val().userCreated,
          lastLogin:`${currentDate.day}/${currentDate.month}/${currentDate.year} , ${currentDate.hours}:${currentDate.minutes}  ${currentDate.ampm}`,
        });
      } else {
        await set(dbRef, {
          userId: userId,
          userName: displayName,
          email: email,
          photoUrl: photoUrl,
          phoneNumber: phoneNumber,
          userCreated: `${currentDate.day}/${currentDate.month}/${currentDate.year} , ${currentDate.hours}:${currentDate.minutes}  ${currentDate.ampm}`,
          lastLogin:`${currentDate.day}/${currentDate.month}/${currentDate.year} , ${currentDate.hours}:${currentDate.minutes}  ${currentDate.ampm}`,
        });
      }
    } catch (error) {
      console.error("Error setting data:", error);
      throw error;
    }
  };

  const loginWithTwitter = async () => {
    try {
      await signInWithPopup(auth, twitterProvider).then(
        async (response: UserCredential) => {
          await setData(
            response.user.uid,
            response.user.displayName!,
            response.user.email!,
            response.user.photoURL!,
            response.user.phoneNumber!
          );
          router.replace("/leaderboard");
        }
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-screen w-screen bg-[url(/images/xLoginBG.png)] bg-center bg-no-repeat bg-cover flex justify-center items-center max-sm:bg-cover">
      <div
        className={`${imfell400.className} flex flex-col justify-center items-center gap-6`}
      >
        <div>
          <h1
            className={`${ringbearer.className} text-[#EAE5DA] tracking-[0.05] text-7xl`}
            style={{
              textShadow: "1px 7px 0px #372400",
              color: "transparent",
              WebkitTextFillColor: "#EAE5DA",
            }}
          >
            $MASHE
          </h1>
        </div>
        <div>
          <p className="text-[#DFDFDF] text-lg">
            Vote on the player each week for prizes.
          </p>
        </div>
        <button
          onClick={loginWithTwitter}
          className="hover:scale-110 transition-transform duration-300"
        >
          <img className="scale-75" src="/images/xLoginButton.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
