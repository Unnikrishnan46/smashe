import { imfell400 } from "@/utils/fonts";
import React from "react";

const NavLinkActiveBG = ({
  children,
  width,
  height,
  isActive,
}: {
  children: React.ReactNode;
  width: string;
  height: string;
  isActive: boolean;
}) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: isActive ? "#502A29" : "transparent",
        clipPath:
          "path('M0 98.5665V4.8C0 3.11984 0 2.27976 0.32698 1.63803C0.614601 1.07354 1.07354 0.614601 1.63803 0.32698C2.27976 0 3.11984 0 4.8 0H142.2C143.88 0 144.72 0 145.362 0.32698C145.926 0.614601 146.385 1.07354 146.673 1.63803C147 2.27976 147 3.10897 147 4.76738V98.5993C147 101.658 147 103.187 146.41 103.982C145.878 104.701 145.14 105.112 144.248 105.186C143.261 105.268 141.898 104.423 139.173 102.733C98.6594 77.6177 47.8524 77.945 7.82795 102.736C5.10125 104.424 3.7379 105.269 2.75113 105.187C1.85964 105.113 1.12194 104.702 0.589429 103.983C0 103.187 0 101.647 0 98.5665Z')",
        
      }}
      className={`${imfell400.className} flex justify-center items-center`}
    >
      {children}
    </div>
  );
};

export default NavLinkActiveBG;


// import * as React from "react"

// const SvgComponent = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={147}
//     height={150}
//     fill="none"
//     style={{ position: "absolute", zIndex: 999, top: 0 }}
//     // {...props}
//   >
//     <path
//       fill="#502A29"
//       d="M0 98.567V4.8c0-1.68 0-2.52.327-3.162A3 3 0 0 1 1.638.327C2.28 0 3.12 0 4.8 0h137.4c1.68 0 2.52 0 3.162.327a3.004 3.004 0 0 1 1.311 1.311c.327.642.327 1.471.327 3.13v93.831c0 3.059 0 4.588-.59 5.383a2.902 2.902 0 0 1-2.162 1.204c-.987.082-2.35-.763-5.075-2.453-40.514-25.115-91.32-24.788-131.345.003-2.727 1.688-4.09 2.533-5.077 2.451a2.903 2.903 0 0 1-2.162-1.204C0 103.187 0 101.647 0 98.567Z"
//     />
//     <text
//       x="50%"      // Center horizontally
//       y="50%"      // Center vertically
//       textAnchor="middle"  // Center text horizontally
//       alignmentBaseline="middle"  // Center text vertically
//       fontSize="16"     // Adjust font size as needed
//       fill="#FFFFFF"    // Text color
//     >
//       Your Text Here
//     </text>
//   </svg>
// )

// export default SvgComponent

