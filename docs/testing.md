# Testes e critérios de aceite

## Teste automatizado

Execute na raiz:

```powershell
npm test
```

O runner usa `node:assert/strict`, não exige instalação e retorna código diferente de zero quando uma verificação falha.

## Cobertura atual

- presença dos arquivos públicos, módulos e documentos essenciais;
- ausência de scripts, folhas de estilo, fontes e imagens externas no shell, CSS e aplicação;
- ausência de dependências de execução e desenvolvimento;
- exatamente sete eixos, 68 trilhas, 324 termos e 180 fontes na versão 4.2;
- IDs, campos e referências dos eixos, com cada trilha atribuída uma única vez e sem colisão de IDs;
- IDs únicos de termos e fontes;
- IDs únicos de trilhas;
- campos mínimos de cada trilha;
- ao menos três etapas, opções de cenário e itens de checklist;
- índice correto do cenário dentro dos limites das opções;
- referências de trilhas para termos e fontes existentes;
- contrato das tabelas, datas não futuras, referências, 27 UFs únicas, ordem das alíquotas e empates determinísticos;
- busca com normalização de acentos, ordem por relevância, consulta vazia e consulta sem resultado;
- uso exclusivo de HTTPS e domínios governamentais ou institucionais explicitamente permitidos nas fontes;
- ausência das frases persuasivas proibidas nas oito trilhas de Estado e Política;
- ausência das frases persuasivas e da orientação de evasão proibidas nas nove trilhas de Brasil e Mundo;
- gravação, leitura e remoção independente do progresso e das preferências em armazenamento substituto;
- validação e aplicação de preferências, incluindo recuperação de JSON inválido e valores desconhecidos;
- presença das rotas renderizadas, inclusive Ajuda sem conteúdo, do catálogo filtrado e do estado `aria-pressed` dos cenários;
- presença do estado recuperável para falha editorial e dos anúncios de progresso;
- buscas e limites editoriais específicos das cinco trilhas de vida prática adicionadas entre 3.6 e 3.8;
- suporte declarado a redução de movimento, alto contraste e temas das 68 trilhas;
- manifesto, dimensões reais dos ícones, versão atual do cache offline e remoção de caches antigos.

## O que o teste não prova

- validade atual de leis, serviços, URLs ou afirmações editoriais;
- qualidade pedagógica e adequação ao público;
- comportamento completo em navegadores;
- acessibilidade WCAG;
- instalação PWA ou atualização real do Service Worker entre duas visitas;
- aparência, espaçamento e consistência visual;
- funcionamento real de GitHub Pages.

## Verificações técnicas adicionais

```powershell
node --check js/app.js
node --check js/router.js
node --check js/search.js
node --check js/storage.js
node --check js/preferences.js
node --check js/preferences-bootstrap.js
npm run serve
```

Com o servidor ativo, confirme respostas `200` para `/`, conteúdo, CSS, módulos, manifesto, ícones e Service Worker.

## Matriz manual por entrega

### Navegação

- Abrir todas as rotas públicas diretamente e por links internos.
- Abrir os sete eixos, confirmar agrupamento exclusivo e retorno da trilha para o eixo correto.
- Abrir ID inexistente e verificar a página de rota não encontrada.
- Recarregar uma rota por hash e confirmar que a página permanece acessível.

### Busca e glossário

- Pesquisar título de trilha, termo, texto de etapa e consulta sem resultado.
- Limpar a busca e confirmar foco no campo.
- Abrir termo, verificar definição e links para trilhas relacionadas.

### Trilhas e progresso

- Escolher resposta correta e incorreta em ao menos um cenário.
- Marcar checkboxes usando mouse e teclado.
- Concluir e reabrir uma trilha; confirmar estado persistido.
- Remover conclusão e apagar todo o progresso pela página Sobre.
- Corromper a chave local manualmente e confirmar recuperação vazia.

### Tabelas editoriais

- Conferir legenda, cabeçalhos, notas, data e fontes das duas tabelas tributárias.
- Percorrer o quadro das 27 UFs por teclado e leitor de tela.
- Verificar rolagem interna em 320 pixels e zoom real de 400%, sem rolagem na página inteira.

### Responsividade e acessibilidade

Executar a lista de [acessibilidade](accessibility.md) em celular, tablet e desktop representativos.

### Offline

- Fazer uma primeira visita online.
- Aguardar ativação do Service Worker e recarregar.
- Desativar a rede e abrir home, catálogo, uma trilha, glossário, fontes e sobre.
- Publicar uma nova versão com cache incrementado e confirmar que o conteúdo atualiza.

## Critério de aceite

Uma alteração está pronta quando os testes automatizados passam, as verificações manuais afetadas foram executadas, a documentação correspondente foi atualizada e qualquer parte não verificada foi declarada no relatório final.

## Validação da reformulação editorial

Executada em 15 de outubro de 2026 por HTTP local:

- `npm test`, verificação de sintaxe de `app.js` e `sw.js`: aprovados;
- shell, JSON, CSS versionado, módulo versionado e Service Worker: resposta HTTP `200`;
- home, busca por `Pix`, trilha de crédito, escolha de cenário, checklist e conclusão: aprovados em navegador;
- navegação entre rotas fecha a busca aberta e posiciona a nova página no início;
- largura de 320 pixels: `scrollWidth` igual a `clientWidth`, sem rolagem horizontal;
- console do navegador: nenhum aviso ou erro durante os fluxos testados;
- contrastes principais medidos entre `4,75:1` e `11,98:1`; texto de destaque sobre papel mediu `5,20:1`.

Permanecem não verificados manualmente: NVDA ou outro leitor de tela, modo forçado de alto contraste, instalação como PWA, visita totalmente offline e transição real entre duas publicações do Service Worker. Essas verificações não devem ser descritas como concluídas.

