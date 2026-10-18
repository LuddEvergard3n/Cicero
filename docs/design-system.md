# Sistema visual

## Direção

O Cícero usa a linguagem de um guia editorial contemporâneo: informação direta, títulos expressivos, numeração visível, superfícies que lembram papel e cores que ajudam a distinguir assuntos. O objetivo é transmitir autonomia e clareza sem assumir aparência bancária, governamental ou infantil.

A interface é construída somente com HTML semântico, CSS e JavaScript nativos. Não há fonte remota, CDN, biblioteca de componentes, framework, imagem externa ou dependência de execução.

## Referências consultadas

| Referência | Uso no projeto |
|---|---|
| [Codrops](https://tympanus.net/codrops/) | Composição editorial, escala tipográfica e ritmo entre blocos. |
| [Uiverse](https://uiverse.io/) | Observação de microinterações e estados de controles. |
| [Open Props](https://open-props.style/) | Referência para escalas consistentes de espaço, sombra e movimento. |
| [W3C Design System](https://design-system.w3.org/) | Semântica, aprimoramento progressivo e organização de componentes. |
| [U.S. Web Design System](https://designsystem.digital.gov/) | Padrões de foco, contraste, orientação e conteúdo acessível. |

As referências orientaram decisões, mas nenhum componente ou trecho de código de terceiros foi incorporado. Todo o sistema visual foi implementado localmente para preservar propriedade, auditabilidade e funcionamento offline.

## Fundamentos

### Cores

- `--paper` é o fundo quente da aplicação.
- `--surface` e `--surface-strong` separam conteúdo sem depender de sombras suaves.
- `--forest` é a cor principal de títulos, botões e bordas relevantes.
- `--accent` marca rótulos editoriais e chamadas de atenção.
- `--focus`, `--success` e `--warning` são reservadas a estados funcionais.
- Cada trilha define `--track` e `--track-soft` por meio do atributo `data-track`.

Cor nunca é o único indicador: conclusão inclui texto, cenário selecionado usa `aria-pressed` e foco mantém contorno explícito.

### Tipografia

Títulos usam `Georgia` com fallback serifado nativo. Corpo, controles e metadados usam a pilha de fontes do sistema. Isso evita downloads, bloqueios de renderização e diferenças entre modo online e offline.

### Espaço e forma

Os tokens `--space-1` a `--space-6` controlam o ritmo vertical. Bordas escuras, sombras deslocadas, números e círculos em CSS formam a identidade. Elementos decorativos não recebem significado e são escondidos de tecnologias assistivas.

## Componentes

### Cabeçalho e busca

O cabeçalho apresenta marca, navegação, busca e acesso às preferências. A rota atual usa `aria-current="page"`. Abaixo de 900 pixels, um botão com estado expandido controla a navegação completa. Busca, menu e diálogo não permanecem abertos simultaneamente.

### Ajuda e acessibilidade

A rota Ajuda reutiliza painéis e títulos do sistema para explicar navegação, progresso, teclado, toque, instalação e limites. O painel de acessibilidade usa `dialog`, grupos de controles nativos e aplicação imediata. Tamanho do texto, espaçamento, fonte dos títulos, realce de links, tema, contraste e movimento são refletidos em atributos `data-*` do elemento raiz.

Tema escuro e alto contraste redefinem tokens, não componentes isolados. Em tema escuro, cores específicas de trilha cedem a uma combinação comum de alto contraste. `forced-colors` continua prevalecendo quando o sistema operacional controla as cores.

### Home

A home segue a ordem: proposta, progresso global, modo de uso, sete eixos e limite editorial. O progresso usa o elemento nativo `progress`. A lista lateral e os cartões de eixo apontam para os mesmos catálogos filtrados.

### Cartões e seções de eixo

Os cartões de eixo reutilizam superfície, borda, sombra, tipografia, foco e movimento dos cartões existentes, sem uma paleta paralela. Cada cartão mostra resumo e progresso textual. O catálogo completo usa seções semânticas para agrupar trilhas; a rota de eixo reutiliza a mesma grade com um recorte do índice editorial.

### Cartões de trilha

Um único gerador produz cartões de trilha para o catálogo completo e para cada eixo. O número usa o formato hierárquico `EE.TT`: os dois primeiros dígitos identificam o eixo e os dois últimos, a posição pedagógica dentro dele. O rótulo é derivado de `axes`, não substitui o ID estável e aparece tanto no cartão quanto na página. Nome, resumo, chamada e estado concluído permanecem textuais. A cor de cada trilha é decorativa e reaparece na respectiva página.

No catálogo de três colunas, um último cartão isolado ocupa a largura da grade para preservar o ritmo editorial. Em telas de uma coluna, ele volta ao fluxo normal.

### Página de trilha

A abertura estabelece número e pergunta prática. Objetivos, etapas, tabelas opcionais, cenário, checklist, termos e limite editorial são regiões visualmente distintas. As opções do cenário são botões nativos; a opção escolhida recebe `aria-pressed="true"` e a explicação continua em uma região anunciada.

### Tabelas editoriais

Tabelas usam legenda visível, cabeçalhos semânticos, bordas sólidas e uma região horizontal rolável com nome acessível. Em telas estreitas, a tabela preserva suas colunas e rola dentro do próprio contêiner; o restante da página não ganha rolagem horizontal. Nota, data e fontes permanecem imediatamente abaixo do quadro.

### Conteúdo de apoio

Glossário, fontes, sobre e rota inexistente usam os mesmos tokens e padrões editoriais. Links externos continuam restritos à bibliografia aprovada em `data/content.json`.

Falhas no carregamento editorial reutilizam a composição da rota inexistente, mas usam `role="alert"`, texto de recuperação e botão de nova tentativa. Mensagens de ações locais ficam em uma região visualmente oculta e não alteram o layout.

## Responsividade e movimento

- Acima de 900 pixels, home e grades aproveitam múltiplas colunas.
- Abaixo de 900 pixels, hero e seções narrativas passam a uma coluna, as grades usam duas e a navegação entra no menu expansível.
- Abaixo de 680 pixels, todas as grades passam a uma coluna e os controles de busca são empilhados.
- Até 360 pixels, a navegação usa duas colunas para impedir rolagem horizontal.
- `prefers-reduced-motion` elimina transições perceptíveis.
- `forced-colors` troca superfícies decorativas por bordas e estados reconhecíveis pelo sistema.
- Controles independentes possuem pelo menos 44 pixels CSS; links em texto corrido mantêm o fluxo de leitura.
- `touch-action: manipulation` reduz atraso de toque sem bloquear zoom do navegador.

## Política de manutenção

- Reutilize os tokens e componentes existentes antes de criar variações.
- Uma nova trilha deve receber cores com contraste verificado e um seletor pelo ID estável. A versão 3.11 possui 65 temas; em tema escuro ou alto contraste, a legibilidade prevalece sobre a diferenciação cromática.
- Um novo eixo deve reutilizar o cartão neutro existente e relacionar apenas IDs publicados; não crie cor ou componente próprio sem necessidade comprovada.
- Não carregue assets externos em tempo de execução.
- Atualize este documento quando tokens, componentes, breakpoints ou regras de acessibilidade forem alterados.
- Valide visualmente desktop, 320 pixels, zoom de 400%, teclado e redução de movimento antes de descrever a interface como concluída.

As trilhas 59 a 63 não introduzem componente novo. Elas usam os cartões, etapas, cenário, checklist, glossário e fontes existentes; apenas os seletores `data-track` recebem combinações de cor já aprovadas, evitando uma segunda linguagem visual para o mesmo tipo de conteúdo.

As trilhas de reparos domésticos e cuidados na internet seguem a mesma regra. Reparos reutiliza `#66513c/#eee2d6`; internet reutiliza `#315f72/#d6e7ed`. Nenhum ícone, alerta especial ou componente novo foi criado.
