# Cícero

Plataforma educacional estática de introdução à vida adulta para jovens brasileiros de 16 a 24 anos. A versão pública 4.0.0 organiza 65 trilhas em sete eixos navegáveis, com numeração hierárquica por eixo, e oferece ajuda, preferências locais de acessibilidade, navegação responsiva e instalação PWA. O conteúdo ensina decisões gerais sem aconselhamento individual, coleta de dados ou recomendação de produtos.

## Princípios

- Educação geral, não aconselhamento financeiro ou jurídico individual.
- Sem contas, analytics, formulários, serviços externos ou coleta remota de dados.
- Progresso e preferências de acessibilidade salvos somente no navegador e apagáveis separadamente.
- Conteúdo e eixos em JSON com referências institucionais e validação automatizada.

## Requisitos

Requer Node.js 18 ou superior e não possui dependências para instalar.

## Executar localmente

```powershell
npm run serve
```

Abra `http://127.0.0.1:8084/`. Use HTTP: módulos, JSON e Service Worker não funcionam de modo confiável por `file://`.

## Testes

```powershell
npm test
```

O teste valida estrutura, documentação essencial, contratos de conteúdo, referências internas, busca e persistência local. Consulte [docs/testing.md](docs/testing.md) para cobertura, limites e matriz manual.

## Estrutura

```text
css/      Sistema visual responsivo e acessível
data/     Trilhas, glossário e fontes institucionais
docs/     Documentação técnica, editorial e operacional
js/       Aplicação, rotas, busca e armazenamento local
tests/    Verificações automatizadas sem dependências
index.html, manifest.json, sw.js, server.js
```

## Arquitetura

A aplicação carrega o conteúdo de `data/content.json`, interpreta rotas por hash e renderiza a página no navegador. O progresso contém somente IDs de trilhas concluídas e fica em `localStorage`. Um Service Worker armazena os arquivos essenciais para visitas posteriores sem rede.

Não há framework, build, backend, autenticação, banco de dados, analytics ou integração externa em tempo de execução.

## Documentação

O índice completo está em [docs/README.md](docs/README.md):

- [Arquitetura e fluxo](docs/architecture.md)
- [Sistema visual](docs/design-system.md)
- [Modelo de conteúdo](docs/content-model.md)
- [Política editorial](docs/editorial-policy.md)
- [Auditoria de conteúdo](docs/content-audit.md)
- [Auditoria orientada a risco](docs/risk-audit.md)
- [Acessibilidade](docs/accessibility.md)
- [Compatibilidade e dispositivos](docs/compatibility.md)
- [Privacidade e segurança](docs/privacy-security.md)
- [Testes e critérios de aceite](docs/testing.md)
- [Implantação no GitHub Pages](docs/deployment.md)
- [Roadmap e débitos conhecidos](docs/roadmap.md)
- [Histórico de versões](docs/releases.md)

## Limites editoriais

O conteúdo evita indicar produtos, cursos, instituições, benefícios, tratamentos, posições políticas ou decisões individuais. Informações sobre regras, tarifas, educação, assistência social, serviços, saúde, trabalho, instituições e proteção devem ser confirmadas nas fontes oficiais ou no atendimento competente antes de agir. Estado e Política descreve normas, competências e processos sem incentivo eleitoral ou avaliação partidária. Brasil e Mundo descreve interdependência, instituições e mecanismos sem defender alinhamento, sanção, abertura, proteção comercial ou modelo de cooperação.

Reparos domésticos são limitados a observação, interrupção diante de risco, ações simples previstas pelo fabricante, documentação e encaminhamento. Cuidados na internet tratam prevenção e recuperação básica sem prometer proteção absoluta, inspecionar aparelhos ou coletar credenciais.

## Publicação

O projeto foi preparado para GitHub Pages, mas o diretório ainda não possui repositório Git ou remoto. O procedimento e a verificação pós-publicação estão em [docs/deployment.md](docs/deployment.md).
