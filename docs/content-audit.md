# Auditoria de conteúdo 3.11.0

## Objetivo e alcance

Esta auditoria consolida a organização das 65 trilhas e registra a revisão interna feita em 18 de outubro de 2026. Ela verificou estrutura, fronteiras entre assuntos, repetição literal, relações com glossário, uso das fontes e sinais de conteúdo sensível ao tempo. Não constitui revisão jurídica, financeira, clínica, educacional, de manutenção doméstica ou de segurança cibernética especializada.

Todas as trilhas preservam uma pergunta prática, objetivos, pelo menos três etapas, cenário, checklist, termos, fontes e limite geral. A comparação automatizada encontrou apenas uma frase curta repetida, “Guardei o protocolo e a resposta.”, em contextos nos quais a mesma ação é deliberadamente aplicável. Nenhuma fonte ficou sem uso.

## Revisão das fontes

As 162 URLs da auditoria geral foram reabertas em 18 de outubro de 2026. Destas, 150 responderam diretamente e doze exigiram confirmação indireta. As cinco fontes acrescentadas na versão 3.11.0 foram abertas novamente na mesma data e responderam diretamente, levando o catálogo a 167 referências. Sua aderência foi conferida nas páginas da ANEEL, Corpo de Bombeiros Militar da Bahia, Inmetro, CERT.br e Anatel.

Duas URLs que retornavam 404 foram substituídas por referências institucionais equivalentes e acessíveis:

- `mdic-padis`: serviço federal sobre incentivos do PADIS;
- `nist-exame-midia-digital`: publicação do NIST sobre o Open Media Forensics Challenge.

Na matriz, `OK` significa resposta HTTP direta; `OK*` significa confirmação indireta por bloqueio automatizado. Nenhum desses estados garante vigência permanente ou valida sozinho todas as afirmações da trilha.

## Matriz das trilhas

Todas as linhas possuem situação “revisão interna concluída” e revisão especializada pendente. “Temporal” indica que regras, indicadores, instituições, programas ou canais devem ser reconferidos antes de publicação futura. O código `EE.TT` identifica o eixo e a posição pedagógica da trilha; ele é visual e não substitui o ID estável.

