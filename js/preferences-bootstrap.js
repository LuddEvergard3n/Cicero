(() => {
  const allowed = {
    textScale: ["100", "112", "125", "150"],
    spacing: ["standard", "comfortable"],
    headingFont: ["editorial", "sans"],
    theme: ["light", "dark"],
    contrast: ["standard", "high"],
    motion: ["system", "reduced"]
  };
  const defaults = { textScale: "100", spacing: "standard", headingFont: "editorial", linkEmphasis: false, theme: "light", contrast: "standard", motion: "system" };
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem("cicero-accessibility-v1") || "{}"); } catch { saved = {}; }
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) saved = {};
  const root = document.documentElement;
  for (const key of Object.keys(allowed)) root.dataset[key] = allowed[key].includes(saved[key]) ? saved[key] : defaults[key];
  root.dataset.linkEmphasis = String(typeof saved.linkEmphasis === "boolean" ? saved.linkEmphasis : defaults.linkEmphasis);
  root.style.colorScheme = root.dataset.theme;
})();
