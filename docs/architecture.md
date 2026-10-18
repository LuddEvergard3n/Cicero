# Arquitetura

## Objetivo

O Cícero é uma aplicação web educacional estática para jovens brasileiros de 16 a 24 anos. A versão pública 4.0.0 organiza 65 trilhas em sete eixos, usa numeração visual hierárquica e oferece ajuda, preferências locais de acessibilidade, navegação adaptável e instalação PWA sem fornecer aconselhamento individual.

## Decisões principais

- HTML, CSS e JavaScript ES modules nativos, sem framework, etapa de build ou dependência em tempo de execução.
- Conteúdo e taxonomia editorial separados da interface em `data/content.json`.
- Rotas por fragmento de URL para funcionar em hospedagem estática sem regras de reescrita.
- Estado persistente restrito a `localStorage`.
- Busca executada no navegador sobre o conteúdo já publicado.
- Service Worker com cache do shell e dos dados essenciais para uso posterior sem rede.
- Testes em Node.js usando apenas módulos da biblioteca padrão.

Essas decisões mantêm a aplicação auditável, publicável no GitHub Pages e utilizável sem conta ou backend.

## Componentes

```text
index.html            Shell semântico, navegação, busca e pontos de montagem
css/styles.css        Sistema editorial, temas das trilhas, responsividade e acessibilidade visual
data/content.json     Eixos, trilhas, cenários, checklists, tabelas, glossário e fontes
js/app.js             Inicialização, renderização das páginas e eventos da interface
js/router.js          Leitura das rotas por hash e escape de HTML
js/search.js          Busca textual determinística
js/storage.js         Leitura, gravação e remoção do progresso local
js/preferences.js     Validação, aplicação e armazenamento das preferências de acessibilidade
js/preferences-bootstrap.js  Aplicação antecipada do tema antes do CSS
sw.js                 Cache offline dos arquivos essenciais
manifest.json         Metadados básicos da aplicação instalável
server.js             Servidor HTTP local sem dependências
tests/test-runner.js  Verificações estruturais e de lógica pura
```

## Fluxo de inicialização

1. O navegador carrega `index.html`, o CSS e `js/app.js`.
2. `app.js` busca `data/content.json`; falha de rede, HTTP ou JSON produz um estado recuperável sem executar renderizações dependentes do conteúdo.
3. O progresso é lido de `localStorage` pela chave `cicero-progress-v1`.
4. `getRoute()` interpreta `window.location.hash` e seleciona a página.
5. A página é renderizada dentro de `<main id="conteudo">`.
6. A rota atual é refletida na navegação com `aria-current` e eventos são associados aos controles renderizados.
7. Quando disponível, o Service Worker é registrado em segundo plano.

## Rotas públicas

| Rota | Resultado |
|---|---|
| `#/` | Página inicial. |
| `#/trilhas` | Catálogo das 65 trilhas agrupadas em sete eixos. |
| `#/trilhas/:eixo` | Catálogo filtrado por um eixo editorial. |
| `#/trilhas/:id` | Trilha identificada por ID estável; o renderizador distingue o ID de um eixo do ID de uma trilha. |
| `#/glossario` | Lista completa de termos. |
| `#/glossario/:id` | Definição e trilhas relacionadas. |
| `#/fontes` | Bibliografia institucional e política resumida. |
| `#/sobre` | Finalidade, limites, privacidade e exclusão do progresso. |
| `#/ajuda` | Uso, acessibilidade, instalação, privacidade e solução de problemas; não depende do JSON editorial. |

IDs inexistentes apresentam a página interna de rota não encontrada. Como a rota vive depois de `#`, o servidor sempre entrega `index.html` e não precisa conhecer as páginas internas.

## Estado e dados

O progresso persiste como array de IDs em `cicero-progress-v1`. Preferências visuais validadas persistem separadamente em `cicero-accessibility-v1`. Limpar uma chave não altera a outra. Checkboxes, respostas de cenários e buscas não são persistidos.

Os eixos não criam estado. O progresso por eixo é calculado no momento da renderização a partir dos mesmos IDs globais já concluídos.

A numeração pública é derivada da posição do eixo e da trilha em `axes`, no formato `EE.TT`. Ela orienta a leitura, mas não integra o ID, a URL ou o progresso persistido.

Não há sincronização, autenticação, banco de dados, perfil, histórico remoto, telemetria, formulário de denúncia nem mecanismo de recuperação entre navegadores. As trilhas de saúde e proteção apenas apresentam critérios gerais e canais; não realizam triagem, diagnóstico ou recebimento de relatos.

## Limites conhecidos

- `app.js` concentra renderização e eventos; deve ser dividido somente quando uma mudança real exigir manutenção independente.
- A busca normaliza acentos, preserva o ranking por frase e indexa títulos, resumos, etapas e tabelas; não possui tolerância a erros de digitação ou busca aproximada.
- O cache segue estratégia cache-first e exige incremento manual de versão para distribuir alterações já armazenadas; a ativação remove caches `cicero-*` obsoletos.
- O manifesto e os ícones permitem instalação quando o navegador oferecer suporte; disponibilidade e aparência ainda dependem da plataforma e precisam de teste real.
- A interface usa o sistema editorial documentado em [sistema visual](design-system.md); validação visual e com tecnologias assistivas continua manual.
- O eixo Brasil e Mundo usa exemplos históricos datados, mas não possui feed, mapa ou indicador corrente; atualizar um exemplo exige revisão editorial e das fontes.
- O eixo Informação e Decisão usa somente exemplos editoriais estáticos e aritmética elementar; não recebe conteúdo, classifica fontes nem executa verificação externa.
- As trilhas de educação, entrada profissional, assistência social e serviços essenciais usam regras gerais e canais oficiais; não verificam elegibilidade, validade individual, contratação, concessão, dívida ou tarifa.
