import {create} from 'zustand';


export const navigationMenuStore = create<any>((set:any)=>({
    isNavMenuOpen:false,
    setIsNavMenuOpen: (isOpen: boolean) => set({ isNavMenuOpen: isOpen }),
}));