## Validação da expansão 1.1

Executada em 15 de outubro de 2026 por HTTP local:

- catálogo com sete trilhas e cartão final em destaque: aprovado em desktop;
- rota `#/trilhas/dividas-renegociacao`: quatro etapas, cenário, cinco itens de checklist, cinco termos e cinco fontes aprovados;
- seleção do cenário atualiza `aria-pressed` e anuncia a explicação;
- buscas por `renegociação` e `saldo devedor`: aprovadas;
- página de fontes apresenta as 11 referências cadastradas;
- largura de 320 pixels: sem rolagem horizontal na nova trilha;
- console do navegador: nenhum aviso ou erro nos fluxos testados.

As afirmações da nova trilha foram comparadas com páginas do Banco Central do Brasil, Ministério da Justiça e Segurança Pública e Consumidor.gov.br em 15 de outubro de 2026. A disponibilidade futura das páginas e eventuais mudanças normativas continuam sujeitas à revisão editorial.

## Validação da expansão 1.2

Executada em 15 de outubro de 2026 por HTTP local:

- `npm test` e verificações de sintaxe dos módulos e do Service Worker: aprovados;
- shell, JSON, CSS, módulo principal e Service Worker versionados: resposta HTTP `200`;
- catálogo apresenta oito trilhas e a rota `#/trilhas/aluguel-moradia` abre diretamente;
- nova trilha apresenta três objetivos, quatro etapas, cenário, cinco itens de checklist, cinco termos e quatro fontes;
- escolha segura do cenário altera `aria-pressed` para `true` e exibe a explicação;
- busca por `aluguel` e `vistoria`: aprovada;
- página de fontes apresenta as 14 referências cadastradas;
- largura de 320 pixels: `scrollWidth` igual a `clientWidth`, sem rolagem horizontal;
- contraste da nova cor sobre o papel: `6,36:1`;
- console do navegador: nenhum aviso ou erro durante os fluxos testados.

As afirmações foram comparadas com a Lei nº 8.245, material público do Procon-SP, alerta da Secretaria da Segurança Pública do Paraná e serviço Consumidor.gov.br. Permanecem não verificados nesta expansão: leitor de tela, teclado completo, zoom de 400%, alto contraste forçado e visita totalmente offline.

## Validação das versões 1.2.1 a 1.6.0

Executada em 16 de outubro de 2026 por HTTP local, sobre o estado final `1.6.0`:

- `npm test` e verificações de sintaxe dos módulos e do Service Worker: aprovados;
- conteúdo final com doze trilhas, 51 termos e 23 fontes: aprovado;
- catálogo com numeração editorial de `01` a `12` e as quatro novas rotas: aprovado;
- rotas de glossário e rota inexistente: aprovadas;
- busca sem acento por `caucao` e ordenação de `contrato`, com o termo exato antes das demais ocorrências: aprovadas;
- alternativa incorreta e alternativa segura do cenário de investimentos atualizam `aria-pressed` e a explicação: aprovadas;
- conclusão, remoção e limpeza do progresso mantêm o foco no `main` e anunciam as três mensagens previstas: aprovadas;
- falha HTTP de `content.json`: cabeçalho e rodapé permanecem disponíveis, a busca fica desabilitada, o `main` exibe `role="alert"` e o botão `Tentar novamente`, sem erro não tratado no console;
- página de fontes apresenta as 23 referências cadastradas;
- larguras de 320 pixels e tablet: sem rolagem horizontal;
- console do navegador: nenhum aviso ou erro nos fluxos principais e na falha simulada;
- fontes oficiais das quatro novas trilhas foram reabertas em 16 de outubro de 2026; a página direta do IBGE apresentou falha intermitente na consulta, embora o endereço canônico e o conteúdo fossem localizáveis no domínio oficial.

As versões intermediárias desse lote estão registradas em [releases.md](releases.md), mas não foram publicadas nem preservadas como commits independentes. Naquele marco, o código usava o cache final `cicero-v14` e recursos `?v=14`.

Permanecem não verificados manualmente: fluxo completo somente por teclado, NVDA, zoom de 400%, alto contraste forçado, instalação como PWA, segunda visita totalmente offline, transição real de um cache anterior para `cicero-v14` e GitHub Pages. Não há declaração de conformidade WCAG completa.

## Validação da expansão 1.7

Executada em 16 de outubro de 2026 por HTTP local:

- `npm test` e verificações de sintaxe dos módulos e do Service Worker: aprovados;
- conteúdo final com treze trilhas, 56 termos e 28 fontes: aprovado;
- catálogo apresenta numeração editorial de `01` a `13`;
- rota `#/trilhas/documentos-govbr`: três objetivos, quatro etapas, cenário, cinco itens de checklist, cinco termos e cinco fontes aprovados;
- alternativa insegura e alternativa segura alteram `aria-pressed` e apresentam a explicação correspondente;
- buscas por `verificacao em duas etapas` e `gov.br`: aprovadas;
- os cinco novos termos abrem por rota própria e apresentam relação de volta para a trilha;
- página de fontes apresenta as 28 referências cadastradas;
- largura de 320 pixels: `scrollWidth` igual a `clientWidth`, sem rolagem horizontal;
- contraste da nova cor é verificado pelo teste automatizado no mesmo limite AA aplicado aos demais temas;
- console do navegador: nenhum aviso ou erro durante os fluxos testados.

As fontes sobre CIN, emissão nos estados e no Distrito Federal, níveis da conta gov.br, carteira de documentos digitais e segurança da conta foram reabertas no domínio oficial em 16 de outubro de 2026. O conteúdo evita reproduzir taxas, prazos, requisitos estaduais ou disponibilidade de serviços como regras permanentes.

