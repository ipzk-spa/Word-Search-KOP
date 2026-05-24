/**
 * @module store/results.store
 */

import { create } from "zustand";
import { loadJSON, saveJSON } from "./persist.js";

const STORAGE_KEY = "ws_results_v1";

const initial = loadJSON(STORAGE_KEY, { entries: [] });

export const useResultsStore = create((set, get) => ({
  entries: initial.entries,

  addEntry: (entry) => {
    const next = [entry, ...get().entries].slice(0, 200);
    set({ entries: next });
    saveJSON(STORAGE_KEY, { entries: next });
  },

  clear: () => {
    set({ entries: [] });
    saveJSON(STORAGE_KEY, { entries: [] });
  },
}));
