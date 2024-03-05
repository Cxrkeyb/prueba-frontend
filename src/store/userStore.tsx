import { create } from "zustand";

type User = {
  email: string;
  token: string;
  name: string;
  type: number;
};

type Store = {
  user: User | null;
  setUser: (userData: User) => void;
};

const userStore = create<Store>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
}));

export default userStore;