Permanecem não verificados nesta expansão: fluxo completo somente por teclado, NVDA, zoom de 400%, alto contraste forçado, segunda visita totalmente offline, atualização real de `cicero-v14` para `cicero-v15` e GitHub Pages.

## Validação da expansão 1.8

Executada em 16 de outubro de 2026 por HTTP local:

- `npm test` e verificações de sintaxe dos módulos e do Service Worker: aprovados;
- conteúdo final com catorze trilhas, 61 termos e 31 fontes: aprovado;
- catálogo apresenta numeração editorial de `01` a `14`;
- rota `#/trilhas/entrada-trabalho`: três objetivos, quatro etapas, cenário, cinco itens de checklist, cinco termos e quatro fontes aprovados;
- alternativa insegura e alternativa segura alteram `aria-pressed` e apresentam a explicação correspondente;
- buscas por `admissao` e `vaga`: aprovadas;
- os cinco novos termos abrem por rota própria e apresentam relação de volta para a trilha;
- página de fontes apresenta as 31 referências cadastradas;
- largura de 320 pixels: `scrollWidth` igual a `clientWidth`, sem rolagem horizontal;
- contraste da nova cor é verificado pelo teste automatizado no mesmo limite AA aplicado aos demais temas;
- console do navegador: nenhum aviso ou erro durante os fluxos testados.

As páginas do Ministério do Trabalho e Emprego, a CLT compilada no Planalto e a cartilha oficial sobre fraudes foram reabertas em 16 de outubro de 2026. O conteúdo não calcula direitos, não fixa prazos e não classifica uma relação concreta como vínculo de emprego.

Permanecem não verificados nesta expansão: fluxo completo somente por teclado, NVDA, zoom de 400%, alto contraste forçado, segunda visita totalmente offline, atualização real de `cicero-v15` para `cicero-v16` e GitHub Pages.

## Validação da expansão 1.9

Executada em 17 de outubro de 2026 por HTTP local:

- `npm test` e verificações de sintaxe dos módulos e do Service Worker: aprovados;
- conteúdo final com quinze trilhas, 66 termos e 34 fontes: aprovado;
- catálogo apresenta numeração editorial de `01` a `15`;
- rota `#/trilhas/direitos-digitais`: três objetivos, quatro etapas, cenário, cinco itens de checklist, cinco termos e três fontes aprovados;
- alternativa insegura e alternativa segura alteram `aria-pressed` e apresentam a explicação correspondente;
- buscas por `dado pessoal` e `controlador`: aprovadas;
- os cinco novos termos abrem por rota própria e apresentam relação de volta para a trilha;
- página de fontes apresenta as 34 referências cadastradas;
- largura de 320 pixels: `scrollWidth` igual a `clientWidth`, sem rolagem horizontal;
- contraste da nova cor é verificado pelo teste automatizado no mesmo limite AA aplicado aos demais temas;
- console do navegador: nenhum aviso ou erro durante os fluxos testados.

A LGPD compilada e as páginas da ANPD sobre titulares e petições foram reabertas em 17 de outubro de 2026. O conteúdo não trata consentimento como única base legal, não promete eliminação de dados e não substitui análise jurídica ou administrativa.

Permanecem não verificados nesta expansão: fluxo completo somente por teclado, NVDA, zoom de 400%, alto contraste forçado, segunda visita totalmente offline, atualização real de `cicero-v16` para `cicero-v17` e GitHub Pages.

## Validação da expansão 2.0

Executada em 17 de outubro de 2026 por HTTP local:

- `npm test` e verificações de sintaxe dos módulos e do Service Worker: aprovados;
- conteúdo final com dezesseis trilhas, 70 termos e 38 fontes: aprovado;
- catálogo apresenta numeração editorial de `01` a `16`;
- rota `#/trilhas/servicos-publicos-atendimento`: três objetivos, quatro etapas, cenário, cinco itens de checklist, cinco termos e quatro fontes aprovados;
- alternativa insegura e alternativa segura alteram `aria-pressed` e apresentam retornos distintos;
- buscas por `servico publico` e `ouvidoria`: aprovadas;
- os quatro novos termos e o termo reutilizado `protocolo` abrem por rota própria e apresentam relação de volta para a trilha;
- página de fontes apresenta as 38 referências cadastradas, incluindo as quatro novas;
- largura de 320 pixels: `scrollWidth` igual a `clientWidth`, sem rolagem horizontal;
- contraste da nova cor é verificado pelo teste automatizado no mesmo limite AA aplicado aos demais temas;
- console do navegador: nenhum aviso ou erro durante os fluxos testados.

A Lei nº 13.460, as páginas da CGU sobre manifestações e Fala.BR e o alerta do CISC sobre falsos contatos governamentais responderam por HTTPS em 17 de outubro de 2026. O conteúdo não apresenta o Fala.BR como canal universal, não recebe manifestações ou documentos e não promete prazo ou resultado administrativo.

Permanecem não verificados nesta expansão: fluxo completo somente por teclado, NVDA, zoom de 400%, alto contraste forçado, segunda visita totalmente offline, atualização real de `cicero-v17` para `cicero-v18` e GitHub Pages.

## Validação das expansões 2.1 a 2.5

Executada em 17 de outubro de 2026 por HTTP local, com a entrega final `2.5.0`:

