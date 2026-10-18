import { getRoute, escapeHtml } from "./router.js";
import { searchContent } from "./search.js";
import { clearProgress, loadProgress, saveProgress } from "./storage.js";
import { DEFAULT_PREFERENCES, applyPreferences, clearPreferences, loadPreferences, savePreferences } from "./preferences.js?v=41";

const main = document.querySelector("main");
const panel = document.querySelector("#busca");
const input = document.querySelector("#campo-busca");
const output = document.querySelector("#resultados-busca");
const searchButton = document.querySelector("#alternar-busca");
const menuButton = document.querySelector("#alternar-menu");
const headerControls = document.querySelector("#controles-cabecalho");
const accessibilityButton = document.querySelector("#abrir-acessibilidade");
const accessibilityDialog = document.querySelector("#acessibilidade");
const preferencesForm = document.querySelector("#preferencias-acessibilidade");
const status = document.querySelector("#status-aplicacao");
let preferences = applyPreferences(loadPreferences());
let accessibilityTrigger = accessibilityButton;
let content = null;
try {
  const response = await fetch("data/content.json?v=41");
  if (!response.ok) throw new Error();
  content = await response.json();
} catch {
  content = null;
}
let progress = loadProgress();

/** Announces a completed local action without moving keyboard focus. */
function announce(message) {
  status.textContent = "";
  requestAnimationFrame(() => { status.textContent = message; });
}

/** Restores focus to a visible header control after a temporary surface closes. */
function focusHeaderTrigger(preferred) {
  setTimeout(() => {
    if (!preferred.getClientRects().length && menuButton.getClientRects().length) {
      headerControls.classList.add("is-open");
      menuButton.setAttribute("aria-expanded", "true");
    }
    (preferred.getClientRects().length ? preferred : menuButton).focus();
  }, 0);
}

/** Closes the non-modal search panel and optionally restores its trigger. */
function closeSearch(restoreFocus = false) {
  panel.hidden = true;
  searchButton.setAttribute("aria-expanded", "false");
  if (restoreFocus) focusHeaderTrigger(searchButton);
}

/** Closes the responsive navigation and optionally restores its trigger. */
function closeMenu(restoreFocus = false) {
  headerControls.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  if (restoreFocus) menuButton.focus();
}

/** Synchronizes native accessibility controls with the active safe values. */
function syncPreferenceForm() {
  for (const [name, value] of Object.entries(preferences)) {
    if (name === "linkEmphasis") preferencesForm.elements[name].checked = value;
    else preferencesForm.querySelector(`[name="${name}"][value="${value}"]`).checked = true;
  }
}

/** Opens the global accessibility dialog without leaving other header surfaces open. */
function openAccessibility(event) {
  accessibilityTrigger = event?.currentTarget || accessibilityButton;
  closeSearch();
  closeMenu();
  syncPreferenceForm();
  if (!accessibilityDialog.open) accessibilityDialog.showModal();
}

/** Returns the public axis-and-track position without coupling it to the stable track ID. */
function trackNumber(id) {
  const axisIndex = content.axes.findIndex((axis) => axis.tracks.includes(id));
  const trackIndex = content.axes[axisIndex].tracks.indexOf(id);
  return `${String(axisIndex + 1).padStart(2, "0")}.${String(trackIndex + 1).padStart(2, "0")}`;
}

/** Returns the single editorial axis assigned to a track. */
function axisForTrack(id) {
  return content.axes.find((axis) => axis.tracks.includes(id));
}

/** Counts completed tracks inside one editorial axis. */
function axisProgress(axis) {
  return axis.tracks.filter((id) => progress.has(id)).length;
}

/** Renders a glossary link when the referenced term exists. */
function termLink(id) {
  const item = content.terms.find((entry) => entry.id === id);
  return item ? `<a href="#/glossario/${item.id}">${escapeHtml(item.name)}</a>` : "";
}

