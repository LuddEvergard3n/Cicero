/** Normalizes text so searches do not depend on accents or letter case. */
function normalizeText(value) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt-BR");
}

/** Checks whether every query word occurs in a searchable field. */
function includesAllWords(text, query) {
  return query.split(/\s+/).every((word) => text.includes(word));
}

/** Returns the editorial relevance bucket for one searchable item. */
function relevance(title, summary, details, query) {
  if (title === query) return 0;
  if (title.startsWith(query)) return 1;
  if (title.includes(query)) return 2;
  if (summary.includes(query)) return 3;
  if (details.includes(query)) return 4;
  if (includesAllWords(title, query)) return 5;
  if (includesAllWords(summary, query)) return 6;
  if (includesAllWords(details, query)) return 7;
  return -1;
}

/** Builds deterministic local search results from published content only. */
export function searchContent(content, query) {
  const queryText = normalizeText(query.trim());
  if (!queryText) return [];
  const results = [];
  let order = 0;
  for (const track of content.tracks) {
    const rank = relevance(
      normalizeText(track.title),
      normalizeText(track.summary),
      normalizeText([track.question, ...track.steps.map((step) => `${step.title} ${step.body}`), ...(track.tables || []).flatMap((table) => [table.title, table.description, table.note, ...table.headers, ...table.rows.flat()])].join(" ")),
      queryText
    );
    if (rank >= 0) results.push({ rank, order, type: "trilha", id: track.id, title: track.title, summary: track.summary });
    order += 1;
  }
  for (const term of content.terms) {
    const rank = relevance(normalizeText(term.name), normalizeText(term.definition), "", queryText);
    if (rank >= 0) results.push({ rank, order, type: "termo", id: term.id, title: term.name, summary: term.definition });
    order += 1;
  }
  return results.sort((a, b) => a.rank - b.rank || a.order - b.order).map(({ rank, order: _, ...result }) => result);
}
