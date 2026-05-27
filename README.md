This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start development server |
| `bun run build` | Build for production |
| `bun run lint` | Check code with Biome linter |
| `bun run lint:fix` | Lint and auto-fix code |
| `bun run format` | Format code with Biome |
| `bun run typecheck` | Type check with TypeScript |

## Theme Colors

All colors are defined in `src/app/globals.css` using Tailwind v4's `@theme` directive:

| Variable | Color | Usage |
|----------|-------|-----|
| `--primary` | `#a21033` | Brand primary color |
| `--primary-hover` | `#8b0c2b` | Primary hover state |
| `--background` | `#ffffff` | Page background |
| `--foreground` | `#111111` | Primary text |
| `--text-muted` | `#666666` | Secondary text |
| `--border` | `#eaeaea` | Border color |
| `--hover-bg` | `#fafafa` | Hover backgrounds |
| `--disabled-text` | `#a0a0a0` | Disabled text |
| `--star-active` | `#f5a623` | Active star rating |
| `--star-inactive` | `#d8d8d8` | Inactive star rating |
| `--error` | `#ef4444` | Error messages |

Use colors via Tailwind classes: `bg-primary`, `text-foreground`, `border-border`, etc.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
