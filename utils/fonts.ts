import { IM_Fell_DW_Pica, Inter } from "next/font/google";
import localFont from "next/font/local"

const inter = Inter({ subsets: ["latin"] });

// const imfell400 = IM_Fell_DW_Pica({
//   subsets: ["latin"],
//   weight: "400",
//   style: "normal",
// });

const imfell400 = localFont({
  src:[{path:"./../public/fonts/IMFePIrm28P.ttf",weight:"100"}],
  weight: "400",
})

const ringbearer = localFont({
  src:[{path:"./../public/fonts/ringbearer.medium.ttf",weight:"100"}]
})


export {inter,imfell400,ringbearer};