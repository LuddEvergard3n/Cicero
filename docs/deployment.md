# Execução e implantação

## Requisitos

- Node.js 18 ou superior para servidor local e testes.
- Hospedagem capaz de servir arquivos estáticos por HTTPS.
- Nenhuma instalação de pacote, build ou variável de ambiente.

## Execução local

```powershell
npm run serve
```

O servidor escuta somente em `127.0.0.1:8084`. Acesse `http://127.0.0.1:8084/`. Não abra `index.html` por `file://`, pois módulos, `fetch()` e Service Worker dependem de um contexto HTTP.

## GitHub Pages

O repositório público é [LuddEvergard3n/Cicero](https://github.com/LuddEvergard3n/Cicero). O GitHub Pages publica a branch `main`, pasta raiz `/`, em [luddevergard3n.github.io/Cicero](https://luddevergard3n.github.io/Cicero/), com HTTPS obrigatório e sem etapa de build.

As rotas usam hash, portanto não exigem `404.html`, redirects ou configuração de servidor.

## Cache e lançamento

Antes de publicar qualquer alteração em HTML, CSS, JavaScript ou conteúdo:

1. Atualize `reviewedAt` se houve revisão editorial.
2. Incremente `CACHE` em `sw.js`, por exemplo, de `cicero-v1` para `cicero-v2`.
3. Confirme que todo arquivo essencial permanece em `ASSETS`.
4. Execute `npm test` e a matriz manual afetada.
5. Registre mudanças e limites da versão.

O Service Worker usa o cache `cicero-v43`. Depois de armazenar shell, conteúdo, manifesto, preferências e ícones, `skipWaiting()` ativa a nova versão; durante `activate`, caches `cicero-*` anteriores são removidos. CSS, aplicação, preferências e JSON usam `?v=43` quando aplicável.

## Instalação PWA

O manifesto declara identidade, idioma, escopo, orientação livre e ícones locais de 192 e 512 pixels, incluindo variante maskable e ícone Apple. O Cícero não mostra um botão próprio de instalação: o usuário utiliza “Instalar” ou “Adicionar à tela inicial” quando o navegador oferecer a ação.

Antes de considerar a instalação validada, confirme abertura pelo ícone, escopo correto, primeira visita on-line, segunda visita sem rede e atualização real do cache anterior. A presença do manifesto isoladamente não prova instalabilidade em todos os navegadores.

## Verificação pós-publicação

- Home, catálogo, sete eixos e 68 trilhas carregam por HTTPS quando a versão 4.2.0 for publicada.
- Cada trilha aparece uma vez no catálogo completo e retorna ao eixo correto.
- Progresso global e por eixo refletem a mesma chave local.
- As tabelas tributárias exibem 11 tributos e 27 unidades da Federação com legenda, fonte, data e limites.
- Rotas copiadas e recarregadas funcionam.
- Busca, cenário e conclusão de trilha respondem.
- Progresso sobrevive ao recarregamento e pode ser apagado.
- Links externos abrem a fonte correta.
- Service Worker fica ativo após a primeira visita.
- Segunda visita funciona offline.
- Console não apresenta falha de módulo, JSON, manifesto ou cache.
- Layout é verificado em celular e desktop.
- Ajuda abre sem depender do JSON editorial; menu, busca e acessibilidade mantêm estados coerentes.
- Preferências persistem após recarga, podem ser restauradas e não alteram o progresso.
- Ícones, nome e tema aparecem corretamente quando a instalação é oferecida.

## Rollback

O rollback consiste em republicar um commit anteriormente validado. Depois do rollback, incremente o nome do cache mesmo que os arquivos retornem a uma versão antiga; reutilizar um nome de cache pode manter recursos incompatíveis no navegador.

Não reescreva histórico nem force push para executar rollback. Preserve a versão problemática para auditoria e corrija com um novo commit.

## Preparação local 4.2.0

Pacote `4.2.0`, cache `cicero-v43`, recursos `?v=43`. Esta entrega não faz commit, push ou publicação. Os registros anteriores de HTTPS referem-se ao lançamento público, não às trilhas novas. Conferir a atualização de v42 para v43 e a recarga offline conforme `testing.md` antes de uma futura publicação.