- `npm test` e verificações de sintaxe dos módulos, servidor e Service Worker: aprovados;
- conteúdo final com 26 trilhas, 116 termos e 56 fontes: aprovado;
- catálogo apresenta as dez novas trilhas nas posições `17` a `26` e não cria rolagem horizontal;
- cada nova trilha apresenta três objetivos, quatro etapas, três alternativas de cenário, cinco itens de checklist e cinco termos;
- alternativas insegura e segura das dez trilhas produzem retorno distinto, atualizam `aria-pressed` e mantêm a explicação anunciável;
- checklist, conclusão, remoção de conclusão e mensagens globais foram exercitados nas dez trilhas; o estado final das trilhas novas foi restaurado para não concluído;
- os 46 novos termos abrem por rota própria e possuem ao menos uma ligação de volta para trilha relacionada;
- buscas planejadas sem acento e o ranking editorial foram aprovados pelo teste automatizado; no navegador, `franquia seguro`, `política monetária` e `politica monetaria` retornaram conteúdo existente;
- página de fontes exibe 56 links externos e a data geral de revisão;
- 16 das 18 novas referências responderam com HTTP 200 na verificação automatizada; as duas páginas do IBGE recusaram robôs com HTTP 403, mas abriram normalmente em navegador real com os títulos esperados;
- a URL inicialmente planejada para “O que é Microempreendedor Individual” retornou 404 e foi substituída pela página oficial vigente de perguntas frequentes do Portal do Empreendedor, que respondeu com HTTP 200;
- falha simulada de `content.json` preservou cabeçalho e rodapé, apresentou `role="alert"` e a ação “Tentar novamente”; o botão global de busca permaneceu desabilitado conforme a implementação;
- rota inexistente apresentou 404 interno e ligação de retorno, sem remover a navegação global;
- larguras de 320, 768 e 1280 pixels não apresentaram rolagem horizontal no catálogo; uma trilha também foi verificada em 320 pixels;
- preferência de movimento reduzido e cores forçadas foram emuladas e reconhecidas pelo navegador;
- `Tab` alcançou o link de salto e `Enter` moveu o foco para o conteúdo principal;
- após a instalação, uma segunda visita com a rede desativada carregou o catálogo completo; a lista de caches continha somente `cicero-v23`;
- um fluxo limpo por home, catálogo, trilha e rota inexistente não produziu aviso ou erro no console.

Permanecem não verificados nesta expansão: percurso completo somente por teclado, NVDA ou outro leitor de tela, zoom real de navegador em 400%, alto contraste ativado no sistema operacional, instalação como PWA, GitHub Pages e auditoria especializada de WCAG. A largura de 320 pixels cobre o reflow equivalente a uma janela de 1280 pixels ampliada em 400%, mas não substitui o teste de zoom real.

## Validação da expansão 2.6.0

Executada em 17 de outubro de 2026 sobre a entrega acumulada:

- `npm test`: aprovado com 33 trilhas, 146 termos, 76 fontes, referências cruzadas, temas AA e versões `2.6.0`, `cicero-v24` e `?v=24` sincronizadas;
- buscas sem acento por reclamação, direitos no trabalho, boletim de ocorrência, atenção primária, plano de saúde, Defensoria Pública e Conselho Tutelar: aprovadas pelo teste automatizado;
- os 20 novos endereços responderam por HTTPS na data da revisão; o PDF de golpes inicialmente planejado redirecionava para autenticação e foi substituído pela cartilha pública equivalente da Polícia Federal;
- catálogo por HTTP apresentou as trilhas numeradas de `27` a `33` e a nova redação dos limites gerais;
- alternativas insegura e segura, cinco itens de checklist, conclusão, remoção e anúncios foram exercitados nas sete trilhas; o progresso das trilhas novas foi restaurado para não concluído;
- os 30 termos novos abriram por rota própria e exibiram ao menos um backlink; a página de fontes apresentou 76 links, incluindo os 20 novos;
- buscas no navegador por `atencao primaria`, `atenção primária`, `boletim ocorrencia`, `defensoria publica` e `conselho tutelar` retornaram os termos esperados;
- catálogo em 320, 768 e 1280 pixels apresentou 33 cartões e não excedeu a largura da página;
- rota inexistente apresentou 404 interno; bloqueio de `content.json` apresentou `role="alert"`, busca desabilitada e ação de nova tentativa, que recuperou a home após o desbloqueio;
- preferências emuladas de movimento reduzido e cores forçadas foram reconhecidas pelo navegador;
- segunda visita sem rede carregou o catálogo completo; o armazenamento de cache continha somente `cicero-v24`;
- os fluxos verificados não produziram avisos ou erros no console;
- NVDA em Chromium, zoom real de 400%, alto contraste no sistema operacional, publicação no GitHub Pages e revisão especializada de saúde, trabalho, direito e proteção permanecem itens independentes e não são inferidos pelos testes automatizados.

O projeto não declara conformidade WCAG completa. O conteúdo de saúde e proteção também exige revisão humana especializada antes de publicação pública, mesmo quando a estrutura e os links passam nos testes técnicos.

## Validação das expansões 2.7.0 e 2.8.0

Executada em 17 de outubro de 2026 sobre a entrega acumulada `2.8.0`:

- `npm test` e verificações de sintaxe de `app.js`, `search.js`, `sw.js` e `server.js`: aprovados;
- conteúdo final com 41 trilhas, 186 termos e 100 fontes, referências cruzadas e 41 temas com contraste AA: aprovado;
- versões `2.8.0`, `cicero-v26` e `?v=26`: sincronizadas;
- contrato de tabela, datas, fontes, 27 UFs únicas, ordem decrescente e empates determinísticos: aprovados;
- buscas planejadas sem acento, indexação das tabelas e bloqueio das seis frases persuasivas: aprovados;
- shell, JSON, CSS, aplicação e Service Worker responderam `200` por HTTP local;
- a trilha `eleicoes-representacao` e as duas tabelas de `impostos-cotidiano` foram abertas no navegador; títulos, ordem de leitura, legendas, cabeçalhos, 27 UFs, data, notas e fontes apareceram na árvore de acessibilidade;
- a página da nova trilha foi inspecionada visualmente em desktop sem quebra de layout;
- 22 das 24 novas URLs responderam `200` na verificação automática; a página do Portal da Transparência respondeu normalmente no navegador apesar de retornar `405` ao cliente automatizado, e a página de competências do TCU excedeu o limite de tempo do cliente, mas teve o conteúdo confirmado na consulta web;
- a URL federal inicialmente planejada para competências dos entes retornou `404` e foi substituída pelo referencial oficial da Casa Civil; a referência de organização política da Câmara também foi corrigida para a página específica vigente.

