# Privacidade e segurança

## Modelo de dados

O Cícero não possui conta, backend, analytics, formulário ou banco de dados. A aplicação não envia progresso, respostas, buscas ou preferências a um servidor do projeto.

Os únicos dados persistidos são:

| Local | Chave | Conteúdo | Remoção |
|---|---|---|---|
| `localStorage` | `cicero-progress-v1` | Array de IDs de trilhas concluídas. | Botão “Apagar meu progresso local” na página Sobre ou limpeza manual do navegador. |
| `localStorage` | `cicero-accessibility-v1` | Tamanho e espaçamento do texto, fonte dos títulos, realce de links, tema, contraste e movimento. | Botão “Restaurar padrão” no painel de acessibilidade ou limpeza manual do navegador. |

Respostas de cenários, caixas do checklist e termos buscados permanecem apenas na memória da página e não são persistidos.

Eixos são metadados editoriais públicos. Contagens por eixo são calculadas localmente a partir de `cicero-progress-v1` e não criam chave, perfil ou histórico adicional.

A trilha sobre documentos pessoais ensina a reduzir exposição de dados, mas não solicita, recebe, valida ou armazena documento, CPF, selfie, biometria, senha ou código de verificação.

A trilha sobre direitos digitais explica conceitos e canais da LGPD sem receber pedidos, denúncias, protocolos ou qualquer dado usado para exercê-los.

A trilha sobre serviços públicos explica canais e ouvidorias sem receber manifestações, documentos, protocolos, pagamentos ou dados de atendimento.

As trilhas de educação, trabalho, assistência social, serviços essenciais, saúde, conflitos e proteção não recebem currículos, contratos, renda, contas, leituras, exames, sintomas, relatos, denúncias, localização, documentos ou dados pessoais. Não há formulário, geolocalização, botão de denúncia, chamada automática ou contato com instituição, prestadora ou órgão público.

As trilhas financeiras e econômicas não solicitam valores pessoais, não executam cálculos e não produzem plano, cotação, recomendação ou simulação. As trilhas de saúde não realizam diagnóstico, triagem ou indicação de tratamento. Respostas de cenários servem apenas ao exercício editorial exibido na página.

As tabelas tributárias são conteúdo estático e não recebem renda, localização, patrimônio ou qualquer outro dado do leitor. As trilhas de Estado e Política não registram preferência, voto, filiação, manifestação ou consulta. As trilhas de Brasil e Mundo não registram nacionalidade, situação migratória, localização, opinião geopolítica, operação comercial ou consulta sobre sanções. As trilhas de Informação e Decisão não recebem texto, imagem, áudio, vídeo ou URL, não consultam serviço de checagem e não executam detector de conteúdo sintético.

Falha no carregamento de `content.json` não altera nem remove as duas chaves locais. Ajuda e acessibilidade continuam disponíveis; as rotas editoriais informam a falha e oferecem nova tentativa sem enviar diagnóstico ou conteúdo local.

## Tráfego de rede

Na execução normal, a aplicação solicita somente arquivos estáticos do mesmo endereço: HTML, CSS, JavaScript, JSON, manifesto e Service Worker. Links de fontes levam a sites institucionais somente quando o usuário os abre.

Não existem fontes remotas, pixels, scripts de terceiros, cookies próprios, SDKs, chamadas de API ou conteúdo incorporado.

## Limites de confiança

- `data/content.json` é conteúdo local confiado pelo projeto, mas ainda passa por `escapeHtml()` antes de ser interpolado em HTML.
- Células, títulos e notas das tabelas passam pelo mesmo escape; URLs continuam vindo apenas da bibliografia validada.
- URLs de fontes são inseridas em links; somente URLs institucionais revisadas devem entrar no JSON.
- Links externos usam `target="_blank"` junto de `rel="noopener noreferrer"`.
- O servidor local normaliza o caminho solicitado, restringe-o à raiz do projeto e responde `404` para arquivos ausentes ou diretórios.
- O parser de progresso trata JSON inválido como conjunto vazio para não quebrar a aplicação.
- O parser de preferências aceita somente valores previstos, ignora campos desconhecidos e restaura padrões diante de JSON inválido ou armazenamento indisponível.

## Service Worker

O Service Worker usa estratégia cache-first para arquivos essenciais. A versão local 4.2.0 usa `cicero-v43` e inclui manifesto, módulos de preferências e ícones locais. Toda alteração de arquivo armazenado deve incrementar `CACHE` e ser validada com atualização e recarregamento offline.

O cache não contém dados pessoais. A lista de arquivos é explícita e limitada ao shell e ao conteúdo da aplicação.

As novas trilhas são somente editoriais. Elas não inspecionam dispositivo, recebem foto, arquivo, captura de tela, localização, senha, código, diagnóstico ou dados do imóvel e não se conectam a serviço de segurança ou manutenção.

## Requisitos para mudanças futuras

Qualquer analytics, formulário, sincronização, autenticação, integração ou recurso remoto altera o modelo de privacidade e exige decisão explícita, documentação, base legal aplicável, minimização de dados, política de retenção e mecanismo de exclusão. Não adicione esse tipo de recurso como detalhe de implementação.

Não registre conteúdo de `localStorage`, termos buscados ou respostas de usuário em console, logs ou serviços externos.

## Referências técnicas — 4.2.0

As oito referências novas pertencem a hosts oficiais já permitidos e são links bibliográficos, não recursos carregados pela aplicação. Não há envio de localização, rota, documento, relato de ocorrência, dado de saúde, alimento, imagem ou arquivo. Progresso e acessibilidade conservam suas chaves e contratos.
