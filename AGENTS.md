<!-- BEGIN:project-info -->
# Babkom — Door 3D Configurator

A Next.js 16 app featuring a **3D door configurator** built with Three.js, React Three Fiber, and shadcn/ui components.

## Key Files & Directories

| Path | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout (metadata, fonts) |
| `app/page.tsx` | Home page — assembles all sections |
| `components/door-3d-configurator.tsx` | Core 3D door configurator component |
| `components/hero.tsx` | Hero section |
| `components/contact-form.tsx` | Contact form |
| `components/footer.tsx` | Site footer |
| `components/header.tsx` | Navigation header |
| `components/products-showcase.tsx` | Products grid |
| `components/features-section.tsx` | Features list |
| `components/testimonials-section.tsx` | Testimonials carousel |
| `components/ui/` | shadcn/ui primitive components |
| `lib/utils.ts` | Shared utility functions (`cn`, etc.) |
| `app/globals.css` | Global styles + Tailwind directives |

## Build Commands

```bash
npm run dev    # Start dev server (webpack mode)
npm run build  # Production build
npm run lint   # ESLint check
```

## Conventions

- **Next.js App Router** — `app/` directory, server components by default. Read `node_modules/next/dist/docs/` for this version's API changes.
- **shadcn/ui** — Components in `components/ui/` are copied primitives (not npm deps). Add new ones via `npx shadcn@latest add <component>`. Style config: `components.json`.
- **Tailwind CSS v4** — No `tailwind.config.js`; styles live in `app/globals.css`.
- **Path aliases** — `@/*` maps to project root (`.`). Use `@/components/...`, `@/lib/...`, etc.
- **Three.js / R3F** — Configurator uses `@react-three/fiber` + `@react-three/drei`. SSR requires `transpilePackages` in `next.config.ts`.
<!-- END:project-info -->

<!-- BEGIN:mcp-config -->
## MCP Server

One MCP server is configured in `.vscode/settings.json`:

| Name | Command | Purpose |
|------|---------|---------|
| `magic` | `npx -y @21st-dev/magic@latest` | AI-powered development assistant (requires API key) |

The API key is stored in `.vscode/settings.json` under `mcpServers.magic.env.API_KEY`. Do not commit this file to version control.
<!-- END:mcp-config -->
