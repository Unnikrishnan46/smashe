import { create } from "zustand";
import gsap from "gsap";

const tl = gsap.timeline({ defaults: { ease: "power1" } });

export const navigationMenuStore = create<any>((set: any) => ({
  isNavMenuOpen: false,
  setIsNavMenuOpen: (isOpen: boolean) => set({ isNavMenuOpen: isOpen }),
}));

export const loadingPageStore = create<any>((set: any) => ({
  isLoadingPageDone: false,
  setIsLoadingPageDone: (isDone: boolean) => set({ isLoadingPageDone: isDone }),
}));

export const gsapAnimationStore = create<{
  homePageAnimationTl: gsap.core.Timeline;
  sethomePageAnimationTl: (tl: gsap.core.Timeline) => void;
}>((set) => ({
  homePageAnimationTl: tl,
  sethomePageAnimationTl: (newTl: gsap.core.Timeline) =>
    set({ homePageAnimationTl: newTl }),
}));

export const LBCommentStore = create<any>((set: any) => ({
  isLBCommentsSheetOpen: false,
  isLBCommentsMobileSheetOpen: false,
  setIsLBCommentsSheetOpen: (isDone: boolean) =>
    set({ isLBCommentsSheetOpen: isDone }),
  setIsLBCommentsMobileSheetOpen: (isDone: boolean) =>
    set({ isLBCommentsMobileSheetOpen: isDone }),
}));

export const LBVoteModalStore = create<any>((set: any) => ({
  isLBVoteModalOpen: false,
  isLBVoteSuccessModalOpen: false,
  setIsLBVoteModalOpen: (isOpen: boolean) => set({ isLBVoteModalOpen: isOpen }),
  setIsLBVoteSuccessModalOpen: (isOpen: boolean) =>
    set({ isLBVoteSuccessModalOpen: isOpen }),
}));

export const LBTopTenStore = create<any>((set: any) => ({
  isLBTopTenModalOpen: false,
  setIsLBTopTenModalOpen: (isOpen: boolean) =>
    set({ isLBTopTenModalOpen: isOpen }),
}));

export const LBYourTopSpotStore = create<any>((set: any) => ({
  isLBYourTopSpotModalOpen: false,
  setIsLBYourTopSpotModalOpen: (isOpen: boolean) =>
    set({ isLBYourTopSpotModalOpen: isOpen }),
}));

export const LBNavigationStore = create<any>((set: any) => ({
  isLBMobileNavModalOpen: false,
  setIsLBMobileNavModalOpen: (isOpen: boolean) =>
    set({ isLBMobileNavModalOpen: isOpen }),
}));
