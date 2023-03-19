import create from "zustand";

const useEtherStore = create((set) => ({
    etherPrice: 0,
    setEtherPrice: (etherPrice) => set({ etherPrice }),
}));

export default useEtherStore;