| Código | Trilha | Eixo | Fronteira ou sobreposição controlada | Temporal | Fontes | Especialista |
|---:|---|---|---|:---:|:---:|---|
| 01.01 | `primeiro-salario` | Dinheiro e consumo | Introdução ao recebimento; contracheque detalha o documento | Sim | OK | Pendente |
| 01.02 | `contracheque` | Dinheiro e consumo | Leitura do recibo; direitos no trabalho trata o vínculo | Sim | OK | Pendente |
| 01.03 | `orcamento` | Dinheiro e consumo | Organização mensal; metas e reserva tratam finalidades específicas | Não | OK | Pendente |
| 01.04 | `reserva-emergencia` | Dinheiro e consumo | Proteção contra imprevisto; metas trata objetivo planejado | Não | OK | Pendente |
| 01.05 | `metas-planejamento-financeiro` | Dinheiro e consumo | Objetivos e prioridades; orçamento acompanha o mês | Não | OK | Pendente |
| 01.06 | `banco-pix` | Dinheiro e consumo | Uso e prevenção; golpes-resposta trata ação após suspeita | Sim | OK | Pendente |
| 01.07 | `credito` | Dinheiro e consumo | Contratação de crédito; dívidas trata dificuldade posterior | Sim | OK | Pendente |
| 01.08 | `juros-selic` | Dinheiro e consumo | Taxas e comparação; política econômica explica o canal institucional | Sim | OK | Pendente |
| 01.09 | `dividas-renegociacao` | Dinheiro e consumo | Conferência e proposta; crédito trata contratação inicial | Sim | OK | Pendente |
| 01.10 | `financiamento-consorcio` | Dinheiro e consumo | Modalidades para aquisição; crédito apresenta fundamentos gerais | Sim | OK | Pendente |
| 01.11 | `compra-consciente` | Dinheiro e consumo | Decisão anterior à compra; reclamação trata problema posterior | Sim | OK | Pendente |
| 01.12 | `contratos-assinaturas` | Dinheiro e consumo | Leitura contratual geral; trilhas setoriais aplicam o processo | Sim | OK | Pendente |
| 01.13 | `seguros-protecao` | Dinheiro e consumo | Transferência contratual de risco; reserva mantém liquidez própria | Sim | OK | Pendente |
| 01.14 | `previdencia-futuro` | Dinheiro e consumo | Sistemas previdenciários; investimentos permanece conceito geral | Sim | OK | Pendente |
| 01.15 | `investimentos-basicos` | Dinheiro e consumo | Conceitos anteriores à escolha; metas define objetivo e prazo | Sim | OK | Pendente |
| 01.16 | `impostos-cotidiano` | Dinheiro e consumo | Identificação tributária; políticas econômicas trata mecanismos agregados | Sim | OK | Pendente |
| 01.17 | `inflacao-poder-compra` | Dinheiro e consumo | Preços e orçamento; estatística trata leitura dos números | Sim | OK* | Pendente |
| 01.18 | `cambio` | Dinheiro e consumo | Operação cotidiana; moedas internacionais trata o sistema entre países | Sim | OK | Pendente |
| 02.01 | `escolha-curso-instituicao` | Trabalho e educação | Verificação anterior à matrícula; matrícula trata contratação | Sim | OK* | Pendente |
| 02.02 | `matricula-bolsas-financiamento-estudantil` | Trabalho e educação | Contratação educacional; crédito e contratos fornecem conceitos gerais | Sim | OK | Pendente |
| 02.03 | `processos-seletivos-transicao-profissional` | Trabalho e educação | Candidatura e entrevista; entrada no trabalho começa na oferta | Sim | OK | Pendente |
| 02.04 | `entrada-trabalho` | Trabalho e educação | Oferta e admissão; processos seletivos começa antes da proposta | Sim | OK | Pendente |
| 02.05 | `direitos-no-trabalho` | Trabalho e educação | Acompanhamento do vínculo; entrada trata admissão | Sim | OK | Pendente |
| 02.06 | `renda-autonoma-mei` | Trabalho e educação | Organização da atividade; entrada no trabalho trata vínculo recebido | Sim | OK | Pendente |
| 02.07 | `atividade-economica-trabalho` | Trabalho e educação | Indicadores de produção e trabalho; estatística ensina leitura | Sim | OK* | Pendente |
| 03.01 | `aluguel-moradia` | Moradia e serviços | Locação; serviços essenciais trata contas vinculadas ao imóvel | Sim | OK | Pendente |
| 03.02 | `servicos-essenciais-moradia` | Moradia e serviços | Contas e encerramento; aluguel trata ocupação e contrato do imóvel | Sim | OK | Pendente |
| 03.03 | `reparos-manutencao-casa` | Moradia e serviços | Observação, contenção e contratação; serviços essenciais trata contratos e faturas | Sim | OK | Pendente |
| 03.04 | `servicos-publicos-atendimento` | Moradia e serviços | Atendimento público geral; trilhas setoriais indicam portas específicas | Sim | OK | Pendente |
| 03.05 | `reclamacao-consumidor` | Moradia e serviços | Processo de reclamação; ajuda trata instituições jurídicas mais amplas | Sim | OK | Pendente |
| 04.01 | `documentos-govbr` | Direitos, saúde e proteção | Identidade e acesso; direitos digitais trata uso de dados | Sim | OK | Pendente |
| 04.02 | `direitos-digitais` | Direitos, saúde e proteção | Proteção de dados; golpes trata contenção de fraude | Sim | OK | Pendente |
| 04.03 | `cuidados-basicos-internet` | Direitos, saúde e proteção | Prevenção em dispositivo e conta; golpes trata resposta posterior e direitos digitais trata dados pessoais | Sim | OK | Pendente |
| 04.04 | `golpes-resposta` | Direitos, saúde e proteção | Contenção posterior; banco, dados e contratos previnem situações | Sim | OK | Pendente |
| 04.05 | `saude-sus` | Direitos, saúde e proteção | Rede pública; planos-saude trata saúde suplementar | Sim | OK | Pendente |
| 04.06 | `planos-saude` | Direitos, saúde e proteção | Contrato e ANS; SUS trata portas públicas | Sim | OK | Pendente |
| 04.07 | `assistencia-social-beneficios` | Direitos, saúde e proteção | Rede assistencial; proteção trata violações e risco | Sim | OK | Pendente |
| 04.08 | `ajuda-resolucao-conflitos` | Direitos, saúde e proteção | Conflitos civis; proteção separa perigo e emergência | Sim | OK | Pendente |
| 04.09 | `protecao-emergencia-denuncia` | Direitos, saúde e proteção | Risco e proteção; ajuda trata conflito sem perigo imediato | Sim | OK | Pendente |
| 05.01 | `constituicao-federal` | Estado e política | Texto constitucional; demais trilhas aplicam estruturas específicas | Sim | OK | Pendente |
| 05.02 | `federacao-competencias` | Estado e política | Distribuição federativa; serviços públicos aplica a busca do órgão | Sim | OK | Pendente |
| 05.03 | `poderes-processo-legislativo` | Estado e política | Formação de atos; Justiça e controle diferencia instituições | Sim | OK | Pendente |
| 05.04 | `justica-controle-instituicoes` | Estado e política | Funções de justiça e controle; ajuda trata acesso pelo cidadão | Sim | OK | Pendente |
| 05.05 | `eleicoes-representacao` | Estado e política | Sistemas eleitorais; participação trata canais não eleitorais | Sim | OK | Pendente |
| 05.06 | `orcamento-publico` | Estado e política | Planejamento e execução; política fiscal apresenta contexto econômico | Sim | OK | Pendente |
| 05.07 | `politicas-economicas` | Estado e política | Política monetária e fiscal; orçamento detalha o processo público | Sim | OK* | Pendente |
| 05.08 | `politicas-publicas` | Estado e política | Ciclo da política; orçamento trata recursos e informação trata avaliação | Sim | OK | Pendente |
| 05.09 | `participacao-transparencia-fiscalizacao` | Estado e política | Canais e dados; serviços públicos trata atendimento individual | Sim | OK | Pendente |
| 06.01 | `comercio-cadeias-globais` | Brasil e mundo | Cadeias produtivas; energia e tecnologia aprofundam insumos | Sim | OK | Pendente |
| 06.02 | `energia-recursos-estrategicos` | Brasil e mundo | Recursos e fornecimento; cadeias trata circulação geral | Sim | OK* | Pendente |
| 06.03 | `moedas-sistema-internacional` | Brasil e mundo | Reservas e pagamentos; câmbio trata operação cotidiana | Sim | OK* | Pendente |
| 06.04 | `blocos-organizacoes-internacionais` | Brasil e mundo | Tipos institucionais; relações do Brasil trata competências nacionais | Sim | OK | Pendente |
| 06.05 | `migracao-refugio-deslocamento` | Brasil e mundo | Conceitos jurídicos gerais; assistência trata rede brasileira | Sim | OK* | Pendente |
| 06.06 | `clima-cooperacao-internacional` | Brasil e mundo | Instrumentos climáticos; políticas públicas trata implementação | Sim | OK | Pendente |
| 06.07 | `tecnologia-poder-internacional` | Brasil e mundo | Infraestrutura e dependências; cadeias trata produção ampla | Sim | OK | Pendente |
| 06.08 | `sancoes-economicas` | Brasil e mundo | Alcance jurídico e efeitos; comércio trata fluxos sem restrição específica | Sim | OK | Pendente |
| 06.09 | `brasil-relacoes-internacionais` | Brasil e mundo | Atuação brasileira; organizações trata formatos institucionais | Sim | OK* | Pendente |
| 07.01 | `evidencia-qualidade-fontes` | Informação e decisão | Avaliação de origem e método; verificação aplica a conteúdos digitais | Sim | OK | Pendente |
| 07.02 | `estatistica-cotidiano` | Informação e decisão | Medidas básicas; gráficos e pesquisas trata apresentação e método | Não | OK* | Pendente |
| 07.03 | `graficos-pesquisas` | Informação e decisão | Visualização e amostragem; estatística explica medidas | Não | OK* | Pendente |
| 07.04 | `correlacao-causalidade-incerteza` | Informação e decisão | Explicações causais; decisão usa incerteza para escolher ação | Não | OK | Pendente |
| 07.05 | `argumentos-falacias-vieses` | Informação e decisão | Estrutura do raciocínio; propaganda trata técnicas de influência | Não | OK | Pendente |
| 07.06 | `propaganda-persuasao` | Informação e decisão | Persuasão; desinformação exige alegação falsa ou enganosa e intenção | Sim | OK* | Pendente |
| 07.07 | `desinformacao-verificacao` | Informação e decisão | Processo de verificação; evidência trata qualidade geral de fontes | Sim | OK | Pendente |
| 07.08 | `decisao-informacao-incompleta` | Informação e decisão | Escolha sob incerteza; causalidade examina explicações | Não | OK* | Pendente |

