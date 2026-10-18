/** Reads the hash route used by static hosting. */
export function getRoute(hash = window.location.hash) { const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean); return { page: parts[0] || "home", id: parts[1] || null }; }
/** Produces safe text for interpolation into static HTML. */
export function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character])); }