Não foram executados nesta entrega: percurso completo somente por teclado; escolhas de todos os cenários e alternância de todas as conclusões no navegador; 320 e 768 pixels; zoom real de 400%; NVDA; alto contraste do sistema; segunda visita offline; transição real de `cicero-v24` para `cicero-v26`; auditoria especializada; GitHub Pages. Não há declaração de conformidade WCAG completa nem de revisão jurídica ou fiscal especializada.

## Validação das expansões 2.9.0 a 3.1.0

Executada em 17 de outubro de 2026 sobre a entrega acumulada `3.1.0`:

- `npm test`: aprovado;
- verificações de sintaxe dos módulos JavaScript e do Service Worker: aprovadas;
- conteúdo final com 50 trilhas, 231 termos, 126 fontes, referências cruzadas e 50 temas com contraste AA: aprovado;
- versões `3.1.0`, `cicero-v29` e `?v=29`: sincronizadas;
- buscas sem acento, hosts institucionais e frases persuasivas proibidas: aprovados;
- catálogo com as trilhas 42 a 50 e a trilha `sancoes-economicas`: carregados por HTTP local e inspecionados pela árvore de acessibilidade;
- cenário, checklist, termos relacionados e limite editorial da trilha de sanções: presentes e identificados semanticamente;
- as 26 URLs foram solicitadas diretamente: 15 responderam com sucesso; 11 recusaram a requisição automatizada com `403` ou `429`, inclusive páginas que abriram pela consulta editorial. Esses bloqueios não foram tratados como prova de URL inválida.

Não foram executados nesta entrega: escolha das alternativas e conclusão pelo navegador; percurso completo somente por teclado; 320 e 768 pixels; zoom real de 400%; NVDA; alto contraste do sistema; falha simulada do JSON; segunda visita offline; transição real de `cicero-v26` para `cicero-v29`; auditoria especializada de relações internacionais; GitHub Pages. Não há declaração de conformidade WCAG completa nem de revisão jurídica, migratória ou internacional especializada.

## Validação das expansões 3.2.0 a 3.5.0

Executada em 18 de outubro de 2026 sobre a entrega acumulada `3.5.0`:

- `npm test` e verificações de sintaxe dos módulos JavaScript, servidor e Service Worker: aprovados;
- conteúdo final com 58 trilhas, 271 termos, 147 fontes, referências cruzadas e 58 temas com contraste AA: aprovado;
- versões `3.5.0`, `cicero-v33` e `?v=33`: sincronizadas;
- buscas sem acento, hosts institucionais, exemplos numéricos e afirmações absolutas proibidas: aprovados;
- shell, JSON, CSS, aplicação e Service Worker responderam `200` por HTTP local;
- catálogo apresentou 58 cartões; a trilha `desinformacao-verificacao` exibiu objetivos, quatro etapas, três alternativas, cinco itens de checklist e cinco termos;
- alternativa inadequada, checklist, conclusão, remoção e anúncios foram exercitados; o progresso da nova trilha foi restaurado para não concluído;
- busca no navegador por `conteudo sintetico` priorizou o termo e também retornou a trilha relacionada;
- catálogo em 320, 768 e 1280 pixels manteve os 58 cartões sem exceder a largura da página;
- a atualização real removeu `cicero-v24`, `cicero-v26` e `cicero-v29`, deixando somente `cicero-v33`; uma recarga posterior sem rede preservou o catálogo;
- os fluxos verificados não produziram avisos ou erros no console;
- as fontes OpenStax, UNESCO, CDC, OECD, Polícia Federal e NIST foram reabertas por consulta institucional; alguns endereços do IBGE e PDFs da OMS recusaram leitura automatizada, embora permaneçam em hosts oficiais e indexados;
- não foram executados: todas as alternativas das oito trilhas, percurso completo somente por teclado, zoom real de 400%, NVDA, alto contraste ativado no sistema operacional, auditoria especializada e GitHub Pages.

O projeto não declara conformidade WCAG completa nem revisão estatística, filosófica ou midiática especializada.

## Validação das expansões 3.6.0 a 3.8.0

Executada em 18 de outubro de 2026 sobre a entrega acumulada `3.8.0`:

- `npm test`: aprovado;
- conteúdo final com 63 trilhas, 296 termos, 162 fontes, referências cruzadas e 63 temas com contraste AA: aprovado;
- versões `3.8.0`, `cicero-v36` e `?v=36`: sincronizadas;
- buscas sem acento para educação, processo seletivo, assistência social e serviços essenciais: aprovadas;
- bloqueio de promessas editoriais e de critérios temporários nas cinco trilhas: aprovado;
- ausência de dependências, formulários, upload, chamadas automáticas, APIs e recursos externos: preservada;
- as 15 fontes novas foram conferidas em seus endereços institucionais durante a revisão editorial; cinco endereços planejados que redirecionavam para autenticação interna ou falhavam no cliente foram substituídos por páginas públicas oficiais equivalentes.
- catálogo apresentou as trilhas 59 a 63; as cinco rotas foram abertas por HTTP em sessão limpa e exibiram título, cenário, checklist e termos;
- busca sem acento por `cadastro unico` priorizou o termo e retornou a trilha relacionada;
- na trilha de serviços essenciais, alternativas inadequada e adequada, estado `aria-pressed`, checklist, conclusão, remoção e anúncios foram exercitados; o progresso foi restaurado para não concluído;
- a página de fontes exibiu as 15 referências novas e a data editorial atualizada.

