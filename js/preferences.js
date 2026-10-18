const KEY = "cicero-accessibility-v1";

export const DEFAULT_PREFERENCES = Object.freeze({
  textScale: "100",
  spacing: "standard",
  headingFont: "editorial",
  linkEmphasis: false,
  theme: "light",
  contrast: "standard",
  motion: "system"
});

const ALLOWED = Object.freeze({
  textScale: new Set(["100", "112", "125", "150"]),
  spacing: new Set(["standard", "comfortable"]),
  headingFont: new Set(["editorial", "sans"]),
  theme: new Set(["light", "dark"]),
  contrast: new Set(["standard", "high"]),
  motion: new Set(["system", "reduced"])
});

/** Returns a complete, safe preference object from untrusted local data. */
export function validatePreferences(value) {
  const input = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return {
    textScale: ALLOWED.textScale.has(input.textScale) ? input.textScale : DEFAULT_PREFERENCES.textScale,
    spacing: ALLOWED.spacing.has(input.spacing) ? input.spacing : DEFAULT_PREFERENCES.spacing,
    headingFont: ALLOWED.headingFont.has(input.headingFont) ? input.headingFont : DEFAULT_PREFERENCES.headingFont,
    linkEmphasis: typeof input.linkEmphasis === "boolean" ? input.linkEmphasis : DEFAULT_PREFERENCES.linkEmphasis,
    theme: ALLOWED.theme.has(input.theme) ? input.theme : DEFAULT_PREFERENCES.theme,
    contrast: ALLOWED.contrast.has(input.contrast) ? input.contrast : DEFAULT_PREFERENCES.contrast,
    motion: ALLOWED.motion.has(input.motion) ? input.motion : DEFAULT_PREFERENCES.motion
  };
}

/** Reads accessibility preferences without failing when browser storage is unavailable. */
export function loadPreferences(storage = localStorage) {
  try { return validatePreferences(JSON.parse(storage.getItem(KEY) || "{}")); }
  catch { return { ...DEFAULT_PREFERENCES }; }
}

/** Persists validated preferences and reports whether storage accepted the write. */
export function savePreferences(preferences, storage = localStorage) {
  try { storage.setItem(KEY, JSON.stringify(validatePreferences(preferences))); return true; }
  catch { return false; }
}

/** Removes only accessibility preferences, preserving learning progress. */
export function clearPreferences(storage = localStorage) {
  try { storage.removeItem(KEY); return true; }
  catch { return false; }
}

/** Reflects validated preferences as CSS-facing attributes on the document root. */
export function applyPreferences(preferences, root = document.documentElement) {
  const safe = validatePreferences(preferences);
  root.dataset.textScale = safe.textScale;
  root.dataset.spacing = safe.spacing;
  root.dataset.headingFont = safe.headingFont;
  root.dataset.linkEmphasis = String(safe.linkEmphasis);
  root.dataset.theme = safe.theme;
  root.dataset.contrast = safe.contrast;
  root.dataset.motion = safe.motion;
  root.style.colorScheme = safe.theme;
  return safe;
}