## Resultado

- As 65 trilhas possuem fronteiras pedagógicas identificáveis; nenhuma foi removida ou fundida.
- A sobreposição encontrada funciona como reforço de processos transversais, principalmente conferência, registro, protocolo e uso de canal oficial.
- Não foram incorporados valores correntes, novos prazos ou novas regras temporárias.
- A taxonomia de eixo é exclusiva para navegação; relações secundárias continuam no glossário.
- A revisão por especialistas permanece obrigatória antes de qualquer alegação de auditoria substantiva ou conformidade completa.

## Revisão parcial 4.1.0 — 25/10/2026

A matriz histórica acima permanece referente à revisão de 18/10/2026. A nova entrega totaliza 66 trilhas, 314 termos e 172 fontes, sem alterar o conteúdo das 65 trilhas anteriores nem o campo geral reviewedAt.

| Trilha | Eixo e posição | Sobreposição | Distinção | Sensibilidade temporal | Situação | Revisão especializada |
|---|---|---|---|---|---|---|
| mecanica-basica-carro | moradia-servicos, 03.06 | reparos-manutencao-casa; contratos-assinaturas; reclamacao-consumidor | Sistemas e sinais de carros; contratação reutiliza conceitos existentes | Manual por modelo, especificações e intervalos; sem valores universais | Revisão editorial interna, sete etapas, quadro de seis sinais, cenário e limites | Profissional de mecânica pendente |