Não foram executados nesta entrega: todas as alternativas e checklists das cinco trilhas; 320, 768 e 1280 pixels; zoom real de 400%; percurso somente por teclado; NVDA; alto contraste do sistema; transição real de `cicero-v33` para `cicero-v36`; segunda visita offline; inspeção sistemática do console; auditoria especializada; GitHub Pages. Não há declaração de conformidade WCAG completa nem de revisão educacional, trabalhista, assistencial ou regulatória especializada.

## Validação da consolidação 3.9.0

Executada em 18 de outubro de 2026:

- `npm test` e as verificações de sintaxe de `app.js`, `router.js`, `search.js`, `storage.js`, `sw.js` e `server.js`: aprovados;
- conteúdo preservado com 63 trilhas, 296 termos e 162 fontes; exatamente sete eixos válidos, sem colisão de IDs, duplicidade ou trilha sem eixo: aprovado;
- versões `3.9.0`, `cicero-v37` e `?v=37`: sincronizadas;
- home apresentou sete cartões de eixo, progresso global e contagens por eixo; o catálogo completo apresentou sete seções e cada uma das 63 trilhas exatamente uma vez;
- as rotas dos sete eixos apresentaram respectivamente 18, 7, 4, 8, 9, 9 e 8 trilhas; uma trilha de cada eixo foi aberta e retornou ao eixo correto;
- conclusão e remoção de uma trilha atualizaram o progresso de seu eixo e preservaram o progresso local que já existia antes do teste;
- busca por `cadastro unico`, página de glossário, página com 162 fontes, rota inexistente e navegação principal foram verificadas por HTTP local;
- home e catálogo foram verificados em 320, 768 e 1280 pixels sem rolagem horizontal; o catálogo manteve as 63 trilhas nas três larguras;
- um fluxo limpo por home, catálogo, eixos, trilhas, busca, fontes e rota inexistente não produziu avisos ou erros no console;
- as 162 fontes foram reabertas: 150 responderam diretamente ou por redirecionamento; 11 recusaram o cliente automatizado com `403` por proteção do servidor e uma exigiu JavaScript. As 12 foram conferidas por seus índices institucionais; duas URLs efetivamente inválidas foram substituídas por páginas oficiais equivalentes;
- a auditoria editorial interna registrou eixo, fronteira pedagógica, sensibilidade temporal, reabertura de fontes e necessidade de revisão especializada para todas as 63 trilhas em `content-audit.md`.

Não foram executados nesta entrega: zoom real de navegador em 400%; percurso completo somente por teclado; NVDA ou outro leitor de tela; alto contraste ativado no sistema operacional; falha simulada de `content.json`; transição real do cache `cicero-v36` para `cicero-v37`; segunda visita sem rede; instalação como PWA; GitHub Pages; revisão jurídica, médica, financeira, estatística, educacional ou regulatória por especialistas. O projeto não declara conformidade WCAG completa nem revisão especializada do catálogo.

## Validação técnica 3.10.0

Executada em 18 de outubro de 2026:

- `npm test` e verificações de sintaxe de aplicação, rotas, busca, progresso, preferências, bootstrap, Service Worker e servidor: aprovados;
- sete eixos, 63 trilhas, 296 termos, 162 fontes e `reviewedAt` foram preservados;
- versão `3.10.0`, cache `cicero-v38` e recursos `?v=38`: sincronizados;
- preferências válidas, valores desconhecidos, JSON local inválido, aplicação em `data-*`, restauração e independência do progresso: aprovados pelo teste automatizado;
- manifesto sem erros de leitura, PNGs com dimensões reais de 192 e 512 pixels, ícone maskable, ícone Apple e favicon local: aprovados;
- Ajuda abriu com oito seções e foco no conteúdo; com `content.json` bloqueado, Ajuda e Acessibilidade permaneceram disponíveis, enquanto a home apresentou `role="alert"`, busca desabilitada e nova tentativa;
- Menu, Busca e Acessibilidade mantiveram exclusão mútua. Em largura móvel, `Escape` fechou a busca e reabriu o menu com foco no acionador; fechar o diálogo devolveu foco ao botão Acessibilidade;
- os cinco links e três botões independentes do cabeçalho mediram ao menos 44 pixels CSS e declararam `touch-action: manipulation`;
- home, catálogo e Ajuda foram verificados em 320, 360, 390, 412, 768, 820, 1024 × 600, 1366 × 768, 1440 × 900 e 1920 × 1080 sem rolagem horizontal;
- celular e tablets foram verificados em retrato e paisagem; 1280 × 720 e 1920 × 1080 foram verificados com texto em 100%, 125% e 150%;
- texto em 150% combinado a espaçamento confortável, fonte sem serifa, tema escuro, contraste alto, links reforçados e movimento reduzido não criou overflow em 320 pixels nas rotas principais e em uma trilha com tabelas;
- contraste medido no tema escuro foi de 16,17:1 para corpo, 11,32:1 para título e 12,02:1 para botão; no tema escuro com contraste alto, os pares funcionais medidos ficaram em 17,64:1 ou 21:1;
- emulação de `prefers-reduced-motion` e `forced-colors` foi reconhecida; transições ficaram em `0,00001s`;
- segunda visita sem rede carregou home e os sete eixos depois da primeira visita on-line;
- os fluxos finais não produziram avisos ou erros no console;
- o progresso local preexistente permaneceu em uma trilha concluída após restaurar as preferências de teste.

