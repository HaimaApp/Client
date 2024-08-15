import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FirstState {
  isAppFirstLaunched: boolean;
  useraccount: any | null;
  token: string | null;
  refreshToken: string | null;
}

// Define types for your actions
interface FirstActions {
  setIsAppFirstLaunched: (user: boolean) => void;
  setUseraccount: (user: any | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  removeFirstUser: () => void;
}

// Combine state and actions into a single type
type firstStore = FirstState & FirstActions;

const useFirstStore = create<firstStore>(
  persist(
    (set) => ({
      isAppFirstLaunched: false,
      useraccount: null,
      token: null,
      refreshToken: null,
      setIsAppFirstLaunched: (user: boolean) =>
        set({ isAppFirstLaunched: user }),
      setUseraccount: (user: any | null) => set({ useraccount: user }),
      setToken: (token: string | null) => set({ token: token }),
      setRefreshToken: (token: string | null) => set({ refreshToken: token }),
      removeFirstUser: () => {
        set({
          isAppFirstLaunched: false,
          useraccount: null,
          token: null,
          refreshToken: null,
        });
        AsyncStorage.removeItem("haimaglobalstore");
      },
    }),
    {
      name: "haimaglobalstore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  ) as any
);

export default useFirstStore;
