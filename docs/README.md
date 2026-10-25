# Documentação do Cícero

Esta pasta é a referência técnica e editorial do projeto. O `README.md` da raiz apresenta o sistema e os comandos essenciais; os documentos abaixo registram como o Cícero funciona, quais limites devem ser preservados e como alterá-lo com segurança.

## Índice

| Documento | Conteúdo |
|---|---|
| [Arquitetura](architecture.md) | Componentes, fluxo de inicialização, rotas, decisões e limitações técnicas. |
| [Sistema visual](design-system.md) | Direção editorial, referências, tokens, componentes, responsividade e política de assets. |
| [Modelo de conteúdo](content-model.md) | Contrato do JSON, relações entre entidades e procedimento para adicionar conteúdo. |
| [Política editorial](editorial-policy.md) | Público, linguagem, fontes, revisão, limites e critérios de publicação. |
| [Auditoria de conteúdo](content-audit.md) | Matriz histórica e revisões parciais das 68 trilhas, fronteiras editoriais, fontes e pendências especializadas. |
| [Auditoria orientada a risco](risk-audit.md) | Revisão interna das vinte trilhas mais sensíveis e limites antes da publicação. |
| [Acessibilidade](accessibility.md) | Requisitos, implementação atual, verificações manuais e lacunas conhecidas. |
| [Compatibilidade](compatibility.md) | Navegadores, dispositivos, métodos de entrada e situação real das verificações. |
| [Privacidade e segurança](privacy-security.md) | Dados locais, limites de confiança, proteção de saída e manutenção segura. |
| [Testes](testing.md) | Cobertura automatizada, matriz manual e critérios de aceite. |
| [Implantação](deployment.md) | Execução local, GitHub Pages, cache offline, publicação e rollback. |
| [Roadmap](roadmap.md) | Débitos conhecidos, prioridades e limites das próximas versões. |
| [Histórico](releases.md) | Entregas implementadas, versões, conteúdo e limites de validação. |

## Estado documentado

Esta documentação descreve a versão `4.2.0`, preparada em 25 de outubro de 2026. O conteúdo reúne sete eixos, 68 trilhas, 324 termos, 180 fontes e revisão editorial geral de legibilidade em 25 de outubro de 2026. A interface organiza as trilhas por números hierárquicos derivados do eixo e mantém Ajuda, preferências locais de acessibilidade, navegação responsiva, ícones e manifesto instalável.

## Regra de manutenção

Toda mudança de comportamento deve atualizar, na mesma alteração, o documento correspondente. Mudanças no JSON exigem revisão do [modelo de conteúdo](content-model.md) e da [política editorial](editorial-policy.md); mudanças de interface exigem revisão do [sistema visual](design-system.md) e de [acessibilidade](accessibility.md); mudanças de cache, rota ou hospedagem exigem revisão de [implantação](deployment.md).

Não descreva comportamento planejado como implementado. Funcionalidades futuras pertencem ao [roadmap](roadmap.md) até existirem e terem sido validadas.

## Revisão editorial 4.2.0

As 68 trilhas foram verificadas em 25/10/2026 quanto a extensão das etapas, repetição, perguntas, cenários, checklists e consistência estrutural. Mecânica e mobilidade receberam condensação pontual; o conteúdo e os limites das demais trilhas foram preservados. As 180 referências foram testadas novamente. Esta revisão não substitui as avaliações profissionais pendentes registradas nas auditorias.
