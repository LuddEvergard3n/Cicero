import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { searchContent } from "../js/search.js";
import { clearProgress, loadProgress, saveProgress } from "../js/storage.js";
import { DEFAULT_PREFERENCES, applyPreferences, clearPreferences, loadPreferences, savePreferences, validatePreferences } from "../js/preferences.js";
const root = new URL("..", import.meta.url);
const content = JSON.parse(readFileSync(new URL("data/content.json", root), "utf8"));
const indexHtml = readFileSync(new URL("index.html", root), "utf8");
const styles = readFileSync(new URL("css/styles.css", root), "utf8");
const app = readFileSync(new URL("js/app.js", root), "utf8");
const preferencesSource = readFileSync(new URL("js/preferences.js", root), "utf8");
const preferenceBootstrap = readFileSync(new URL("js/preferences-bootstrap.js", root), "utf8");
const serviceWorker = readFileSync(new URL("sw.js", root), "utf8");
const packageJson = JSON.parse(readFileSync(new URL("package.json", root), "utf8"));
const manifest = JSON.parse(readFileSync(new URL("manifest.json", root), "utf8"));
const required = [
  "index.html", "sw.js", "manifest.json", "css/styles.css", "data/content.json",
  "js/app.js", "js/router.js", "js/search.js", "js/storage.js", "js/preferences.js", "js/preferences-bootstrap.js",
  "icons/favicon.svg", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png",
  "docs/README.md", "docs/architecture.md", "docs/content-model.md",
  "docs/editorial-policy.md", "docs/accessibility.md", "docs/privacy-security.md",
  "docs/testing.md", "docs/deployment.md", "docs/roadmap.md", "docs/design-system.md", "docs/releases.md", "docs/content-audit.md", "docs/risk-audit.md", "docs/compatibility.md"
];
const trackIds = new Set(), axisIds = new Set(), termIds = new Set(content.terms.map((item) => item.id)), sourceIds = new Set(content.sources.map((item) => item.id));
for (const file of required) assert.ok(existsSync(new URL(file, root)), `Arquivo obrigatório ausente: ${file}`);
assert.equal(packageJson.version, "4.0.0", "Versão do pacote deve acompanhar a entrega técnica");
assert.equal(content.reviewedAt, "2026-10-18", "Entrega técnica não deve alterar a data da revisão editorial");
assert.equal(manifest.id, "./");
assert.equal(manifest.scope, "./");
assert.equal(manifest.lang, "pt-BR");
assert.equal(manifest.orientation, "any");
assert.ok(manifest.icons.some((icon) => icon.sizes === "192x192" && icon.purpose === "any"), "Manifesto deve possuir ícone de 192 pixels");
assert.ok(manifest.icons.some((icon) => icon.sizes === "512x512" && icon.purpose === "any"), "Manifesto deve possuir ícone de 512 pixels");
assert.ok(manifest.icons.some((icon) => icon.sizes === "512x512" && icon.purpose === "maskable"), "Manifesto deve possuir ícone maskable");
for (const icon of manifest.icons) {
  const png = readFileSync(new URL(icon.src, root));
  assert.equal(png.toString("ascii", 1, 4), "PNG", `Ícone deve ser PNG: ${icon.src}`);
  const [width, height] = [png.readUInt32BE(16), png.readUInt32BE(20)];
  assert.equal(`${width}x${height}`, icon.sizes, `Dimensão incorreta: ${icon.src}`);
}
assert.equal(content.axes.length, 7, "A versão 3.11 deve conter sete eixos"); assert.equal(content.tracks.length, 65, "A versão 3.11 deve conter 65 trilhas"); assert.equal(content.terms.length, 306, "A versão 3.11 deve conter 306 termos"); assert.equal(content.sources.length, 167, "A versão 3.11 deve conter 167 fontes"); assert.equal(termIds.size, content.terms.length, "IDs de termos devem ser únicos"); assert.equal(sourceIds.size, content.sources.length, "IDs de fontes devem ser únicos");
const tableIds = new Set();
for (const track of content.tracks) {
  assert.ok(!trackIds.has(track.id), `ID repetido: ${track.id}`); trackIds.add(track.id);
  assert.ok(track.title && track.question && track.steps.length >= 3 && track.checklist.length >= 3, `Trilha incompleta: ${track.id}`);
  assert.ok(track.scenario.options.length >= 3 && Number.isInteger(track.scenario.correct) && track.scenario.correct >= 0 && track.scenario.correct < track.scenario.options.length, `Cenário inválido: ${track.id}`);
  for (const id of track.terms) assert.ok(termIds.has(id), `Termo ausente: ${id}`);
  for (const id of track.sources) assert.ok(sourceIds.has(id), `Fonte ausente: ${id}`);
  for (const table of track.tables || []) {
    assert.ok(table.id && !tableIds.has(table.id), `ID de tabela repetido: ${table.id}`); tableIds.add(table.id);
    assert.ok(table.title && table.description && table.note && table.headers.length, `Tabela incompleta: ${table.id}`);
    assert.ok(table.headers.every(Boolean), `Cabeçalho vazio: ${table.id}`);
    assert.ok(table.rows.length && table.rows.every((row) => row.length === table.headers.length), `Linha inconsistente: ${table.id}`);
    for (const id of table.sources) assert.ok(sourceIds.has(id), `Fonte de tabela ausente: ${id}`);
    if (table.effectiveAt) assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(table.effectiveAt) && table.effectiveAt <= content.reviewedAt, `Data efetiva inválida: ${table.id}`);
  }
}
const assignedTracks = [];
for (const axis of content.axes) {
  assert.ok(axis.id && axis.title && axis.summary && axis.tracks.length, `Eixo incompleto: ${axis.id || "sem ID"}`);
  assert.ok(!axisIds.has(axis.id), `ID de eixo repetido: ${axis.id}`); axisIds.add(axis.id);
  assert.ok(!trackIds.has(axis.id), `ID compartilhado por eixo e trilha: ${axis.id}`);
  assert.equal(new Set(axis.tracks).size, axis.tracks.length, `Trilha repetida dentro do eixo: ${axis.id}`);
  for (const id of axis.tracks) { assert.ok(trackIds.has(id), `Trilha ausente no eixo ${axis.id}: ${id}`); assignedTracks.push(id); }
}
assert.equal(assignedTracks.length, content.tracks.length, "Cada trilha deve pertencer a um único eixo");
assert.equal(new Set(assignedTracks).size, content.tracks.length, "Uma trilha não pode pertencer a mais de um eixo");
for (const id of trackIds) assert.ok(assignedTracks.includes(id), `Trilha sem eixo: ${id}`);
const expectedAxisOrder = {
  "dinheiro-consumo": ["primeiro-salario", "contracheque", "orcamento", "reserva-emergencia", "metas-planejamento-financeiro", "banco-pix", "credito", "juros-selic", "dividas-renegociacao", "financiamento-consorcio", "compra-consciente", "contratos-assinaturas", "seguros-protecao", "previdencia-futuro", "investimentos-basicos", "impostos-cotidiano", "inflacao-poder-compra", "cambio"],
  "trabalho-educacao": ["escolha-curso-instituicao", "matricula-bolsas-financiamento-estudantil", "processos-seletivos-transicao-profissional", "entrada-trabalho", "direitos-no-trabalho", "renda-autonoma-mei", "atividade-economica-trabalho"],
  "moradia-servicos": ["aluguel-moradia", "servicos-essenciais-moradia", "reparos-manutencao-casa", "servicos-publicos-atendimento", "reclamacao-consumidor"],
  "direitos-saude-protecao": ["documentos-govbr", "direitos-digitais", "cuidados-basicos-internet", "golpes-resposta", "saude-sus", "planos-saude", "assistencia-social-beneficios", "ajuda-resolucao-conflitos", "protecao-emergencia-denuncia"],
  "estado-politica": ["constituicao-federal", "federacao-competencias", "poderes-processo-legislativo", "justica-controle-instituicoes", "eleicoes-representacao", "orcamento-publico", "politicas-economicas", "politicas-publicas", "participacao-transparencia-fiscalizacao"],
  "brasil-mundo": ["comercio-cadeias-globais", "energia-recursos-estrategicos", "moedas-sistema-internacional", "blocos-organizacoes-internacionais", "migracao-refugio-deslocamento", "clima-cooperacao-internacional", "tecnologia-poder-internacional", "sancoes-economicas", "brasil-relacoes-internacionais"],
  "informacao-decisao": ["evidencia-qualidade-fontes", "estatistica-cotidiano", "graficos-pesquisas", "correlacao-causalidade-incerteza", "argumentos-falacias-vieses", "propaganda-persuasao", "desinformacao-verificacao", "decisao-informacao-incompleta"]
};
for (const axis of content.axes) assert.deepEqual(axis.tracks, expectedAxisOrder[axis.id], `Ordem pedagógica incorreta: ${axis.id}`);
assert.ok(searchContent(content,"CET").some((item) => item.id === "cet"), "Busca deve encontrar CET"); assert.ok(searchContent(content,"Pix").some((item) => item.id === "banco-pix"), "Busca deve encontrar trilha Pix"); assert.ok(searchContent(content,"renegociação").some((item) => item.id === "dividas-renegociacao"), "Busca deve encontrar a trilha de renegociação"); assert.ok(searchContent(content,"saldo devedor").some((item) => item.id === "saldo-devedor"), "Busca deve encontrar saldo devedor"); assert.ok(searchContent(content,"aluguel").some((item) => item.id === "aluguel-moradia"), "Busca deve encontrar a trilha de aluguel"); assert.ok(searchContent(content,"vistoria").some((item) => item.id === "vistoria"), "Busca deve encontrar o termo vistoria");
assert.equal(searchContent(content, "caucao")[0]?.id, "caucao", "Busca deve ignorar acentos e priorizar título exato");
assert.equal(searchContent(content, "locacao")[0]?.id, "locacao", "Busca deve encontrar locação sem acento");
assert.equal(searchContent(content, "inflacao")[0]?.id, "inflacao", "Busca deve encontrar inflação sem acento");
assert.equal(searchContent(content, "diversificacao")[0]?.id, "diversificacao", "Busca deve encontrar diversificação sem acento");
assert.equal(searchContent(content, "contrato")[0]?.id, "contrato", "Título exato deve vir antes de ocorrência em outro conteúdo");
assert.equal(searchContent(content, "verificacao em duas etapas")[0]?.id, "verificacao-duas-etapas", "Busca deve encontrar verificação em duas etapas sem acento");
assert.ok(searchContent(content, "gov.br").some((item) => item.id === "documentos-govbr"), "Busca deve encontrar a trilha da conta gov.br");
assert.equal(searchContent(content, "admissao")[0]?.id, "admissao", "Busca deve encontrar admissão sem acento");
assert.ok(searchContent(content, "vaga").some((item) => item.id === "entrada-trabalho"), "Busca deve encontrar a trilha de entrada no trabalho");
assert.equal(searchContent(content, "dado pessoal")[0]?.id, "dado-pessoal", "Busca deve priorizar o termo dado pessoal");
assert.ok(searchContent(content, "controlador").some((item) => item.id === "direitos-digitais"), "Busca deve encontrar a trilha de direitos digitais");
assert.equal(searchContent(content, "servico publico")[0]?.id, "servico-publico", "Busca sem acento deve priorizar o termo com título exato");
assert.ok(searchContent(content, "ouvidoria").some((item) => item.id === "servicos-publicos-atendimento"), "Busca deve encontrar a trilha de serviços públicos");
assert.equal(searchContent(content, "reserva de emergencia")[0]?.id, "reserva-emergencia", "Busca deve priorizar a trilha de reserva de emergência sem acento");
assert.equal(searchContent(content, "meta financeira")[0]?.id, "meta-financeira", "Busca deve priorizar o termo meta financeira");
assert.equal(searchContent(content, "franquia seguro")[0]?.id, "franquia-seguro", "Busca deve encontrar franquia de seguro");
assert.equal(searchContent(content, "previdencia complementar")[0]?.id, "previdencia-complementar", "Busca deve encontrar previdência complementar sem acento");
assert.equal(searchContent(content, "fluxo de caixa")[0]?.id, "fluxo-de-caixa", "Busca deve encontrar fluxo de caixa");
assert.equal(searchContent(content, "contemplacao")[0]?.id, "contemplacao", "Busca deve encontrar contemplação sem acento");
assert.equal(searchContent(content, "juros compostos")[0]?.id, "juros-compostos", "Busca deve encontrar juros compostos");
assert.equal(searchContent(content, "cambio")[0]?.id, "cambio", "Busca deve encontrar câmbio sem acento");
assert.equal(searchContent(content, "produto interno bruto")[0]?.id, "pib", "Busca deve encontrar PIB pela definição expandida");
assert.equal(searchContent(content, "politica monetaria")[0]?.id, "politica-monetaria", "Busca deve encontrar política monetária sem acento");
assert.ok(searchContent(content, "reclamacao consumidor").some((item) => item.id === "reclamacao-consumidor"), "Busca deve encontrar reclamação de consumo");
assert.ok(searchContent(content, "direitos trabalho").some((item) => item.id === "direitos-no-trabalho"), "Busca deve encontrar direitos no trabalho");
assert.equal(searchContent(content, "boletim ocorrencia")[0]?.id, "boletim-de-ocorrencia", "Busca deve encontrar boletim de ocorrência");
assert.equal(searchContent(content, "atencao primaria")[0]?.id, "atencao-primaria", "Busca deve encontrar atenção primária");
assert.ok(searchContent(content, "plano saude").some((item) => item.id === "planos-saude"), "Busca deve encontrar planos de saúde");
assert.equal(searchContent(content, "defensoria publica")[0]?.id, "defensoria-publica", "Busca deve encontrar Defensoria Pública");
assert.equal(searchContent(content, "conselho tutelar")[0]?.id, "conselho-tutelar", "Busca deve encontrar Conselho Tutelar");
assert.equal(searchContent(content, "constituicao federal")[0]?.id, "constituicao-federal", "Busca deve encontrar Constituição Federal");
assert.equal(searchContent(content, "emenda constitucional")[0]?.id, "emenda-constitucional", "Busca deve encontrar emenda constitucional");
assert.ok(searchContent(content, "competencia municipio").some((item) => item.id === "federacao-competencias"), "Busca deve encontrar competências municipais");
assert.equal(searchContent(content, "processo legislativo")[0]?.id, "processo-legislativo", "Busca deve encontrar processo legislativo");
assert.equal(searchContent(content, "tribunal de contas")[0]?.id, "tribunal-de-contas", "Busca deve encontrar tribunal de contas");
assert.equal(searchContent(content, "sistema proporcional")[0]?.id, "sistema-proporcional", "Busca deve encontrar sistema proporcional");
assert.ok(searchContent(content, "PPA LDO LOA").some((item) => item.id === "orcamento-publico"), "Busca deve encontrar as leis orçamentárias");
assert.equal(searchContent(content, "politica publica")[0]?.id, "politica-publica", "Busca deve encontrar política pública");
assert.equal(searchContent(content, "acesso informacao")[0]?.id, "acesso-a-informacao", "Busca deve encontrar acesso à informação");
assert.ok(searchContent(content, "aliquota ICMS").some((item) => item.id === "impostos-cotidiano"), "Busca deve indexar tabelas editoriais");
assert.deepEqual(searchContent(content, ""), [], "Busca vazia não deve retornar conteúdo");
assert.deepEqual(searchContent(content, "conteudo-inexistente"), [], "Busca sem correspondência deve retornar vazio");
const institutionalHosts = new Set(["www.cnj.jus.br", "www.camara.leg.br", "www2.camara.leg.br", "www25.senado.leg.br", "www.tse.jus.br", "comsefaz.org.br", "www.wto.org", "www.imf.org", "www.iea.org", "www.un.org", "main.un.org", "unfccc.int", "help.unhcr.org", "openstax.org", "www.unesco.org", "unesdoc.unesco.org", "iris.who.int", "cdn.who.int", "www.cdc.gov", "www.oecd.org", "www.nist.gov", "airc.nist.gov", "cartilha.cert.br"]);
for (const source of content.sources) { const url = new URL(source.url); assert.equal(url.protocol, "https:", `Fonte sem HTTPS: ${source.id}`); assert.ok(url.hostname === "gov.br" || url.hostname.endsWith(".gov.br") || institutionalHosts.has(url.hostname), `Domínio não aprovado: ${source.id}`); }
const store = new Map(), storage = { getItem: (key) => store.get(key) || null, setItem: (key,value) => store.set(key,value), removeItem: (key) => store.delete(key) };
saveProgress(new Set(["credito"]), storage);
assert.deepEqual([...loadProgress(storage)],["credito"]);
const chosenPreferences = { textScale: "150", spacing: "comfortable", headingFont: "sans", linkEmphasis: true, theme: "dark", contrast: "high", motion: "reduced", ignored: "value" };
assert.equal(savePreferences(chosenPreferences, storage), true, "Preferências válidas devem ser armazenadas");
assert.deepEqual(loadPreferences(storage), validatePreferences(chosenPreferences), "Preferências devem ser recuperadas e normalizadas");
assert.deepEqual([...loadProgress(storage)], ["credito"], "Preferências não podem alterar o progresso");
const fakeRoot = { dataset: {}, style: {} };
assert.deepEqual(applyPreferences(chosenPreferences, fakeRoot), validatePreferences(chosenPreferences), "Aplicação deve usar valores validados");
assert.deepEqual(fakeRoot.dataset, { textScale: "150", spacing: "comfortable", headingFont: "sans", linkEmphasis: "true", theme: "dark", contrast: "high", motion: "reduced" });
assert.equal(fakeRoot.style.colorScheme, "dark");
store.set("cicero-accessibility-v1", "{inválido");
assert.deepEqual(loadPreferences(storage), { ...DEFAULT_PREFERENCES }, "JSON local inválido deve restaurar padrões");
store.set("cicero-accessibility-v1", JSON.stringify({ textScale: "999", theme: "blue", linkEmphasis: "yes" }));
assert.deepEqual(loadPreferences(storage), { ...DEFAULT_PREFERENCES }, "Valores locais desconhecidos devem restaurar padrões");
savePreferences(chosenPreferences, storage);
assert.equal(clearPreferences(storage), true);
assert.deepEqual([...loadProgress(storage)], ["credito"], "Limpar acessibilidade deve preservar o progresso");
savePreferences(chosenPreferences, storage);
clearProgress(storage);
assert.equal(loadProgress(storage).size,0);
assert.deepEqual(loadPreferences(storage), validatePreferences(chosenPreferences), "Limpar progresso deve preservar a acessibilidade");
for (const [name, source] of [["index.html", indexHtml], ["styles.css", styles], ["app.js", app], ["preferences.js", preferencesSource], ["preferences-bootstrap.js", preferenceBootstrap]]) assert.doesNotMatch(source, /https?:\/\//, `${name} não deve carregar recursos externos`);
for (const id of ["reclamacao-consumidor", "direitos-no-trabalho", "golpes-resposta", "saude-sus", "planos-saude", "ajuda-resolucao-conflitos", "protecao-emergencia-denuncia"]) assert.ok(trackIds.has(id), `Nova trilha ausente: ${id}`);
const stateTracks = ["constituicao-federal", "federacao-competencias", "poderes-processo-legislativo", "justica-controle-instituicoes", "eleicoes-representacao", "orcamento-publico", "politicas-publicas", "participacao-transparencia-fiscalizacao"];
for (const id of stateTracks) assert.ok(trackIds.has(id), `Trilha de Estado e Política ausente: ${id}`);
const worldTracks = ["comercio-cadeias-globais", "energia-recursos-estrategicos", "moedas-sistema-internacional", "blocos-organizacoes-internacionais", "migracao-refugio-deslocamento", "clima-cooperacao-internacional", "tecnologia-poder-internacional", "sancoes-economicas", "brasil-relacoes-internacionais"];
for (const id of worldTracks) assert.ok(trackIds.has(id), `Trilha de Brasil e Mundo ausente: ${id}`);
for (const [query, id] of [["cadeia global de valor", "cadeia-global-de-valor"], ["minerais criticos", "mineral-critico"], ["moeda de reserva", "moeda-de-reserva"], ["uniao aduaneira", "uniao-aduaneira"], ["solicitante de refugio", "solicitante-de-refugio"], ["acordo de paris", "acordo-de-paris"], ["semicondutor", "semicondutor"], ["sancao economica", "sancao-economica"], ["politica externa", "politica-externa"]]) assert.equal(searchContent(content, query)[0]?.id, id, `Busca deve priorizar ${id}`);
const informationTracks = ["evidencia-qualidade-fontes", "estatistica-cotidiano", "graficos-pesquisas", "correlacao-causalidade-incerteza", "argumentos-falacias-vieses", "propaganda-persuasao", "desinformacao-verificacao", "decisao-informacao-incompleta"];
for (const id of informationTracks) assert.ok(trackIds.has(id), `Trilha de Informação e Decisão ausente: ${id}`);
for (const [query, id] of [["fonte primaria", "fonte-primaria"], ["conflito interesses", "conflito-de-interesses"], ["risco relativo", "risco-relativo"], ["eixo grafico", "eixo-grafico"], ["margem erro", "margem-de-erro"], ["correlacao causalidade", "correlacao-causalidade-incerteza"], ["falacia", "falacia"], ["vies cognitivo", "vies-cognitivo"], ["propaganda persuasao", "propaganda-persuasao"], ["conteudo sintetico", "conteudo-sintetico"], ["verificacao lateral", "verificacao-lateral"], ["decisao incerteza", "decisao-informacao-incompleta"]]) assert.equal(searchContent(content, query)[0]?.id, id, `Busca deve priorizar ${id}`);
const practicalGapTracks = ["escolha-curso-instituicao", "matricula-bolsas-financiamento-estudantil", "processos-seletivos-transicao-profissional", "assistencia-social-beneficios", "servicos-essenciais-moradia"];
for (const id of practicalGapTracks) assert.ok(trackIds.has(id), `Trilha de vida prática ausente: ${id}`);
for (const [query, id] of [["curso tecnico", "curso-tecnico"], ["reconhecimento curso", "reconhecimento-curso"], ["bolsa estudo", "bolsa-de-estudo"], ["financiamento estudantil", "financiamento-estudantil"], ["curriculo profissional", "curriculo-profissional"], ["entrevista trabalho", "entrevista-de-trabalho"], ["aprendizagem profissional", "aprendizagem-profissional"], ["cadastro unico", "cadastro-unico"], ["CRAS", "cras"], ["CREAS", "creas"], ["titularidade servico", "titularidade-de-servico"], ["consumo medido", "consumo-medido"], ["fatura servico", "fatura-de-servico"]]) assert.equal(searchContent(content, query)[0]?.id, id, `Busca deve priorizar ${id}`);
const practicalGapText = JSON.stringify(content.tracks.filter((track) => practicalGapTracks.includes(track.id))).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
for (const phrase of ["emprego garantido pela instituicao", "bolsa garantida", "beneficio garantido", "cadastro unico concede automaticamente", "determinamos sua elegibilidade"]) assert.ok(!practicalGapText.includes(phrase), `Promessa ou conclusão individual proibida: ${phrase}`);
for (const transientPattern of [/salario minimo/, /nota de corte/, /inscricoes? (abrem|encerram)/, /\b\d+(?:[,.]\d+)?%\b/]) assert.doesNotMatch(practicalGapText, transientPattern, `Regra temporária não deve ser incorporada: ${transientPattern}`);
const addedPracticalTracks = ["reparos-manutencao-casa", "cuidados-basicos-internet"];
for (const id of addedPracticalTracks) assert.ok(trackIds.has(id), `Trilha da versão 3.11 ausente: ${id}`);
for (const [query, id] of [["manutencao preventiva", "manutencao-preventiva"], ["reparo domestico", "reparo-domestico"], ["risco eletrico", "risco-eletrico"], ["orcamento servico", "orcamento-de-servico"], ["gerenciador senhas", "gerenciador-de-senhas"], ["backup", "backup"], ["atualizacao seguranca", "atualizacao-de-seguranca"], ["recuperacao conta", "recuperacao-de-conta"], ["permissao aplicativo", "permissao-de-aplicativo"]]) assert.equal(searchContent(content, query)[0]?.id, id, `Busca deve priorizar ${id}`);
const repairTrack = content.tracks.find((track) => track.id === "reparos-manutencao-casa");
const internetCareTrack = content.tracks.find((track) => track.id === "cuidados-basicos-internet");
assert.equal(repairTrack.scenario.correct, 2, "Cenário de reparos deve priorizar isolamento e encaminhamento");
assert.equal(internetCareTrack.scenario.correct, 2, "Cenário de internet deve priorizar o canal oficial");
const repairText = JSON.stringify(repairTrack).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
for (const limit of ["gas", "fiacao", "quadro eletrico", "pressurizada", "estrutura", "telhado", "altura", "chama", "incendio", "inundada", "produtos quimicos"]) assert.ok(repairText.includes(limit), `Limite doméstico ausente: ${limit}`);
assert.doesNotMatch(repairText, /abra o quadro|troque a fiacao|(?<!nunca )repare aparelho energizado/, "Trilha doméstica não deve ensinar intervenção perigosa");
const internetCareText = JSON.stringify(internetCareTrack).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
assert.match(internetCareText, /nao prometem protecao absoluta/, "Trilha de internet deve explicitar o limite de proteção");
assert.doesNotMatch(internetCareText, /identificamos o invasor|dispositivo esta seguro|instale (um )?(antivirus|vpn)/, "Trilha de internet não deve diagnosticar nem recomendar produto");
const informationText = JSON.stringify(content.tracks.filter((track) => informationTracks.includes(track.id))).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
for (const phrase of ["fonte oficial sempre esta correta", "conflito de interesses prova fraude", "correlacao prova causalidade", "todo eixo cortado e enganoso", "falacia torna a conclusao falsa", "propaganda e sempre mentira", "conteudo sintetico e necessariamente falso", "detector de ia comprova autenticidade"]) assert.ok(!informationText.includes(phrase), `Afirmação absoluta proibida: ${phrase}`);
assert.match(informationText, /1 em 100.*2 em 100.*1 ponto percentual.*100%/, "Risco absoluto e relativo devem aparecer juntos no exemplo obrigatório");
const worldText = JSON.stringify(content.tracks.filter((track) => worldTracks.includes(track.id))).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
for (const phrase of ["a globalizacao deve ser defendida", "o brasil deve se alinhar", "sancoes sao justas", "sancoes sao injustas", "determinado pais e inimigo", "o multilateralismo e superior", "a integracao internacional e inevitavel"]) assert.ok(!worldText.includes(phrase), `Frase persuasiva proibida: ${phrase}`);
assert.doesNotMatch(worldText, /como (burlar|evadir|contornar) (uma )?sancao/, "Conteúdo não deve orientar evasão de sanções");
const stateText = JSON.stringify(content.tracks.filter((track) => stateTracks.includes(track.id))).normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
for (const phrase of ["e importante votar", "a democracia deve ser defendida", "todo cidadao deve participar", "a constituicao garante um pais melhor", "voto consciente", "fortalecer a democracia"]) assert.ok(!stateText.includes(phrase), `Frase persuasiva proibida: ${phrase}`);
const icms = content.tracks.find((track) => track.id === "impostos-cotidiano").tables.find((table) => table.id === "aliquota-modal-icms-2025");
assert.equal(icms.title, "Alíquota modal do ICMS por unidade da Federação");
assert.doesNotMatch(`${icms.title} ${icms.description}`, /carga tributária estadual/i);
assert.equal(icms.rows.length, 27, "Tabela do ICMS deve conter as 27 UFs");
assert.equal(new Set(icms.rows.map((row) => row[0])).size, 27, "UFs do ICMS devem ser únicas");
const rates = icms.rows.map((row) => Number(row[2].replace(",", ".").replace("%", "")));
for (let index = 1; index < rates.length; index += 1) {
  assert.ok(rates[index - 1] >= rates[index], "Alíquotas do ICMS devem estar em ordem decrescente");
  if (rates[index - 1] === rates[index]) assert.ok(icms.rows[index - 1][1] === icms.rows[index][1] && icms.rows[index - 1][0].localeCompare(icms.rows[index][0], "pt-BR") < 0, "Empates do ICMS devem compartilhar posição e seguir ordem alfabética");
}
assert.doesNotMatch(indexHtml + app, /type=["']file["']|navigator\.geolocation|href=["']tel:/i, "A aplicação não deve coletar documentos, localização ou acionar chamadas");
assert.equal((indexHtml.match(/<form\b/g) || []).length, 1, "Somente o formulário local de preferências deve existir");
assert.match(indexHtml, /<form id="preferencias-acessibilidade">/, "O formulário permitido deve ser o de acessibilidade");
assert.doesNotMatch(app, /<form\b/, "Conteúdo renderizado não deve criar formulários de coleta");
assert.equal(packageJson.dependencies, undefined, "O projeto não deve ter dependências de execução");
assert.equal(packageJson.devDependencies, undefined, "O projeto não deve ter dependências de desenvolvimento");
for (const page of ["home", "trilhas", "glossario", "fontes", "sobre", "ajuda"]) assert.match(app, new RegExp(`route\\.page === "${page}"`), `Renderização ausente: ${page}`);
assert.match(app, /function help\(\)/, "Ajuda deve possuir renderização independente");
assert.ok(app.indexOf('route.page === "ajuda"') < app.indexOf('!content &&'), "Ajuda deve ser resolvida antes da falha editorial");
assert.match(indexHtml, /<dialog id="acessibilidade"[^>]*aria-labelledby="titulo-acessibilidade"/, "Painel de acessibilidade deve usar diálogo nomeado");
assert.match(indexHtml, /id="alternar-menu"[^>]*aria-expanded="false"[^>]*aria-controls="controles-cabecalho"/, "Menu responsivo deve expor estado e relação");
assert.match(indexHtml, /id="alternar-busca"[^>]*aria-expanded="false"[^>]*aria-controls="busca"/, "Busca deve expor estado e relação");
assert.match(indexHtml, /id="abrir-acessibilidade"[^>]*aria-haspopup="dialog"/, "Acessibilidade deve anunciar o diálogo");
assert.ok(indexHtml.indexOf("preferences-bootstrap.js?v=41") < indexHtml.indexOf("styles.css?v=41"), "Preferências devem ser aplicadas antes do CSS");
assert.match(app, /accessibilityTrigger = event\?\.currentTarget/, "Diálogo deve guardar o acionador que receberá o foco ao fechar");
assert.match(app, /function tracks\(axisId = null\)/, "Catálogo deve aceitar uma rota de eixo");
assert.match(app, /content\.tracks\.some\(\(item\) => item\.id === route\.id\)/, "Rota deve distinguir trilha de eixo");
assert.match(app, /content\.axes\.map\(axisCard\)/, "Home deve apresentar os eixos editoriais");
assert.match(app, /axisIndex \+ 1[\s\S]*trackIndex \+ 1/, "Numeração deve combinar as posições do eixo e da trilha");
assert.match(app, /aria-pressed="false"/, "Cenários devem expor o estado inicial");
assert.match(app, /setAttribute\("aria-pressed", "true"\)/, "Cenários devem expor a opção selecionada");
assert.match(indexHtml, /id="status-aplicacao"[^>]*role="status"/, "Ações locais devem possuir região de status");
for (const message of ["Trilha marcada como concluída.", "Conclusão removida.", "Progresso local apagado."]) assert.match(app, new RegExp(message.replace(".", "\\.")), `Anúncio ausente: ${message}`);
assert.match(app, /function loadFailure\(\)/, "Falha de conteúdo deve possuir estado recuperável");
assert.match(app, /Tentar novamente/, "Falha de conteúdo deve permitir nova tentativa");
assert.match(styles, /prefers-reduced-motion/, "A interface deve respeitar redução de movimento");
assert.match(styles, /forced-colors/, "A interface deve preservar estados em alto contraste");
assert.match(styles, /touch-action:\s*manipulation/, "Controles devem responder a toque sem gesto obrigatório");
assert.match(styles, /html\[data-theme="dark"\]/, "Tema escuro deve possuir tokens próprios");
assert.match(styles, /html\[data-contrast="high"\]/, "Alto contraste deve possuir tokens próprios");
assert.match(styles, /html\[data-text-scale="150"\]/, "Texto deve aceitar ampliação local até 150%");
assert.match(styles, /min-height:\s*2\.75rem/, "Controles principais devem possuir alvo mínimo de 44 pixels");
assert.match(serviceWorker, /cicero-v41/, "Service Worker deve usar o cache da versão 4.0.0");
for (const source of [indexHtml, app, serviceWorker]) assert.doesNotMatch(source, /\?v=(?:[1-9]|[1-3]\d|40)(?!\d)/, "Recursos versionados devem usar somente ?v=41");
assert.match(preferenceBootstrap, /cicero-accessibility-v1/, "Bootstrap deve aplicar preferências locais antes da pintura");
function luminance(hex) { const channels = hex.match(/.{2}/g).map((part) => parseInt(part, 16) / 255).map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4); return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]; }
function contrast(first, second) { const a = luminance(first), b = luminance(second); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); }
for (const track of content.tracks) { const theme = styles.match(new RegExp(`\\[data-track="${track.id}"\\] \\{ --track: #([0-9a-f]{6})`)); assert.ok(theme, `Tema visual ausente: ${track.id}`); assert.ok(contrast(theme[1], "fffdf7") >= 4.5, `Tema sem contraste AA: ${track.id}`); }
assert.match(serviceWorker, /cicero-v41/, "O cache deve usar a versão técnica atual");
assert.match(serviceWorker, /self\.skipWaiting\(\)/, "A atualização deve ativar o novo cache sem aguardar o fechamento das abas");
assert.match(serviceWorker, /caches\.delete/, "Caches antigos devem ser removidos");
const cacheVersion = serviceWorker.match(/cicero-v(\d+)/)?.[1];
assert.ok(cacheVersion, "A versão do cache deve ser identificável");
assert.match(indexHtml, new RegExp(`css/styles\\.css\\?v=${cacheVersion}`), "CSS e cache devem compartilhar a versão");
assert.match(indexHtml, new RegExp(`js/app\\.js\\?v=${cacheVersion}`), "Aplicação e cache devem compartilhar a versão");
assert.match(app, new RegExp(`data/content\\.json\\?v=${cacheVersion}`), "Conteúdo e cache devem compartilhar a versão");
console.log("Cícero: verificações concluídas sem falhas.");
