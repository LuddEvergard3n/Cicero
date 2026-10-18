const KEY = "cicero-progress-v1";
/** Returns completed track IDs stored only in this browser. */
export function loadProgress(storage = localStorage) { try { const value = JSON.parse(storage.getItem(KEY) || "[]"); return new Set(Array.isArray(value) ? value : []); } catch { return new Set(); } }
/** Saves completed track IDs in this browser. */
export function saveProgress(progress, storage = localStorage) { storage.setItem(KEY, JSON.stringify([...progress])); }
/** Removes all Cícero progress stored in this browser. */
export function clearProgress(storage = localStorage) { storage.removeItem(KEY); }
