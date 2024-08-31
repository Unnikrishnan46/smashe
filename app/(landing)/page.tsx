import About from "@/components/custom/About";
import Footer from "@/components/custom/Footer";
import Hero from "@/components/custom/Hero";
import HomeNavbar from "@/components/custom/HomeNavbar";
import Tokenomics from "@/components/custom/Tokenomics";
import VoteSection from "@/components/custom/VoteSection";
import WhitePapper from "@/components/custom/WhitePapper";

export default function Home() {
  return (
    <div className="h-full">
      <HomeNavbar/>
      <Hero/>
      <About/>
      <Tokenomics/>
      <WhitePapper/>
      <VoteSection/>
      <Footer/>
    </div>
  );
}
