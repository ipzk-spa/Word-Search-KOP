import { create } from "zustand";
import { loadJSON, saveJSON } from "./persist.js";

const STORAGE_KEY = "ws_user_v1";

const initial = loadJSON(STORAGE_KEY, {
  userId: "guest",
  nickname: "",
});

export const useUserStore = create((set) => ({
  userId: initial.userId,
  nickname: initial.nickname,

  setUser: ({ userId, nickname }) => {
    const next = { userId, nickname: nickname ?? "" };
    set(next);
    saveJSON(STORAGE_KEY, next);
  },

  clearUser: () => {
    const next = { userId: "guest", nickname: "" };
    set(next);
    saveJSON(STORAGE_KEY, next);
  },
}));
