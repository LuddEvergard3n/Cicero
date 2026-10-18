# Acessibilidade

## Compromisso

O objetivo da V1 é atender aos requisitos essenciais da WCAG 2.2 nível AA nos fluxos principais. A conformidade completa não deve ser declarada sem auditoria manual e testes com tecnologias assistivas.

## Implementação atual

- Idioma da página definido como `pt-BR`.
- HTML com `header`, `nav`, `main`, `footer`, títulos hierárquicos, listas, `article`, `section` e `aside`.
- Link “Pular para o conteúdo” visível ao receber foco.
- Menu responsivo com botão nativo, estado expandido, fechamento por `Escape` e retorno de foco.
- Foco visível com contraste destacado em links, botões e campos.
- Navegação principal identificada por nome acessível.
- Link da rota atual identificado por `aria-current="page"`.
- Busca com rótulo associado, estado expandido e região de resultados `aria-live`.
- Cenários implementados com botões nativos.
- Opção escolhida no cenário exposta por `aria-pressed` e retorno textual, sem depender somente de cor.
- Checklists implementados com caixas de seleção e rótulos.
- Mensagem de resposta do cenário anunciada por `aria-live`.
- Conclusão, remoção de conclusão e limpeza do progresso anunciadas por uma região global com `role="status"`.
- Falha no conteúdo apresentada com `role="alert"`, foco no conteúdo e ação de nova tentativa.
- Progresso geral e progresso por eixo representados pelo elemento nativo `progress` acompanhado por texto.
- Movimento reduzido respeitado por `prefers-reduced-motion`.
- Preferência local de movimento pode reduzir transições sem sobrepor a escolha mais restritiva do sistema.
- Modo de alto contraste apoiado por regras `forced-colors`.
- Painel global em `dialog` para texto entre 100% e 150%, espaçamento, fonte sem serifa, realce de links, tema escuro, alto contraste e movimento reduzido.
- Preferências são validadas, anunciadas, persistidas separadamente e restauráveis sem apagar progresso.
- Alvos independentes usam dimensão mínima de 44 pixels CSS e `touch-action: manipulation`; zoom do navegador permanece permitido.
- A rota Ajuda descreve teclado, toque, instalação, dados locais e limites mesmo quando o conteúdo editorial falha.
- Layout reorganizado para uma coluna abaixo de 720 pixels.
- Texto e controles não dependem somente de cor para comunicar estado.
- As 65 trilhas reutilizam os mesmos títulos, listas, botões nativos, checklist e relações de glossário já cobertos pelos fluxos acessíveis existentes.
- Os sete eixos são apresentados como regiões e cartões com títulos, resumos, links e contagem textual; a classificação não depende de cor.
- Tabelas editoriais usam `caption`, cabeçalhos de coluna com `scope="col"`, cabeçalhos de linha com `scope="row"` e uma região rolável nomeada acessível por teclado.
- Conteúdo de saúde e proteção urgente permanece textual: não há acionamento automático, coleta de relato ou controle que sugira atendimento em tempo real.

Depois de cada mudança de rota, o foco é movido para o elemento `main`, permitindo que o leitor de tela encontre o novo conteúdo.

## Verificação manual mínima

1. Percorrer cabeçalho, busca, cartões, cenário, checklist e rodapé usando apenas `Tab`, `Shift+Tab`, `Enter` e `Espaço`.
2. Confirmar que o link de salto aparece e leva ao conteúdo.
3. Abrir e fechar a busca; conferir foco e `aria-expanded`.
4. Selecionar cada resposta de um cenário e ouvir o retorno anunciado.
5. Concluir uma trilha e confirmar que a mudança de estado é compreensível sem cor.
6. Aumentar o zoom para 200% e 400% sem perda de conteúdo ou rolagem horizontal desnecessária.
7. Testar larguras de 320, 768 e 1280 pixels.
8. Ativar redução de movimento no sistema.
9. Percorrer home, busca, uma trilha de saúde e a trilha de proteção com NVDA em navegador Chromium.
10. Verificar contraste de texto, links, bordas de controles e foco com ferramenta apropriada.
11. Percorrer as duas tabelas de tributos com leitor de tela e confirmar associação de cabeçalhos, legenda, data e nota.
12. Percorrer ao menos uma trilha nova de cada marco 2.9, 3.0 e 3.1 com NVDA e confirmar leitura de cenário, termos e fontes.
13. Percorrer ao menos uma das trilhas 59 a 63 com NVDA e confirmar a leitura de cenário, checklist, termos e fontes.
14. Percorrer os sete cartões de eixo, o catálogo agrupado e uma página de eixo; confirmar nome, resumo, progresso e retorno para o catálogo completo.
15. Abrir e fechar Menu, Busca e Acessibilidade com teclado e toque; confirmar que apenas uma superfície permanece aberta.
16. Exercitar todas as preferências, recarregar a página, restaurar padrões e confirmar independência do progresso.
17. Testar tema escuro e alto contraste em cenário, tabela, estado concluído, foco e mensagem de falha.
18. Executar a matriz de navegadores e dispositivos registrada em `compatibility.md`.

## Lacunas conhecidas

- O teste com NVDA foi retirado desta entrega por solicitação do usuário; JAWS, VoiceOver, TalkBack e ChromeVox também não foram executados.
- Os pares principais de texto foram medidos acima de `4,5:1`, mas ainda não existe teste automatizado nem medição manual de todos os estados interativos.
- O botão de conclusão rerenderiza a página e move o foco para `main`; a mudança também é anunciada pela região global de status.
- O checklist não é persistido, portanto seu estado some ao sair da trilha.
- Teclado foi verificado nos fluxos de menu, Ajuda, busca, diálogo, cenário, checklist e conclusão; a correção de retorno de foco do diálogo foi confirmada.
- Reflow equivalente a 400% foi verificado em viewport de 320 pixels, mas zoom real pela interface do navegador permanece pendente.
- A leitura das tabelas por leitor de tela permanece pendente.
- VoiceOver, TalkBack e ChromeVox dependem de aparelhos e testes humanos ainda não disponíveis.

Essas lacunas devem ser tratadas antes de declarar conformidade formal. A versão 4.0.0 não declara auditoria WCAG independente.