/** Renders optional editorial tables with accessible captions and source links. */
function trackTables(track) {
  if (!track.tables?.length) return "";
  const tables = track.tables.map((table) => {
    const headers = table.headers.map((header) => `<th scope="col">${escapeHtml(header)}</th>`).join("");
    const rows = table.rows.map((row) => `<tr>${row.map((cell, index) => index === 0
      ? `<th scope="row">${escapeHtml(cell)}</th>`
      : `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("");
    const date = table.effectiveAt
      ? `Data de referência: <time datetime="${escapeHtml(table.effectiveAt)}">${escapeHtml(table.effectiveAt.split("-").reverse().join("/"))}</time>. `
      : "";
    const sources = table.sources.map((id) => content.sources.find((entry) => entry.id === id)).filter(Boolean)
      .map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.organization)}</a>`).join("; ");
    return `<article class="data-table"><div class="table-scroll" tabindex="0" role="region" aria-label="${escapeHtml(table.title)}"><table><caption><strong>${escapeHtml(table.title)}</strong><span>${escapeHtml(table.description)}</span></caption><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div><p class="table-note">${date}${escapeHtml(table.note)}</p><p class="table-sources"><strong>Fontes:</strong> ${sources}.</p></article>`;
  }).join("");
  return `<section class="tables-section"><div class="section-heading"><p class="eyebrow">Quadros de consulta</p><h2>Compare os dados no contexto</h2></div>${tables}</section>`;
}

/** Builds the shared track card with a presentation variant and explicit completion state. */
function trackCard(track, variant = "catalog") {
  const completed = progress.has(track.id);
  return `<article class="track-card track-card--${variant}${completed ? " is-complete" : ""}" data-track="${escapeHtml(track.id)}">
    <div class="track-card__meta"><span class="track-number" aria-hidden="true">${trackNumber(track.id)}</span><span class="track-status">${completed ? "Concluída" : "Trilha prática"}</span></div>
    <h3><a href="#/trilhas/${track.id}">${escapeHtml(track.title)}</a></h3>
    <p>${escapeHtml(track.summary)}</p>
    <a class="text-link" href="#/trilhas/${track.id}">${completed ? "Revisar trilha" : "Abrir trilha"}<span aria-hidden="true"> →</span></a>
  </article>`;
}

/** Builds an axis card from the same editorial index used by the catalog. */
function axisCard(axis) {
  const completed = axisProgress(axis);
  return `<article class="axis-card">
    <p class="eyebrow">${completed} de ${axis.tracks.length} concluídas</p>
    <h3><a href="#/trilhas/${escapeHtml(axis.id)}">${escapeHtml(axis.title)}</a></h3>
    <p>${escapeHtml(axis.summary)}</p>
    <progress value="${completed}" max="${axis.tracks.length}">${completed} de ${axis.tracks.length}</progress>
    <a class="text-link" href="#/trilhas/${escapeHtml(axis.id)}">Explorar eixo<span aria-hidden="true"> →</span></a>
  </article>`;
}

/** Resolves the ordered track objects referenced by an axis. */
function axisTracks(axis) {
  return axis.tracks.map((id) => content.tracks.find((track) => track.id === id)).filter(Boolean);
}

/** Renders the landing page as an editorial introduction followed by the track catalog. */
function home() {
  const completed = content.tracks.filter((track) => progress.has(track.id)).length;
  main.innerHTML = `<section class="hero hero--home">
    <div class="hero__copy"><p class="eyebrow">Um guia para começar</p><h1>Decisões adultas não precisam ser tomadas no escuro.</h1><p class="lead">Entenda dinheiro, trabalho, direitos e o funcionamento do Estado antes de agir.</p><a class="button" href="#/trilhas">Explorar as trilhas</a></div>
    <aside class="field-guide" aria-label="Resumo dos eixos"><div class="field-guide__heading"><p class="eyebrow">Seu ponto de partida</p><strong>${completed} de ${content.tracks.length} concluídas</strong></div><progress value="${completed}" max="${content.tracks.length}">${completed} de ${content.tracks.length}</progress><ol>${content.axes.map((axis, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><a href="#/trilhas/${axis.id}">${escapeHtml(axis.title)}</a></li>`).join("")}</ol></aside>
  </section>
  <section class="how-it-works" aria-labelledby="como-usar"><div class="section-heading"><p class="eyebrow">Como usar</p><h2 id="como-usar">Do problema à próxima ação segura.</h2></div><ol><li><span>1</span><div><strong>Escolha a situação</strong><p>Comece pelo que está acontecendo agora.</p></div></li><li><span>2</span><div><strong>Entenda o essencial</strong><p>Leia sem precisar decorar siglas.</p></div></li><li><span>3</span><div><strong>Confira antes de agir</strong><p>Use o cenário e o checklist como apoio.</p></div></li></ol></section>
  <section class="section tracks-section" aria-labelledby="trilhas-inicio"><div class="section-heading"><p class="eyebrow">Sete pontos de entrada</p><h2 id="trilhas-inicio">Escolha o assunto que mais se aproxima da sua dúvida.</h2><p>Os eixos organizam o catálogo, mas não criam uma ordem obrigatória.</p></div><div class="axis-grid">${content.axes.map(axisCard).join("")}</div></section>
  <aside class="notice"><span class="notice__mark" aria-hidden="true">!</span><div><h2>Antes de decidir</h2><p>Compare informações, registre documentos e procure canais oficiais quando algo envolver risco, conflito ou possível fraude. O Cícero ensina a raciocinar; não decide por você.</p></div></aside>`;
}

/** Renders the complete catalog or one editorial axis. */
function tracks(axisId = null) {
  const selected = axisId ? content.axes.find((axis) => axis.id === axisId) : null;
  if (axisId && !selected) return missing();
  if (selected) {
    const completed = axisProgress(selected);
    main.innerHTML = `<a class="back-link" href="#/trilhas"><span aria-hidden="true">←</span> Todos os eixos</a><section class="page-heading page-heading--catalog"><p class="eyebrow">Eixo · ${completed} de ${selected.tracks.length} concluídas</p><h1>${escapeHtml(selected.title)}</h1><p class="lead">${escapeHtml(selected.summary)}</p><progress value="${completed}" max="${selected.tracks.length}">${completed} de ${selected.tracks.length}</progress></section><section class="track-grid">${axisTracks(selected).map((track) => trackCard(track)).join("")}</section>`;
    return;
  }
  main.innerHTML = `<section class="page-heading page-heading--catalog"><p class="eyebrow">Trilhas</p><h1>Comece pela situação que você vive agora.</h1><p class="lead">As 65 trilhas estão reunidas em sete eixos. Não há ordem obrigatória.</p></section><div class="axis-catalog">${content.axes.map((axis) => `<section class="axis-section" aria-labelledby="eixo-${escapeHtml(axis.id)}"><div class="section-heading"><p class="eyebrow">${axisProgress(axis)} de ${axis.tracks.length} concluídas</p><h2 id="eixo-${escapeHtml(axis.id)}"><a href="#/trilhas/${escapeHtml(axis.id)}">${escapeHtml(axis.title)}</a></h2><p>${escapeHtml(axis.summary)}</p></div><div class="track-grid">${axisTracks(axis).map((track) => trackCard(track)).join("")}</div></section>`).join("")}</div>`;
}

/** Renders one track and wires its scenario and completion controls. */
function track(id) {
  const item = content.tracks.find((entry) => entry.id === id);
  if (!item) return missing();
  const axis = axisForTrack(id);
  const completed = progress.has(id);
  main.innerHTML = `<article class="track" data-track="${escapeHtml(item.id)}">
    <a class="back-link" href="#/trilhas/${escapeHtml(axis.id)}"><span aria-hidden="true">←</span> ${escapeHtml(axis.title)}</a>
    <header class="track-hero"><div class="track-hero__meta"><span class="track-number" aria-hidden="true">${trackNumber(id)}</span><span>${completed ? "Trilha concluída" : escapeHtml(axis.title)}</span></div><h1>${escapeHtml(item.title)}</h1><p class="lead">${escapeHtml(item.question)}</p></header>
    <section class="objectives"><p class="eyebrow">Seu objetivo</p><h2>Ao final, você vai conseguir</h2><ul>${item.objectives.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}</ul></section>
    <section class="steps-section"><div class="section-heading"><p class="eyebrow">Por partes</p><h2>Entenda antes de decidir</h2></div><ol class="steps">${item.steps.map((step, index) => `<li><span class="step-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><div><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.body)}</p></div></li>`).join("")}</ol></section>
    ${trackTables(item)}
    <section class="scenario"><p class="eyebrow">Cenário de decisão</p><h2>${escapeHtml(item.scenario.prompt)}</h2><p class="scenario__instruction">Escolha a alternativa que parece mais segura.</p><div class="options">${item.scenario.options.map((option, index) => `<button type="button" data-answer="${index}" aria-pressed="false"><span aria-hidden="true">${String.fromCharCode(65 + index)}</span>${escapeHtml(option)}</button>`).join("")}</div><p class="answer" hidden aria-live="polite"></p></section>
    <section class="checklist-section"><div class="section-heading"><p class="eyebrow">Leve com você</p><h2>Checklist antes de seguir</h2></div><ul class="checklist">${item.checklist.map((value, index) => `<li><label><input type="checkbox" data-check="${index}"><span>${escapeHtml(value)}</span></label></li>`).join("")}</ul><button id="concluir" class="button${completed ? " button--secondary" : ""}" type="button">${completed ? "Marcar como não concluída" : "Concluir trilha"}</button></section>
    <section class="related-terms"><p class="eyebrow">Para consultar</p><h2>Termos desta trilha</h2><p class="term-links">${item.terms.map(termLink).join("")}</p></section>
    <aside class="notice"><span class="notice__mark" aria-hidden="true">!</span><div><h2>Limite importante</h2><p>Este conteúdo é educativo e geral. Não substitui atendimento jurídico, financeiro, trabalhista, médico, público ou de emergência. Para situações pessoais, use canais competentes e atendimento qualificado.</p></div></aside>
  </article>`;
  document.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-answer]").forEach((option) => {
      option.classList.remove("is-selected");
      option.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-selected");
    button.setAttribute("aria-pressed", "true");
    const answer = main.querySelector(".answer");
    const correct = Number(button.dataset.answer) === item.scenario.correct;
    answer.className = `answer ${correct ? "is-correct" : "is-review"}`;
    answer.textContent = `${correct ? "Boa decisão. " : "Vale rever. "}${item.scenario.explanation}`;
    answer.hidden = false;
  }));
  document.querySelector("#concluir").addEventListener("click", () => {
    const completing = !progress.has(id);
    if (completing) progress.add(id); else progress.delete(id);
    saveProgress(progress);
    render();
    announce(completing ? "Trilha marcada como concluída." : "Conclusão removida.");
  });
}

/** Renders either the glossary index or a selected term with backlinks. */
function glossary(id) {
  const selected = id ? content.terms.find((entry) => entry.id === id) : null;
  const related = selected ? content.tracks.filter((item) => item.terms.includes(selected.id)) : [];
  main.innerHTML = selected
    ? `<article class="definition-page"><a class="back-link" href="#/glossario"><span aria-hidden="true">←</span> Todos os termos</a><p class="eyebrow">Glossário</p><h1>${escapeHtml(selected.name)}</h1><p class="lead">${escapeHtml(selected.definition)}</p><div class="related-panel"><h2>Onde este termo aparece</h2><p>${related.map((item) => `<a href="#/trilhas/${item.id}">${escapeHtml(item.title)}</a>`).join("")}</p></div></article>`
    : `<section class="page-heading"><p class="eyebrow">Glossário</p><h1>Termos para decidir melhor.</h1><p class="lead">Definições curtas para que siglas e contratos não virem uma barreira.</p></section><dl class="glossary">${content.terms.map((item, index) => `<div><span aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><dt><a href="#/glossario/${item.id}">${escapeHtml(item.name)}</a></dt><dd>${escapeHtml(item.definition)}</dd></div>`).join("")}</dl>`;
}

/** Renders the approved institutional bibliography and editorial boundary. */
function sources() {
  main.innerHTML = `<section class="page-heading"><p class="eyebrow">Fontes</p><h1>Informação confiável começa pela origem.</h1><p class="lead">Regras e serviços podem mudar. Confirme dados atuais no órgão responsável antes de agir.</p></section><section class="source-list">${content.sources.map((item, index) => `<article><span class="source-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><div><h2><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(item.organization)}</p></div></article>`).join("")}</section><aside class="notice"><span class="notice__mark" aria-hidden="true">i</span><div><h2>Política editorial</h2><p>O conteúdo separa educação geral de orientação individual. Não indica produtos, cursos, instituições, benefícios, tratamentos ou soluções para casos particulares e não recebe relatos ou documentos. Revisão geral: 18/10/2026.</p></div></aside>`;
}

/** Renders product scope, privacy summary and local progress removal. */
function about() {
  main.innerHTML = `<section class="page-heading"><p class="eyebrow">Sobre o Cícero</p><h1>Autonomia começa por entender as escolhas.</h1><p class="lead">Uma introdução prática para lidar com dinheiro, trabalho, consumo, saúde, direitos e instituições públicas sem transformar dúvida em decisão apressada.</p></section><section class="two-columns"><article><span class="panel-number" aria-hidden="true">01</span><h2>O que é</h2><p>Educação geral, curta e conectada a situações reais.</p></article><article><span class="panel-number" aria-hidden="true">02</span><h2>O que não é</h2><p>Não é consultoria, atendimento médico, serviço de emergência, órgão público, escritório jurídico ou orientação política.</p></article></section><section class="data-panel"><p class="eyebrow">Privacidade por padrão</p><h2>Seus dados ficam com você.</h2><p>Não há cadastro, formulário, recebimento de relatos ou analytics. As trilhas concluídas ficam apenas neste navegador.</p><button id="apagar-progresso" type="button">Apagar meu progresso local</button></section>`;
  document.querySelector("#apagar-progresso").addEventListener("click", () => {
    clearProgress();
    progress = new Set();
    render();
    announce("Progresso local apagado.");
  });
}

/** Renders product help independently from the editorial JSON. */
function help() {
  main.innerHTML = `<section class="page-heading"><p class="eyebrow">Ajuda</p><h1>Use o Cícero do seu jeito.</h1><p class="lead">Encontre uma situação, ajuste a leitura e entenda o que fica salvo neste dispositivo.</p><button id="abrir-acessibilidade-ajuda" class="button" type="button">Abrir acessibilidade</button></section>
  <div class="help-grid">
    <section><h2>Começar e pesquisar</h2><p>Escolha um dos sete eixos ou use Buscar. Cada trilha reúne explicação, cenário, checklist, termos e fontes. Não existe ordem obrigatória.</p><p>Em telas menores, use Menu para acessar todas as áreas do site.</p></section>
    <section><h2>Cenários e progresso</h2><p>As alternativas mostram uma explicação educativa; não há nota. O checklist dura somente enquanto a página estiver aberta. Apenas a conclusão da trilha fica salva neste navegador.</p></section>
    <section><h2>Teclado, toque e zoom</h2><p>Use Tab e Shift+Tab para percorrer controles, Enter ou Espaço para ativá-los e Escape para fechar menu, busca ou acessibilidade. No navegador, o zoom pode ser combinado aos ajustes de texto do Cícero.</p></section>
    <section><h2>Acessibilidade</h2><p>O painel permite ampliar o texto, aumentar o espaçamento, trocar a fonte dos títulos, reforçar links, usar tema escuro, elevar o contraste e reduzir movimento.</p><p>Leitores de tela e recursos de leitura pertencem ao sistema ou navegador e continuam funcionando com o conteúdo semântico do Cícero.</p></section>
    <section><h2>Instalação e uso sem rede</h2><p>Quando disponível, use a opção Instalar ou Adicionar à tela inicial do navegador. Depois da primeira visita on-line, o conteúdo essencial pode ser aberto novamente sem conexão.</p></section>
    <section><h2>Privacidade e limpeza</h2><p>Não há conta, analytics ou envio de dados. Progresso e preferências ficam somente neste navegador. Restaurar acessibilidade não apaga o progresso; apagar o progresso em <a href="#/sobre">Sobre</a> não altera a acessibilidade.</p></section>
    <section><h2>Se algo não funcionar</h2><p>Recarregue a página, confirme que JavaScript e armazenamento local estão permitidos e faça a primeira visita com conexão. Em arquivo <code>file://</code>, busca, conteúdo e modo offline podem falhar; use um servidor HTTP.</p></section>
    <section><h2>Limites e atendimento</h2><p>O Cícero não recebe relatos, documentos ou pedidos de atendimento. Não substitui serviços jurídicos, financeiros, trabalhistas, médicos, públicos ou de emergência. Consulte as <a href="#/fontes">fontes</a> e os limites de cada trilha.</p></section>
  </div>`;
  document.querySelector("#abrir-acessibilidade-ajuda").addEventListener("click", openAccessibility);
}

/** Renders a recoverable state when the editorial JSON is unavailable. */
function loadFailure() {
  searchButton.disabled = true;
  main.innerHTML = `<section class="missing-page" role="alert"><p class="missing-page__number" aria-hidden="true">!</p><div><p class="eyebrow">Conteúdo indisponível</p><h1>Não foi possível carregar o Cícero.</h1><p>Verifique sua conexão ou tente novamente. Nenhum dado local foi apagado.</p><button id="tentar-novamente" class="button" type="button">Tentar novamente</button></div></section>`;
  document.querySelector("#tentar-novamente").addEventListener("click", () => window.location.reload());
  main.focus({ preventScroll: true });
}

/** Renders a recoverable not-found state for unknown hash routes. */
function missing() {
  main.innerHTML = `<section class="missing-page"><p class="missing-page__number" aria-hidden="true">404</p><div><p class="eyebrow">Página não encontrada</p><h1>Esse caminho não existe.</h1><p>Volte ao começo e escolha uma das situações disponíveis.</p><a class="button" href="#/">Voltar ao início</a></div></section>`;
}

/** Synchronizes the current route with the navigation and paints the selected page. */
function render() {
  const route = getRoute();
  closeSearch();
  closeMenu();
  document.querySelectorAll("nav [data-route]").forEach((link) => {
    if (link.dataset.route === route.page) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (route.page === "ajuda") help();
  else if (route.page === "sobre") about();
  else if (!content && ["home", "trilhas", "glossario", "fontes"].includes(route.page)) loadFailure();
  else if (route.page === "home") home();
  else if (route.page === "trilhas" && route.id && content.tracks.some((item) => item.id === route.id)) track(route.id);
  else if (route.page === "trilhas" && route.id) tracks(route.id);
  else if (route.page === "trilhas") tracks();
  else if (route.page === "glossario") glossary(route.id);
  else if (route.page === "fontes") sources();
  else missing();
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
menuButton.addEventListener("click", () => {
  const opening = !headerControls.classList.contains("is-open");
  closeSearch();
  if (accessibilityDialog.open) accessibilityDialog.close();
  headerControls.classList.toggle("is-open", opening);
  menuButton.setAttribute("aria-expanded", String(opening));
});
document.querySelectorAll("#controles-cabecalho a").forEach((link) => link.addEventListener("click", () => closeMenu()));
searchButton.addEventListener("click", () => {
  if (!content) return;
  const opening = panel.hidden;
  closeMenu();
  if (accessibilityDialog.open) accessibilityDialog.close();
  panel.hidden = !opening;
  searchButton.setAttribute("aria-expanded", String(opening));
  if (opening) input.focus();
});
accessibilityButton.addEventListener("click", openAccessibility);
document.querySelector("#fechar-acessibilidade").addEventListener("click", () => accessibilityDialog.close());
accessibilityDialog.addEventListener("close", () => {
  const target = accessibilityTrigger?.isConnected ? accessibilityTrigger : accessibilityButton;
  if (target === accessibilityButton) focusHeaderTrigger(target);
  else target.focus();
});
preferencesForm.addEventListener("change", () => {
  const data = new FormData(preferencesForm);
  preferences = applyPreferences({
    textScale: data.get("textScale"),
    spacing: data.get("spacing"),
    headingFont: data.get("headingFont"),
    linkEmphasis: data.get("linkEmphasis") === "on",
    theme: data.get("theme"),
    contrast: data.get("contrast"),
    motion: data.get("motion")
  });
  savePreferences(preferences);
  announce("Preferências de acessibilidade atualizadas.");
});
preferencesForm.addEventListener("submit", (event) => { event.preventDefault(); accessibilityDialog.close(); announce("Preferências de acessibilidade aplicadas."); });
document.querySelector("#restaurar-acessibilidade").addEventListener("click", () => {
  clearPreferences();
  preferences = applyPreferences(DEFAULT_PREFERENCES);
  syncPreferenceForm();
  announce("Preferências de acessibilidade restauradas.");
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || accessibilityDialog.open) return;
  if (!panel.hidden) closeSearch(true);
  else if (headerControls.classList.contains("is-open")) closeMenu(true);
});
if (content) {
  input.addEventListener("input", () => {
    const results = searchContent(content, input.value);
    output.innerHTML = results.length
      ? `<ul>${results.map((item) => `<li><a href="#/${item.type === "trilha" ? "trilhas" : "glossario"}/${item.id}">${escapeHtml(item.title)}</a><span>${escapeHtml(item.summary)}</span></li>`).join("")}</ul>`
      : input.value.trim() ? "<p>Nenhum conteúdo encontrado.</p>" : "";
  });
  document.querySelector("#limpar-busca").addEventListener("click", () => {
    input.value = "";
    output.textContent = "";
    input.focus();
  });
} else searchButton.disabled = true;
window.addEventListener("hashchange", render);
render();
