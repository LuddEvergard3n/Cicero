# Compatibilidade e dispositivos

## Compromisso

A versão 3.10 mira Chrome, Edge e Firefox atuais e duas versões principais anteriores; Safari atual e uma versão principal anterior; Windows 10 e 11; macOS e Linux ainda suportados por esses navegadores; Android 10 ou posterior; iOS e iPadOS 15.4 ou posterior; e ChromeOS atual e duas versões anteriores.

Internet Explorer, navegadores embarcados antigos, televisores inteligentes e WebViews desatualizadas não são suportados. Um dispositivo listado abaixo só pode ser descrito como testado depois de uma execução real registrada.

## Matriz de validação

| Categoria | Tamanho ou ambiente | Entrada | Tecnologia assistiva | Situação em 18/10/2026 | Limite |
|---|---|---|---|---|---|
| Celular pequeno | 320 × 568 e 568 × 320 | Mouse como toque equivalente | Nenhuma | Aprovado em viewport Chromium | Emulação não substitui aparelho. |
| Celulares comuns | 360, 390 e 412 px; 800 × 360 | Mouse como toque equivalente | Nenhuma | Aprovado em viewport Chromium | Toque físico permanece não verificado. |
| Tablet | 768, 820 e 1024 px, retrato e paisagem | Mouse como toque equivalente | Nenhuma | Aprovado em viewport Chromium | Aparelho físico permanece não verificado. |
| Netbook | 1024 × 600 | Teclado e mouse | Nenhuma | Aprovado em viewport Chromium | Hardware real permanece não verificado. |
| Notebook e Chromebook | 1366 × 768 | Teclado e mouse | ChromeVox no ChromeOS | Layout aprovado em viewport Chromium | ChromeVox e ChromeOS reais não verificados. |
| Desktop | 1280 × 720 e 1920 × 1080 | Teclado e mouse | Nenhuma | Layout e fluxos de teclado aprovados em Chromium | Leitores de tela retirados do aceite desta entrega. |
| Projetor | 1280 × 720 e 1920 × 1080 | Teclado ou controle do computador | Nenhuma | Aprovado em viewport Chromium com texto em 100%, 125% e 150% | Projetor físico não verificado. |
| Android | Android 10 ou posterior | Toque | TalkBack | Não verificado | Exige aparelho e teste humano. |
| iPhone e iPad | iOS/iPadOS 15.4 ou posterior | Toque | VoiceOver | Não verificado | Exige aparelho e teste humano. |
| macOS | Safari suportado | Teclado e trackpad | VoiceOver | Não verificado | Exige computador Apple. |

## Critérios comuns

- Nenhuma página deve criar rolagem horizontal, exceto o contêiner nomeado das tabelas.
- Menu, busca, diálogo, cenário, checklist e conclusão devem funcionar por teclado, mouse e toque.
- Alvos independentes devem medir pelo menos 44 × 44 pixels CSS; links dentro de texto corrido seguem a exceção de alvo em linha.
- Zoom real de 200% e 400% deve preservar conteúdo e ordem de leitura.
- O ajuste de texto em 150% deve funcionar junto do zoom em 400%.
- Tema escuro, alto contraste, movimento reduzido e cores forçadas devem manter foco e estados compreensíveis.
- Ausência de equipamento deve ser registrada como “não verificado”, nunca convertida em aprovação inferida.

Na validação final de 18/10/2026, home, catálogo, Ajuda, uma trilha comum e a trilha com tabelas não criaram rolagem horizontal em 320 × 568, 768 × 1024, 1024 × 600, 1280 × 720 e 1920 × 1080. Texto em 150% junto de tema escuro, contraste alto, espaçamento confortável, fonte sem serifa, links reforçados e movimento reduzido não criou overflow em 320 pixels. Cores forçadas preservaram bordas e removeram sombras; movimento reduzido eliminou transições perceptíveis. O teste de 320 pixels representa o reflow de uma janela de 1280 pixels a 400%, mas não substitui o comando de zoom real do navegador nem aparelhos físicos.

## Manutenção

Atualize a data, o navegador, o sistema, o método de entrada e o resultado depois de cada execução. Falhas devem apontar para um registro reproduzível em `testing.md`; não amplie a promessa de suporte apenas com emulação de viewport.
