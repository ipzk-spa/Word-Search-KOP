import { useSettingsStore } from "../store/settings.store.js";

export function useSettings() {
  const difficulty = useSettingsStore((s) => s.difficulty);
  const timeLimitSec = useSettingsStore((s) => s.timeLimitSec);
  const highlightFound = useSettingsStore((s) => s.highlightFound);
  const setSettings = useSettingsStore((s) => s.setSettings);

  return { difficulty, timeLimitSec, highlightFound, setSettings };
}
