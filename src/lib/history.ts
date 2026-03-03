import type { PredictionInput, PredictionResult } from "./predictions";

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: PredictionInput;
  result: PredictionResult;
}

const STORAGE_KEY = "greencode_history";

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(input: PredictionInput, result: PredictionResult): HistoryEntry {
  const entry: HistoryEntry = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    input,
    result,
  };
  const history = getHistory();
  history.unshift(entry);
  // Keep last 20
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 20)));
  return entry;
}

export function deleteFromHistory(id: string) {
  const history = getHistory().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
