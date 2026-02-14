# Cloudflare Pages Deployment Guide

This guide provides instructions for deploying the frontend application to Cloudflare Pages.

## Project Structure

The frontend application is located at: `frontend/project-01`

## Build Configuration

### Technology Stack
- **Framework**: Next.js 15
- **Cloudflare Adapter**: @opennextjs/cloudflare
- **Package Manager**: pnpm (monorepo workspace)

### Build Process

The project uses the OpenNext Cloudflare adapter to deploy Next.js applications to Cloudflare Pages.

#### Local Build Command
```bash
# From repository root
cd frontend/project-01
pnpm install
pnpm build:cf
```

This will:
1. Install dependencies using pnpm
2. Run `npx @opennextjs/cloudflare@latest build`
3. Generate build output in `.open-next/assets` directory

## Cloudflare Pages Dashboard Configuration

### Project: ecosystem

**Important**: Use the "ecosystem" project, NOT "autoecoops" project.

#### Build Settings

| Setting | Value |
|---------|-------|
| Framework preset | Next.js |
| Build command | `cd frontend/project-01 && pnpm install && pnpm build:cf` |
| Build output directory | `.open-next/assets` |
| Root directory (advanced) | `/` (repository root) |
| Node.js version | 18 or higher |

#### Environment Variables

Required environment variables to set in Cloudflare Pages dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=https://yrfxijooswpvdpdseswy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## Configuration Files

### wrangler.toml (Repository Root)

Located at: `/wrangler.toml`

```toml
name = "autoecoops-ecosystem"
compatibility_date = "2025-12-01"
compatibility_flags = ["nodejs_compat"]

# Cloudflare Pages build configuration
[build]
command = "cd frontend/project-01 && pnpm install && pnpm build:cf"
cwd = "."
watch_paths = ["frontend/project-01/**/*.{ts,tsx,js,jsx,json,css}"]
```

### wrangler.toml (Frontend Project)

Located at: `frontend/project-01/wrangler.toml`

```toml
name = "autoecoops-frontend"
compatibility_date = "2025-12-01"
compatibility_flags = ["nodejs_compat"]

# Pages will use the output from open-next build
pages_build_output_dir = ".open-next/assets"
```

### open-next.config.ts

Located at: `frontend/project-01/open-next.config.ts`

```typescript
import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
};

export default config;
```

## Removing Old "autoecoops" Project

If you have a Cloudflare Pages project named "autoecoops" that you want to remove:

1. Go to Cloudflare Dashboard
2. Navigate to Workers & Pages
3. Find the "autoecoops" project
4. Click on Settings
5. Scroll to the bottom and click "Delete project"
6. Confirm deletion

## Common Build Failures and Solutions

### Issue 1: Module Not Found Errors

**Symptom**: Build fails with "Cannot find module" errors

**Solution**: Ensure pnpm workspace is properly configured:
- The `pnpm-workspace.yaml` at repository root must include `frontend/*`
- Run `pnpm install` from repository root before building

### Issue 2: Wrong Build Command

**Symptom**: Build fails because `@cloudflare/next-on-pages` is not found

**Solution**: 
- DO NOT use `npx @cloudflare/next-on-pages@1`
- USE `pnpm build:cf` which runs `npx @opennextjs/cloudflare@latest build`
- The project uses @opennextjs/cloudflare, not @cloudflare/next-on-pages

### Issue 3: Wrong Output Directory

**Symptom**: Deployment succeeds but site shows 404 errors

**Solution**: 
- DO NOT use `.vercel/output/static`
- USE `.open-next/assets` as the build output directory

### Issue 4: Missing Dependencies

**Symptom**: Build fails with TypeScript or dependency errors

**Solution**:
- Ensure Node.js version is 18 or higher in Cloudflare Pages settings
- Use build command: `cd frontend/project-01 && pnpm install && pnpm build:cf`

## Local Testing with Wrangler

To test the deployment locally:

```bash
# From frontend/project-01
pnpm install
pnpm build:cf
pnpm preview

# Or using wrangler directly
npx wrangler pages dev .open-next/assets
```

## Deployment Methods

### Method 1: Direct Git Integration (Recommended)

1. Connect your GitHub repository to Cloudflare Pages
2. Set the build configuration as specified above
3. Every push to main branch will trigger automatic deployment

### Method 2: Manual Deployment via CLI

```bash
# From frontend/project-01
pnpm install
pnpm build:cf
pnpm deploy

# Or using wrangler directly
npx wrangler pages deploy .open-next/assets --project-name=ecosystem
```

## Verifying Deployment

After deployment:

1. Check the deployment logs in Cloudflare Pages dashboard
2. Visit the deployment URL (usually `ecosystem.pages.dev`)
3. Verify that the application loads correctly
4. Check browser console for any errors

## Troubleshooting Checklist

- [ ] Correct build command: `cd frontend/project-01 && pnpm install && pnpm build:cf`
- [ ] Correct output directory: `.open-next/assets`
- [ ] Root directory set to repository root: `/`
- [ ] Environment variables configured in Cloudflare dashboard
- [ ] Node.js version 18+ selected
- [ ] pnpm-workspace.yaml includes `frontend/*`
- [ ] Using "ecosystem" project, not "autoecoops"

## Support

For issues with:
- **OpenNext Cloudflare adapter**: https://github.com/opennextjs/opennextjs-cloudflare
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **Next.js**: https://nextjs.org/docs
