# AtomPortfolio

Portfólio pessoal, construído com [Astro](https://astro.build). Site estático, publicado no GitHub Pages via GitHub Actions.

🔗 [netorapg.github.io/AtomPortfolio](https://netorapg.github.io/AtomPortfolio/)

## Stack

- **[Astro](https://astro.build)** (v7) — geração do site estático.
- **Content Collections** (`astro:content`) — projetos, experiência profissional e publicações acadêmicas são arquivos Markdown validados por schema (Zod), não HTML hardcoded.
- **`astro:assets`** — otimização automática de imagens (resize + WebP).
- **[@fontsource](https://fontsource.org/)** — fontes (Inter e Fira Code) self-hosted, sem dependência do Google Fonts.
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** — geração automática de `sitemap-index.xml`.
- **TypeScript** com `astro check` para validação de tipos e conteúdo.

## Estrutura do projeto

```text
/
├── public/                  # Arquivos estáticos servidos como estão (favicon, etc.)
├── src/
│   ├── assets/               # Imagens processadas pelo astro:assets (ex: foto de perfil)
│   ├── components/           # Uma seção da home = um componente (Hero, Experience, Stack...)
│   ├── content/
│   │   ├── experience/       # Um .md por vínculo profissional
│   │   ├── projects/         # Um .md por projeto destacado
│   │   └── publications/     # Um .md por artigo/publicação acadêmica
│   ├── content.config.ts     # Schemas (Zod) das collections acima
│   ├── layouts/
│   │   └── Layout.astro      # <head> (SEO, meta tags), navbar, estilos globais
│   ├── pages/
│   │   └── index.astro       # Página única, monta os componentes de seção
│   └── styles/
│       └── home.css          # Estilos das seções
└── astro.config.mjs
```

### Como adicionar conteúdo

Nada disso exige mexer em `.astro`. Basta criar um novo arquivo Markdown na pasta certa — o campo `order` controla a posição de exibição (menor primeiro).

**Novo projeto** — `src/content/projects/nome-do-projeto.md`:

```markdown
---
title: "Nome do Projeto"
description: "Descrição curta do que o projeto faz."
tags: ["Go", "Docker"]
repoUrl: "https://github.com/netorapg/nome-do-projeto" # opcional
---
```

**Nova experiência profissional** — `src/content/experience/empresa.md`:

```markdown
---
role: "Cargo"
company: "Descrição curta da empresa/produto"
period: "Jan 2026 - Presente"
order: 1
highlights:
  - "Texto do bullet. Pode conter <strong>HTML inline</strong>."
---
```

**Nova publicação** — `src/content/publications/evento.md`:

```markdown
---
venue: "Nome do Evento/Anais"
date: "Mês Ano"
type: "Artigo Científico Publicado"
paperTitle: "Título do artigo"
authors: "Sobrenome, Nome; Sobrenome, Nome"
abstract: "Resumo do artigo."
doi: "10.5753/exemplo.2026.00000"
order: 1
---
```

Os schemas em `src/content.config.ts` validam esses campos — se algo obrigatório faltar ou tiver o tipo errado, o build falha (local e no CI) em vez de publicar algo quebrado.

## Desenvolvimento local

Requer Node.js ≥ 22.12.

```sh
npm install
npm run dev       # inicia o servidor de dev em localhost:4321
```

| Comando           | Ação                                                    |
| :----------------- | :------------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento com hot reload                |
| `npm run build`     | Build de produção em `./dist/`                            |
| `npm run preview`   | Serve o build de produção localmente, antes do deploy     |
| `npm run check`     | Valida tipos e conteúdo das collections (`astro check`)   |

## Deploy

Todo push em `master` dispara o workflow em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Instala as dependências.
2. Roda `npm run check` — se o conteúdo ou os tipos estiverem inválidos, o deploy é abortado aqui.
3. Builda o site com a [action oficial do Astro](https://github.com/withastro/action).
4. Publica o resultado no GitHub Pages.

Não há passo manual: bastam commit e push.
