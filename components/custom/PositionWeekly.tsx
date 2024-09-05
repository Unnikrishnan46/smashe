import React, { useEffect, useState } from "react";
import PositionBadge from "./PositionBadge";

function PositionWeekly() {
  const [isWidthBelow640, setIsWidthBelow640] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsWidthBelow640(window.innerWidth < 640);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex items-center">
      <PositionBadge
        avatarImage="https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg"
        avatarImageTop="5"
        name="@jhon"
        position="2nd"
        backgroundImage="/images/Leaderboard-Place1.png"
        voteCount="1234"
        left="37"
        avatarSize="48"
        fontSize="24"
        gap="1"
        top="30%"
        voteFontSize="14"
        contentLeft="30"
        megaPhoneTop="30"
        megaphoneLeft="60"
        megaphoneSize="30"
        backgroundImageMobile="/images/Leaderboard-mobile-Place1.png"
        mobileMarginTop="0"
      />
      <PositionBadge
        avatarImage="https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg"
        avatarImageTop="5"
        name="@jhon"
        position="1st"
        backgroundImage="/images/Leaderboard-Place2.png"
        voteCount="1234"
        left={isWidthBelow640 ? "37" : "67.5" }
        avatarSize={isWidthBelow640 ? "48" :"73"}
        fontSize={isWidthBelow640 ? "24" :"34" }
        gap={isWidthBelow640 ? "1" :"2" }
        top="30%"
        voteFontSize={isWidthBelow640 ? "14" :"24" }
        contentLeft={isWidthBelow640 ? "30" :"55" }
        megaPhoneTop={isWidthBelow640 ? "30" :"45" }
        megaphoneLeft={isWidthBelow640 ? "60" :"120" }
        megaphoneSize="30"
        backgroundImageMobile="/images/Leaderboard-mobile-Place2.png"
        mobileMarginTop={isWidthBelow640 ? "60" :"0" }
      />
      <PositionBadge
        avatarImage="https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg"
        avatarImageTop="5"
        name="@jhon"
        position="3rd"
        backgroundImage="/images/Leaderboard-Place3.png"
        voteCount="1234"
        left="37"
        avatarSize="48"
        fontSize="24"
        gap="1"
        top="30%"
        voteFontSize="14"
        contentLeft="30"
        megaPhoneTop="30"
        megaphoneLeft="60"
        megaphoneSize="30"
        backgroundImageMobile="/images/Leaderboard-mobile-Place1.png"
        mobileMarginTop="0"
      />
    </div>
  );
}

export default PositionWeekly;
