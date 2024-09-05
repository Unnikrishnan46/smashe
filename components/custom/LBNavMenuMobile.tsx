import React, { useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { imfell400 } from '@/utils/fonts'
import { LucideLogOut } from 'lucide-react'
import { LBNavigationStore } from '@/store'
import Link from 'next/link'

function LBNavMenuMobile() {
    const {isLBMobileNavModalOpen,setIsLBMobileNavModalOpen} = LBNavigationStore();
    const [activeRoute, setActiveRoute] = useState("/leaderboard");
    const handleCloseChange = ()=>{
        setIsLBMobileNavModalOpen(false)
    }

    const navLinks = [
        { id: 1, routeName: "Leaderboard", route: "/leaderboard" },
        { id: 2, routeName: "Home", route: "/" },
      ];

  return (
    <Dialog open={isLBMobileNavModalOpen} onOpenChange={handleCloseChange} modal={true}>
      <DialogContent
      className='overflow-y-scroll max-sm:'
        style={{
          background: "url(/images/lb-mobile-nav-menu-ripped-paper.png)",
          height: "95vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          border: "none",
        }}
      >
        <div className="p-1 items-center flex flex-col w-full justify-between h-full pb-8">
          <div className="w-full">
            <div className="flex flex-col items-center gap-6 mt-8">
              <h1 className={`text-7xl ${imfell400.className} text-[#502A29]`}>
                Menu
              </h1>
              <img src="/images/menuDivider.png" alt="" />
            </div>
            <div className='flex items-center justify-center gap-4 mt-4'>
                <div>
                    <img className='h-12 w-12 rounded-full border-2 border-[#BCADA5]' src="https://i.pinimg.com/236x/a2/c4/59/a2c45914e3de82adb8721d9d6a8e03b2.jpg" alt="" />
                </div>
                <h1 className='text-[#502A29]'>@jhon</h1>
                <button>
                    <LucideLogOut color='#502A29'/>
                </button>
            </div>
            <div className='mt-8'>
                <div className='flex flex-col gap-4'>
                    
                {navLinks?.map((item, index) => (
                <div
                  key={index}
                  className={`h-14 flex items-center px-4 ${
                    activeRoute === item.route
                      ? "bg-[url(/images/activeMenuBg.png)] bg-no-repeat bg-contain"
                      : ""
                  }`}
                >
                  <Link
                    className={`${imfell400.className} ${
                      activeRoute === item.route
                        ? "text-[#FFD599]"
                        : "text-[#502A29]"
                    } text-lg`}
                    href={item?.route}
                  >
                    {item?.routeName}
                  </Link>
                </div>
              ))}

                </div>
            </div>
          </div>
          <div className="justify-end flex">
            <div className="flex items-center gap-6">
              <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
                <img src="/images/xLogo.png" alt="xLogo" />
              </button>
              <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
                <img src="/images/telegramLogo.png" alt="xLogo" />
              </button>
              <button className="h-12 w-12 rounded-full justify-center items-center flex bg-[#EAE5DA] border-2 border-[#D2BFA1]">
                <img src="/images/eagleLogo.png" alt="xLogo" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LBNavMenuMobile
