# Modelo de conteúdo

## Fonte de verdade

`data/content.json` é a fonte de verdade editorial. A interface não deve duplicar textos de trilhas ou termos. Textos institucionais fixos, como limites do produto, permanecem na interface quando pertencem ao sistema e não a uma trilha específica.

## Estrutura raiz

| Campo | Tipo | Regra |
|---|---|---|
| `reviewedAt` | `string` | Data ISO `AAAA-MM-DD` da revisão editorial geral. |
| `axes` | `Axis[]` | Sete agrupamentos de navegação; cada trilha aparece exatamente uma vez. |
| `tracks` | `Track[]` | Exatamente 65 trilhas na versão 3.11.0. |
| `terms` | `Term[]` | Glossário com IDs únicos. |
| `sources` | `Source[]` | Referências institucionais com IDs únicos. |

## `Track`

| Campo | Tipo | Uso |
|---|---|---|
| `id` | `string` | Identificador estável usado na URL e no progresso local. |
| `title` | `string` | Nome público da trilha. |
| `summary` | `string` | Resumo usado em cartões e busca. |
| `question` | `string` | Pergunta prática que abre a trilha. |
| `objectives` | `string[]` | Resultados de aprendizagem. |
| `steps` | `Step[]` | Explicação progressiva; a V1 exige ao menos três etapas. |
| `scenario` | `Scenario` | Decisão de múltipla escolha com retorno explicado. |
| `checklist` | `string[]` | Ações verificáveis; a V1 exige ao menos três itens. |
| `terms` | `string[]` | IDs existentes em `terms`. |
| `sources` | `string[]` | IDs existentes em `sources`. |
| `tables` | `Table[]` opcional | Quadros editoriais datados ou conceituais exibidos dentro da trilha. |

IDs publicados não devem ser renomeados sem migração, pois aparecem em URLs compartilhadas e no progresso salvo pelo usuário.

A ordem em `axes[].tracks` define a sequência pedagógica e a numeração visual `EE.TT`. Essa numeração não deve ser armazenada no `Track`: IDs permanecem a identidade estável, enquanto posições podem mudar quando a organização editorial for revisada.

## Tipos internos

```text
Axis {
  id: string
  title: string
  summary: string
  tracks: string[]
}

Step {
  title: string
  body: string
}

Scenario {
  prompt: string
  options: string[]
  correct: integer
  explanation: string
}

Term {
  id: string
  name: string
  definition: string
}

Source {
  id: string
  title: string
  organization: string
  url: string
}

Table {
  id: string
  title: string
  description: string
  headers: string[]
  rows: string[][]
  note: string
  effectiveAt?: string
  sources: string[]
}
```

`Scenario.correct` é o índice, iniciado em zero, da resposta considerada mais segura. A explicação é exibida para qualquer escolha e precisa explicar o raciocínio, não apenas declarar acerto ou erro.

`Table` existe somente quando uma comparação tabular melhora a compreensão. Todas as linhas devem ter o mesmo número de células dos cabeçalhos; `effectiveAt`, quando presente, usa `AAAA-MM-DD` e não pode ultrapassar `reviewedAt`. O primeiro campo de cada linha funciona como cabeçalho de linha. Títulos, descrições, notas, cabeçalhos e células entram na busca local.

## Relações

- Um eixo referencia trilhas existentes e funciona somente como agrupamento principal de navegação.
- Cada trilha pertence a exatamente um eixo; IDs de eixos e trilhas não podem colidir.
- Uma trilha pode referenciar vários termos e fontes.
- Um termo pode aparecer em várias trilhas; a página do termo calcula essas relações em tempo de execução.
- Uma fonte pode sustentar várias trilhas.
- Uma tabela referencia fontes existentes e não duplica URLs.
- Relações são feitas somente por IDs. Referências inexistentes fazem os testes falharem.

## Adição ou alteração de conteúdo

1. Verifique se o conceito já existe como trilha, termo ou fonte e determine seu único eixo principal.
2. Consulte fontes primárias atuais e registre-as em `sources` antes de referenciá-las.
3. Escreva objetivo, etapas, cenário e checklist conforme a [política editorial](editorial-policy.md).
4. Reutilize termos existentes; crie um termo apenas se ele precisar ser explicado ao público.
5. Atualize `reviewedAt` somente após revisão editorial do conjunto afetado.
6. Execute `npm test`.
7. Faça a matriz manual aplicável descrita em [testes](testing.md).

## Validação atual

O teste confirma arquivos essenciais, sete eixos, atribuição exclusiva das 65 trilhas, 306 termos, 167 fontes, unicidade de IDs, campos mínimos, limites do índice de resposta, contrato e referências das tabelas, relações com termos e fontes, domínios institucionais permitidos, normalização e ranking da busca e persistência do progresso. Ele também protege os limites textuais das trilhas de reparos domésticos e cuidados na internet. Não valida qualidade pedagógica, segurança técnica no local, correção educacional, jurídica, trabalhista, assistencial, regulatória, fiscal, clínica, estatística ou internacional, vigência da fonte ou legibilidade do texto.