As cinco URLs abaixo foram reabertas em 25/10/2026; todas retornaram conteúdo legível no endereço indicado, sem substituição ou redirecionamento de destino reportado pelo navegador de pesquisa. A confirmação é de acessibilidade e aderência, não de independência comercial ou certificação técnica.

| Fonte reaberta | Organização | Aderência e limite |
|---|---|---|
| [prf-orientacoes-veiculo](https://www.gov.br/prf/pt-br/seguranca-viaria/orientacoes-de-viagem) | Polícia Rodoviária Federal | Revisão e itens externos antes de viajar. |
| [dnit-manutencao-veiculo](https://www.gov.br/dnit/pt-br/assuntos/noticias/manutencao-preventiva-gera-mais-seguranca-no-transito) | Departamento Nacional de Infraestrutura de Transportes | Manutenção conforme veículo e uso; não diagnostica ruídos de suspensão. |
| [ford-manual-advertencias](https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G1841481&Uid=G1841480&buildtype=web&countryCode=BRA&div=f&languageCode=pt&userMarket=bra&vFilteringEnabled=False&variantid=6303) | Ford Motor Company (fabricante; interesse comercial) | Advertências de freio, óleo e temperatura; manual específico. |
| [bosch-sinais-freios](https://am.boschcarservice.com/br/pt/nossos-servicos/sistema-de-freio/manutencao-dos-freios/) | Bosch Car Service (rede comercial de serviços) | Sinais de frenagem e inspeção; texto comercial não incorporado. |
| [nakata-sinais-homocinetica](https://www.nakata.com.br/sala-de-imprensa/indicios-de-que-a-junta-homocinetica-pode-estar-comprometida) | Nakata (fabricante; interesse comercial) | Estalos em curvas e homocinética como possibilidade; sem generalizar periodicidade. |

O mapeamento por linha e suas limitações estão em [auditoria de risco](risk-audit.md).

## Revisão parcial 4.2.0 — 25/10/2026

A matriz histórica e a revisão parcial 4.1.0 permanecem válidas. A nova entrega totaliza 68 trilhas, 324 termos e 180 fontes, sem alterar o conteúdo das 66 trilhas anteriores nem o campo geral `reviewedAt`.

| Trilha | Eixo e posição | Sobreposição | Distinção | Sensibilidade temporal | Situação | Revisão especializada |
|---|---|---|---|---|---|---|
| mobilidade-transito-cotidiano | moradia-servicos, 03.07 | documentos-govbr; servicos-publicos-atendimento; mecanica-basica-carro; seguros-protecao | Planejamento, documentos, responsabilidade institucional e resposta inicial a ocorrência; não ensina direção, seguro ou mecânica | Serviços, documentos, competências e procedimentos locais; sem taxas, pontos ou calendários | Revisão editorial interna, seis etapas, cenário, checklist e limites | Especialista em trânsito e revisão jurídica pendentes |
| alimentacao-seguranca-casa | moradia-servicos, 03.08 | orcamento; compra-consciente; saude-sus; reparos-manutencao-casa | Compra, rótulo, conservação, contaminação cruzada e saneantes; não prescreve dieta, receita ou tratamento | Regras sanitárias, rótulos e orientação sobre saneantes; sem tempo ou temperatura universal | Revisão editorial interna, sete etapas, cenário, checklist e limites | Profissional de segurança dos alimentos e toxicologia pendente |

As oito referências novas foram reabertas em 25/10/2026 nos endereços oficiais. As páginas da Lei de Mobilidade Urbana, Serviços de Trânsito, Código de Trânsito, acidentes em rodovias federais, Guias Alimentares, Boas Práticas da Anvisa, rotulagem e mistura de saneantes estavam acessíveis. A cartilha de boas práticas redirecionou para o arquivo PDF oficial equivalente no mesmo host. Nenhuma fonte foi substituída e nenhum host foi acrescentado à lista permitida.

Esta revisão confirma aderência ao recorte e disponibilidade na data indicada. Não constitui auditoria especializada, confirmação de regra local nem revisão integral das 180 fontes.

## Revisão geral de legibilidade — 25/10/2026

As 68 trilhas foram verificadas quanto a títulos, perguntas, objetivos, extensão das etapas, cenários, alternativas, checklists e repetição literal. Não foram encontrados títulos, perguntas, cenários, alternativas ou itens de checklist duplicados, nem perguntas sem interrogação final. As 66 trilhas que já respeitavam o padrão foram preservadas. Mecânica foi condensada por ser o único desvio amplo de extensão; uma etapa de mobilidade recebeu ajuste equivalente. Todos os blocos de etapa passaram a ter no máximo 500 caracteres, sem remover encaminhamentos ou limites de segurança.

As 180 referências foram testadas novamente. Cento e quarenta e nove responderam diretamente; 31 recusaram o cliente automatizado por negociação TLS, proteção antirrobô, exigência de JavaScript ou método HTTP. As páginas críticas do Planalto, Câmara dos Deputados, Portal da Transparência e Portal Consular foram confirmadas pelo navegador de pesquisa. Nenhuma URL foi substituída.

O campo geral `reviewedAt` passou para `2026-10-25`. Essa data representa revisão editorial e técnica do catálogo, não certificação por especialistas das áreas tratadas.