Não foram executados: zoom real de navegador em 200% ou 400%; NVDA, Narrador, VoiceOver, TalkBack ou ChromeVox; teste em celular, tablet, Chromebook ou projetor físico; caneta; instalação iniciada pelo sistema; transição real de `cicero-v37` para `cicero-v38`; GitHub Pages; auditoria WCAG independente. Viewports e emulação de mídia não são apresentados como substitutos desses testes.

## Validação da numeração 3.10.1

Executada em 18 de outubro de 2026:

- `npm test` e verificações de sintaxe JavaScript: aprovados;
- ordem pedagógica exata dos sete eixos: validada automaticamente;
- numeração visual derivada das posições do eixo e da trilha no formato `EE.TT`: validada;
- IDs, URLs, progresso local, 63 trilhas, 296 termos, 162 fontes e `reviewedAt`: preservados;
- versão `3.10.1`, cache `cicero-v39` e recursos `?v=39`: sincronizados;
- catálogo completo aberto por HTTP em uma sessão nova: a nova ordem apareceu nos sete eixos, e `Reserva de emergência` abriu pela mesma URL estável com retorno para `Dinheiro e consumo`;
- a primeira aba estava sem servidor disponível e não foi usada como evidência de atualização real do cache anterior.

Não foram repetidos nesta alteração: matriz completa de viewports, zoom real, tecnologias assistivas, segunda visita offline, atualização controlada a partir de `cicero-v38`, instalação PWA, GitHub Pages ou auditoria WCAG. Esta alteração não constitui nova revisão editorial das trilhas.

## Validação da expansão 3.11.0

Executada em 18 de outubro de 2026:

- `npm test` e verificações de sintaxe JavaScript: aprovados;
- sete eixos, 65 trilhas, 306 termos e 167 fontes: validados, sem ID duplicado, referência quebrada, trilha sem eixo ou mudança no contrato;
- ordem visual validada: reparos em `03.03` e cuidados na internet em `04.03`;
- versão `3.11.0`, cache `cicero-v40` e recursos `?v=40`: sincronizados;
- buscas sem acento para os nove conceitos novos: aprovadas automaticamente; `manutencao preventiva` e `gerenciador senhas` também retornaram as trilhas e termos esperados no navegador;
- limites domésticos obrigatórios, ausência de instrução perigosa e limites de segurança digital: protegidos por testes textuais;
- as cinco fontes novas foram abertas em seus sites institucionais e responderam diretamente;
- catálogo e as duas trilhas foram abertos por HTTP. O navegador expôs `03.03` e `04.03`, títulos, objetivos, cinco etapas, cenário, checklist, dez termos por trilha e retorno ao eixo correto;
- na trilha de internet, a alternativa adequada recebeu `aria-pressed="true"`, um item do checklist respondeu ao controle e conclusão/remoção restaurou o estado inicial;
- o console da trilha de internet não registrou aviso ou erro.

Não verificado nesta entrega: zoom real de 400%, NVDA, alto contraste, movimento reduzido, visita offline, atualização real de `cicero-v39`, GitHub Pages e matriz física de dispositivos. A tentativa de variar o viewport automatizado do navegador manteve a largura efetiva em 1265 pixels, portanto 320, 768 e 1280 pixels não foram registrados como testados.

## Validação de lançamento 4.0.0

Executada em 18 de outubro de 2026:

- `npm test` e verificações de sintaxe de todos os módulos JavaScript e do Service Worker: aprovados;
- versão `4.0.0`, cache `cicero-v41` e recursos `?v=41`: sincronizados;
- sete eixos, 65 trilhas, 306 termos, 167 fontes e `reviewedAt`: preservados;
- auditoria interna orientada a risco cobriu vinte trilhas e 62 referências; 53 responderam ao cliente automatizado e nove páginas do Planalto foram confirmadas separadamente no navegador;
- menu e Ajuda foram percorridos por teclado; busca abriu, focou o campo, fechou por `Escape` e devolveu foco ao acionador;
- diálogo abriu pelo teclado e devolveu foco ao botão da página Ajuda após a correção do acionador;
- cenário, checklist, conclusão e remoção foram acionados por `Enter` ou `Espaço`, com estado textual e foco no `main` após rerenderização;
- home, catálogo, Ajuda, reparos e impostos foram verificados em 320 × 568, 768 × 1024, 1024 × 600, 1280 × 720 e 1920 × 1080 sem overflow da página;
- reflow equivalente a 400% foi exercitado em 320 pixels; a tabela manteve rolagem dentro da região nomeada;
- emulação de `forced-colors` preservou borda de dois pixels e removeu sombra; `prefers-reduced-motion` aplicou rolagem automática e transição de `0,00001s`;
- manifesto foi lido sem erros; Service Worker controlou a página com escopo raiz, criou somente `cicero-v41` e armazenou os 16 recursos essenciais;
- depois da primeira visita on-line, a rota Ajuda recarregou sem rede com título e conteúdo completos;
- revisão visual da home em 1280 × 720 e da trilha de reparos não encontrou corte, sobreposição ou perda de hierarquia;
- console sem erros ou avisos nos fluxos finais.
- GitHub Pages concluiu o build do commit `3f47132633020bd3e76c0fb87a33d83c4dc99864`; HTML, JSON, manifesto e Service Worker responderam `200` por HTTPS;
- na página pública, recursos `?v=41`, escopo `/Cicero/`, controle pelo Service Worker e cache `cicero-v41` foram confirmados sem erro ou aviso no console.

## Validação local 4.1.0 — 25/10/2026

### Automatizado

