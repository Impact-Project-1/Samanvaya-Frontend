# Project Structure & Best Practices

A comprehensive guide for converting repositories to this format.

---

## Table of Contents

1. [Directory Structure](#directory-structure)
2. [Feature Architecture](#feature-architecture)
3. [File Organization Patterns](#file-organization-patterns)
4. [Best Practices](#best-practices)
5. [AI Conversion Guide](#ai-conversion-guide)

---

## Directory Structure

```
src/
├── app/                          # Next.js App Router (pages, layouts, loading states)
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (dashboard)/              # Protected dashboard route group
│   │   ├── profile/
│   │   └── layout.tsx
│   └── globals.css               # Tailwind & CSS variables
│
├── api/                          # API layer
│   ├── endpoints.ts              # Centralized API endpoint definitions
│   ├── client.ts                 # API client (authenticated + public gateways)
│   ├── server.ts                 # Server-side API utilities
│   └── errors.ts                 # API error handling
│
├── components/                   # Shared/reusable components
│   ├── ui/                       # shadcn/ui components (buttons, inputs, etc.)
│   ├── dashboard/                # Dashboard-specific components
│   └── layout/                   # Layout components (wrappers, nav)
│
├── features/                     # Feature-based modules (domain-driven)
│   ├── auth/
│   ├── manage-users/
│   ├── events/
│   └── ...                       # Each feature follows same pattern
│
├── hooks/                        # Shared React hooks
│   ├── useAuth.ts
│   ├── use-search.ts
│   └── use-debounce.ts
│
├── lib/                          # Utility libraries
│   ├── auth/                     # Auth utilities (permissions, roles, store)
│   ├── error-handling/           # Error boundaries, logging
│   ├── utils.ts                  # cn() helper for className merging
│   └── schemas/                  # Shared Zod schemas
│
├── stores/                       # Zustand state management
│   ├── auth-store.ts
│   └── ui-store.ts
│
└── proxy.ts                      # Development proxy configuration
```

---

## Feature Architecture

Each feature in `src/features/` follows a **consistent four-folder pattern**:

```
src/features/feature-name/
├── api/                          # API functions (data layer)
│   ├── index.ts                  # Re-exports
│   └── feature-name.api.ts       # API calls (no React dependencies)
│
├── components/                   # React components
│   ├── index.ts                  # Re-exports
│   └── component-name.tsx
│
├── hooks/                        # React hooks (data fetching, mutations)
│   ├── index.ts                  # Re-exports
│   └── use-feature-name.ts       # React Query + business logic
│
├── schemas/                      # Zod validation schemas
│   ├── index.ts                  # Re-exports
│   └── feature-name.schema.ts
│
├── types/                        # TypeScript types (optional if needed)
│   └── index.ts
│
└── index.ts                      # Feature public API
```

### Feature Export Pattern

```typescript
// src/features/auth/index.ts
export * from "./api";
export * from "./components";
export * from "./hooks";
export * from "./schemas";
```

**Never import from internal paths** - always use the feature's `index.ts`:
```typescript
// ✅ Correct
import { useLogin } from "@/features/auth";

// ❌ Incorrect (deep import)
import { useLogin } from "@/features/auth/hooks/use-login";
```

---

## File Organization Patterns

### 1. API Layer Pattern

**Location:** `src/features/{feature}/api/{feature}.api.ts`

Characteristics:
- Pure data layer - **NO React dependencies**
- Uses apiClient or publicApiClient
- Validates responses with Zod schemas
- Returns typed data
- All URLs come from centralized `endpoints.ts`

```typescript
// Example pattern
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import { UserSchema } from "../schemas";

export async function fetchUsers(): Promise<User[]> {
  const response = await apiClient.get(
    endpoints.users.list,
    UserSchema
  );
  return response.response;
}
```

### 2. Hooks Pattern

**Location:** `src/features/{feature}/hooks/use-{feature}.ts`

Characteristics:
- Uses React Query (`@tanstack/react-query`)
- Query keys exported for invalidation
- Separates query options for testability
- Uses `keepPreviousData` for pagination
- Handles mutations with proper cache invalidation

```typescript
// Query keys pattern
export const featureKeys = {
  all: ["feature"] as const,
  lists: () => [...featureKeys.all, "list"] as const,
  list: (params) => [...featureKeys.lists(), params] as const,
  details: () => [...featureKeys.all, "detail"] as const,
  detail: (id) => [...featureKeys.details(), id] as const,
};
```

### 3. Components Pattern

**Location:** `src/features/{feature}/components/{component}.tsx`

Characteristics:
- "use client" directive at top for client components
- Uses shadcn/ui primitives
- Typed props with TypeScript
- Separates presentational from container logic

### 4. Schemas Pattern

**Location:** `src/features/{feature}/schemas/{feature}.schema.ts`

Characteristics:
- Uses Zod for validation
- Exports both schema and inferred TypeScript type
- Schemas validate full API response envelope

---

## Best Practices

### 1. Tailwind CSS + shadcn/ui

**Configuration:** `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide"
}
```

**Key Utilities:**
- `cn()` from `@/lib/utils` - merges Tailwind classes safely
- CSS variables for theming (dark mode support)
- `tw-animate-css` for animations

**Button Variants Example:**
```typescript
const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2...",
  {
    variants: {
      variant: {
        default: "bg-brand-blue text-primary-foreground...",
        outline: "border-2 border-brand-blue...",
        trusty: "bg-linear-to-r from-brand-blue to-brand-purple...",
      },
      size: { default: "h-9 px-4 py-2", sm: "h-8...", lg: "h-10..." }
    }
  }
);
```

### 2. State Management (Zustand)

**Pattern:**
```typescript
// src/stores/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (access: string, refresh: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    { name: "auth-storage" }
  )
);
```

### 3. API Client Pattern

Two gateways provided in `src/api/client.ts`:

```typescript
// Public (no auth) - for login, public endpoints
export const publicApiClient = createGateway(false);

// Private (with auth) - for authenticated endpoints
export const apiClient = createGateway(true);
```

Features:
- Token refresh on 401/403
- Automatic redirect to login on auth failure
- FormData support
- Zod schema validation

### 4. Code Quality Tools

**Biome** (`.biome.json`):
- Formatter with 2-space indent
- Linter with Next.js and React recommended rules
- Organize imports on save

**Commitlint** (`commitlint.config.ts`):
- Conventional commits
- Flexible subject case
- Type required

**Scripts:**
```json
{
  "lint": "biome check",
  "lint:fix": "biome check --write .",
  "format": "biome format --write",
  "typecheck": "tsc --noEmit"
}
```

### 5. Import Aliases

Defined in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components": ["./src/components"],
      "@/lib": ["./src/lib"],
      "@/hooks": ["./src/hooks"]
    }
  }
}
```

### 6. Environment Variables

**Location:** `config/env.ts`
```typescript
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_DJANGO_API_URL: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_DJANGO_API_URL: process.env.NEXT_PUBLIC_DJANGO_API_URL,
  },
});
```

---

## AI Conversion Guide

When converting another repository to this format:

### Step 1: Analyze Current Structure
```bash
# Document existing structure
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | head -50
```

### Step 2: Create Directory Skeleton
```
src/
├── api/
├── components/
│   ├── ui/
│   └── dashboard/
├── features/
├── hooks/
├── lib/
└── stores/
```

### Step 3: Convert Features

For each domain entity, create:
```
src/features/{entity-name}/
├── api/
├── components/
├── hooks/
├── schemas/
└── index.ts
```

**Migration checklist:**
- [ ] Extract API calls to `api/*.api.ts`
- [ ] Move types to `schemas/` with Zod
- [ ] Convert data fetching to React Query hooks
- [ ] Re-export from `index.ts`
- [ ] Replace deep imports with feature imports

### Step 4: Configure Tooling

Create `biome.json`:
```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.15/schema.json",
  "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2 },
  "linter": { "enabled": true, "rules": { "recommended": true } }
}
```

Create `components.json`:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": { "css": "src/app/globals.css", "cssVariables": true }
}
```

### Step 5: API Migration Pattern

**Before (old):**
```typescript
// scattered fetch calls
const response = await fetch('/api/users');
const data = await response.json();
```

**After (new):**
```typescript
// src/features/users/api/users.api.ts
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import { UserSchema } from "../schemas";

export async function fetchUsers() {
  return apiClient.get(endpoints.users.list, UserSchema);
}

// src/api/endpoints.ts
export const endpoints = {
  users: { list: "/api/v1/users/" }
};
```

### Step 6: Component Migration

**Before:**
```jsx
// Flat structure, no types
export default function UserTable({ users }) {
  return <div>{users.map(u => <div>{u.name}</div>)}</div>;
}
```

**After:**
```tsx
// src/features/users/components/user-table.tsx
"use client";
import { type ColumnDef } from "@tanstack/react-table";
import type { User } from "../schemas";

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
  // ... with proper typing and shadcn Table component
}
```

### Step 7: State Management

Convert any global state to Zustand:
```typescript
// Instead of Context or Redux
import { create } from "zustand";

export const useFeatureStore = create<FeatureState>()((set) => ({
  // state and actions
}));
```

---

## Key Dependencies

```json
{
  "dependencies": {
    "next": "^16",
    "react": "^19",
    "tailwindcss": "^4",
    "@tanstack/react-query": "^5",
    "zustand": "^5",
    "zod": "^4",
    "@radix-ui/*": "^1-2",
    "lucide-react": "^0.575",
    "tailwind-merge": "^3.4",
    "class-variance-authority": "^0.7.1"
  }
}
```

---

## Quick Reference

| Pattern | Location | Purpose |
|---------|----------|---------|
| Feature API | `features/*/api/*.api.ts` | Data layer (no React) |
| Feature Hooks | `features/*/hooks/*.ts` | React Query + mutations |
| UI Components | `components/ui/*.tsx` | shadcn primitives |
| Shared Components | `components/dashboard/*.tsx` | Layout/helpers |
| API Endpoints | `api/endpoints.ts` | Centralized URLs |
| API Client | `api/client.ts` | Authenticated requests |
| Schemas | `features/*/schemas/*.ts` | Zod validation |
| Stores | `stores/*.ts` | Zustand state |
| Utils | `lib/utils.ts` | `cn()` helper |