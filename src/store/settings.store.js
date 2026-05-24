/**
 * @module store/settings.store
 */

import { create } from "zustand";
import { loadJSON, saveJSON } from "./persist.js";

const STORAGE_KEY = "ws_settings_v1";

const initial = loadJSON(STORAGE_KEY, {
  difficulty: "easy",
  timeLimitSec: 0,
  highlightFound: true,
});

export const useSettingsStore = create((set, get) => ({
  ...initial,

  setSettings: (partial) => {
    const next = { ...get(), ...partial };
    set(next);
    saveJSON(STORAGE_KEY, {
      difficulty: next.difficulty,
      timeLimitSec: next.timeLimitSec,
      highlightFound: next.highlightFound,
    });
  },
}));