- `npm test`: aprovado com sete eixos, 66 trilhas, 314 termos, 172 fontes e `reviewedAt` geral preservado em 18/10/2026;
- `node --check` nos módulos JavaScript e no Service Worker: aprovado;
- `git diff --check`: aprovado;
- IDs, posição `03.06`, seis linhas da tabela, oito termos, cinco fontes, hosts exatos, tema, buscas sem acento e limites textuais: aprovados;
- comparação estrutural durante a edição: as 65 trilhas, 306 termos e 167 fontes anteriores permaneceram integralmente iguais; somente o resumo do eixo recebeu a ampliação prevista;
- pacote `4.1.0`, cache `cicero-v42` e recursos `?v=42`: sincronizados.

### Navegador por HTTP local

- eixo `moradia-servicos`: seis trilhas na ordem esperada e mecânica em `03.06`;
- trilha, tabela semântica, cinco fontes e oito termos: abertos; todos os termos retornaram backlink para a trilha;
- três respostas do cenário: respostas inadequadas e adequada anunciaram o retorno esperado;
- checklist, conclusão e remoção: executados; foco retornou ao `main` e os anúncios globais foram emitidos;
- progresso anterior `credito`: preservado antes, durante e depois da atualização e do teste da nova trilha;
- atualização real no navegador local: `cicero-v41` foi removido e apenas `cicero-v42` permaneceu;
- segunda carga sem rede: a rota da trilha reabriu pelo cache `cicero-v42`, com título e conteúdo disponíveis; console sem erros ou avisos;
- 320, 768 e 1280 px: sem rolagem horizontal da página; em 320 px, a tabela excedeu somente sua região rolável e respondeu à seta do teclado;
- tema escuro, contraste alto e redução de movimento: aplicados em conjunto; foco visível confirmado na região da tabela; padrões locais restaurados após o teste;
- cores forçadas e redução de movimento do sistema: emulação reconhecida; `scroll-behavior` ficou `auto`.

### Não executado

- leitor de tela, conforme solicitação;
- revisão por profissional de mecânica, teste em carro real e validação de diagnóstico, que permanecem fora do escopo;
- commit, push, GitHub Pages e validação pública, que não foram solicitados;
- dispositivos físicos de 320/768/1280 px: as larguras foram emuladas no navegador local.

## Validação local 4.2.0 — 25/10/2026

### Automatizado

- `npm test`: aprovado com sete eixos, 68 trilhas, 324 termos, 180 fontes e `reviewedAt` geral atualizado para 25/10/2026 após a revisão de legibilidade;
- `node --check` em `app.js`, `search.js`, `router.js` e `sw.js`: aprovado;
- IDs, posições 03.07 e 03.08, ordem anterior, referências cruzadas, cenários, temas e hosts: aprovados;
- buscas sem acento pelos dez conceitos novos e limites textuais de trânsito, alimentação e saneantes: aprovados;
- todas as perguntas terminam com interrogação; nenhuma trilha possui alternativa ou item de checklist repetido; todas as etapas têm no máximo 500 caracteres;
- pacote `4.2.0`, cache `cicero-v43` e recursos `?v=43`: sincronizados.

### Fontes

- as 180 URLs foram testadas em 25/10/2026: 149 responderam diretamente;
- 31 recusaram o cliente automatizado por TLS, proteção antirrobô, exigência de JavaScript ou método HTTP; as páginas institucionais críticas do Planalto, Câmara, MRE e Portal da Transparência foram confirmadas pelo navegador de pesquisa;
- a cartilha de boas práticas redirecionou para o PDF oficial equivalente no mesmo host da Anvisa; nenhum endereço precisou ser substituído e nenhum host foi acrescentado à lista permitida.

### Navegador por HTTP local

- eixo `moradia-servicos`: oito trilhas na ordem esperada, preservando mecânica em 03.06 e exibindo mobilidade e alimentação em 03.07 e 03.08;
- as duas trilhas abriram com objetivos, treze etapas ao todo, cenários, checklists, termos e retorno ao eixo;
- alternativas inadequadas e adequadas produziram os retornos esperados e atualizaram `aria-pressed`;
- checklist, conclusão e remoção funcionaram nas duas trilhas, com anúncios globais; o estado final foi restaurado para não concluído;
- os dez termos abriram por rota própria e mostraram backlink para a trilha correta; a página de fontes exibiu as oito referências novas e total de 180;
- as dez consultas previstas retornaram o termo esperado com e sem acentos;
- 320, 768 e 1280 pixels não apresentaram overflow horizontal;
- tema escuro, contraste alto e movimento reduzido foram aplicados pelos controles locais e restaurados ao padrão; `forced-colors` e `prefers-reduced-motion` também foram reconhecidos por emulação;
- o Service Worker controlou a página e o armazenamento apresentou somente `cicero-v43`; uma recarga posterior com a rede desativada reabriu a trilha de alimentação sem erro;
- console sem avisos ou erros nas duas trilhas e na visita offline.

### Não executado

- leitor de tela, conforme solicitação;
- zoom real de 400%: a ferramenta programática foi limitada pelo navegador a 300%; o reflow em 320 pixels foi aprovado, mas não substitui o teste real;
- transição observada desde um cache comprovadamente presente `cicero-v42`: após a atualização, somente `cicero-v43` foi encontrado;
- dispositivos físicos, revisão especializada em trânsito ou segurança dos alimentos, commit, push e GitHub Pages.

Não executados: NVDA e qualquer outro leitor de tela, retirados do aceite por solicitação do usuário; zoom real pela interface do navegador; dispositivo físico, toque físico, caneta, Safari, Firefox e Edge externos; abertura pelo ícone instalado; auditoria WCAG independente. O comando de diagnóstico de instalabilidade do navegador não retornou resultado, portanto manifesto válido, Service Worker e offline não são descritos como confirmação do prompt de instalação em todos os navegadores.
