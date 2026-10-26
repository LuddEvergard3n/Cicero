# Cicero

Cicero is a static educational platform that introduces practical adult-life decisions to Brazilians aged 16 to 24. Version 4.2.0 organizes 68 learning paths into seven areas and provides search, local progress tracking, accessibility preferences, responsive navigation, and PWA installation.

The content offers general education, not individualized financial, legal, medical, political, or professional advice.

- Live site: [luddevergard3n.github.io/Cicero](https://luddevergard3n.github.io/Cicero/)
- Repository: [LuddEvergard3n/Cicero](https://github.com/LuddEvergard3n/Cicero)

Version 4.2.0 adds everyday mobility and traffic (path 03.07) plus food and household safety (path 03.08): 324 glossary terms and 180 sources in total. All 68 paths received a structural readability review and all references were checked again on 2026-10-25. This is an editorial and technical review, not specialist certification; professional traffic, food-safety and mechanical reviews remain pending. See [content audit](docs/content-audit.md), [risk audit](docs/risk-audit.md) and [test results](docs/testing.md).

## Principles

- General education without product, service, institution, or political recommendations.
- No accounts, analytics, forms, backend, or remote data collection.
- Progress and accessibility preferences remain in the browser and can be cleared separately.
- JSON-based content includes institutional references and automated validation.

## Requirements

- Node.js 18 or newer
- No dependencies to install

## Run locally

```powershell
npm run serve
```

Open `http://127.0.0.1:8084/`. Use HTTP because ES modules, JSON requests, and the Service Worker are not reliable through `file://`.

## Tests

```powershell
npm test
```

The test runner checks the project structure, essential documentation, content contracts, internal references, search behavior, and local persistence. See [docs/testing.md](docs/testing.md) for coverage, limitations, and the manual test matrix.

## Project structure

```text
css/      Responsive and accessible visual system
data/     Learning paths, glossary, and institutional sources
docs/     Technical, editorial, and operational documentation
js/       Application, routing, search, and local storage
tests/    Dependency-free automated checks
index.html, manifest.json, sw.js, server.js
```

## Architecture

The application loads `data/content.json`, resolves hash-based routes, and renders each page in the browser. Progress contains only completed path IDs and is stored in `localStorage`. A Service Worker caches essential files for later offline visits.

The project has no framework, build step, backend, authentication, database, analytics, or runtime integration with external services.

## Documentation

The full index is available in [docs/README.md](docs/README.md):

- [Architecture and data flow](docs/architecture.md)
- [Visual system](docs/design-system.md)
- [Content model](docs/content-model.md)
- [Editorial policy](docs/editorial-policy.md)
- [Content audit](docs/content-audit.md)
- [Risk-oriented audit](docs/risk-audit.md)
- [Accessibility](docs/accessibility.md)
- [Compatibility and devices](docs/compatibility.md)
- [Privacy and security](docs/privacy-security.md)
- [Testing and acceptance criteria](docs/testing.md)
- [GitHub Pages deployment](docs/deployment.md)
- [Roadmap and known debt](docs/roadmap.md)
- [Release history](docs/releases.md)

## Editorial limits

Rules, fees, education, public assistance, health, work, institutional, and consumer-protection information should be confirmed through official sources before action. Household repair content is limited to observation, safe interruption, manufacturer-approved basic steps, documentation, and professional referral. Internet-safety content covers prevention and basic recovery without promising absolute protection, inspecting devices, or collecting credentials.

## License

No license file is currently included. All rights are reserved unless stated otherwise.
