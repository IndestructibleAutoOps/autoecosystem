# AutoEcosystem Migration Mapping
## Current Structure → New 3-Layer Architecture

## New 3-Layer Architecture Overview
```
autoecosystem/
├── control/                    # L1: Control Layer (Shared & Governance)
│   ├── shared/                 # Shared utilities and types
│   ├── interfaces/             # Shared interfaces and contracts
│   ├── governance/             # Governance frameworks and tools
│   ├── tooling/                # Development tools and scripts
│   └── environment/            # Shared environment configs
├── platforms/                  # L2: Platform Layer (Business Platforms)
│   ├── platform-1/            # Contracts-L1 Platform
│   │   ├── apps/               # Platform-specific applications
│   │   ├── packages/           # Platform-specific packages
│   │   ├── config/             # Platform-specific configuration
│   │   ├── docker/             # Platform Docker setup
│   │   ├── docs/               # Platform documentation
│   │   └── scripts/            # Platform scripts
│   ├── platform-2/            # Future platforms
│   └── .template/              # Platform template for new platforms
├── interfaces/                 # L3: Interface Layer (API & Gateway)
│   ├── api/                    # Unified API gateway
│   │   ├── contracts/          # API contracts
│   │   ├── gateway/            # API gateway service
│   │   └── sdk/                # Client SDKs
│   └── docs/                   # API documentation
└── docs/                       # Global Documentation
    ├── architecture/           # Architecture documentation
    ├── deployment/             # Deployment guides
    └── quickstart/             # Quick start guides
```

## Detailed Migration Mapping

### Level 0: Root Level Files
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./README.md` | `./README.md` | Root README - Update content |
| `./package.json` | `./package.json` | Root package - Update workspace config |
| `./.env.example` | `./.env.example` | Root env example - Update content |
| `./migrate.sh` | `./control/tooling/scripts/migrate.sh` | Migration script - Move to tooling |
| `./QUICKSTART.md` | `./docs/quickstart/QUICKSTART.md` | Move to docs |
| `./ARCHITECTURE_COMPLETENESS_CHECKLIST.md` | `./docs/architecture/COMPLETENESS_CHECKLIST.md` | Move to docs |
| `./CONFIGURATION_VERIFICATION_REPORT.md` | `./docs/configuration/VERIFICATION_REPORT.md` | Move to docs |

### Level 1: AI Development Environment
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./ai-dev-environment/` | `./control/tooling/ai-dev-environment/` | Move to control/tooling |
| `./ai-dev-environment/aider/` | `./control/tooling/ai-dev-environment/aider/` | Aider configuration |
| `./ai-dev-environment/continue/` | `./control/tooling/ai-dev-environment/continue/` | Continue.dev config |
| `./ai-dev-environment/docker/` |ese| `./control/environment/docker/ai-dev/` | Docker config to environment |
| `./ai-dev-environment/docs/` | `./control/tooling/ai-dev-environment/docs/` | AI dev docs |
| `./ai-dev-environment/README.md` | `./control/tooling/ai-dev-environment/README.md` | Update path references |
| `./ai-dev-environment/setup.sh` | `./control/tooling/ai-dev-environment/setuparak/setup.sh` | Update path references |
| `./ai-dev-environment/scripts/` | `./control/tooling/ai-dev-environment/scripts/` | Scripts |
| `./ai-dev-environment/scripts/governance-integration/` | `./control/governance/scripts/ai-integration/` | Move to governance |
| `./ai-dev-environment/scripts/governance-integration/opa-policy-check.sh` | `./control/governance/scripts/opa-policy-check.sh` | Update paths |
| `./ai-dev-environment/scripts/governance-integration/seal-ai-change.sh` | `./control/governance/scripts/seal-ai-change.sh` | Update paths |

### Level 1: Apps Directory (Root)
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./apps/` | `./interfaces/apps/` | Move to Interface Layer |
| `./apps/api/` | `./interfaces/apps/api/` | API gateway app |
| `./apps/web/` | `./interfaces/apps/web/` | Web interface app |
| `./apps/api/src/` | `./interfaces/apps/api/src/` | Source code |
| `./apps/web/src/` | `./interfaces/apps/web/src/` | Source code |

### Level 1: Docker Directory
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./docker/` | `./control/environment/docker/` | Move to environment |
| `./docker/docker-compose.dev.yml` | `./control/environment/docker/compose.dev.yml` | Rename to compose.dev.yml |
| `./docker/` content | `./control/environment/docker/` | Move all Docker files |

### Level 1: Docs Directory
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./docs/` | `./docs/` | Keep at root |
| `./,docs/architecture/` | `./docs/architecture/` | Keep structure |
| `./docs/deployment/` | `./docs/deployment/` | Keep structure |
| `./docs/architecture/evolution-guide.md` | `./docs/architecture/evolution.md` | Keep and update |
| `./docs/deployment/zero-cost-deployment-guide.md` | `./docs/deployment/zero-cost.md` | Keep and update |

### Level 1: Scripts Directory
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./scripts/` | `./control/tooling/scripts/` | Move to tooling |
| `./scripts/setup/setup-dev.sh` | `./control/tooling/scripts/setup-dev.sh` | Update paths |
| `./scripts/` content | `./control/tooling/scripts/` | Move all scripts |

### Level 2: Contracts-L1-Config Directory
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./contracts-l1-config/` | **DELETE** | Duplicate of platform-1/config |
| `./contracts-l1-config/apps/` | **DELETE** | Duplicate of platform-1/apps |
| `./contracts-l1-config/config/` | **DELETE** | Duplicate of platform-1/config |
| `./contracts-l1-config/docker/` | **DELETE** | Duplicate of platform-1/docker |
| `./contracts-l1-config/docs/` | **DELETE** | Duplicate of platform-1/docs |
| `./contracts-l1-config/packages/` | **DELETE** | Duplicate of platform-1/packages |
| `./contracts-l1-config/scripts/` | **DELETE** | Duplicate of platform-1/scripts |
| `./contracts-l1-config/.env.example` | **DELETE** | Duplicate of platform-1/.env.example |

### Level 2: Packages Directory (Root)
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./packages/config/` | **FLATTEN** | Extract nested content |
| `./packages/config/apps/` | **DELETE** | Duplicate of root/apps/ |
| `./packages/config/apps/api/` | **DELETE** | Duplicate of interfaces/apps/api/ |
| `./packages/config/apps/web/` | **DELETE** | Duplicate of interfaces/apps/web/ |
| `./packages/config/config/` | **DELETE** | Recursive duplicate |
| `./packages/config/docker/` | **DELETE** | Duplicate of control/environment/docker/ |
| `./packages/config/docs/` | **DELETE** | Duplicate of root/docs/ |
| `./packages/config/packages/` | **FLATTEN** | Extract nested content |
| `./packages/config/packages/database/` | **DELETE** | Duplicate of packages/database/ |
| `./packages/config/packages/database/package.json` | **DELETE** | Duplicate |
| `./packages/config/packages/database/prisma/` | **DELETE** | Duplicate of packages/database/prisma/ |
| `./packages/config/packages/database/prisma/seed.ts` | **DELETE** | Duplicate |
| `./packages/config/packages/database/prisma/schema.prisma` | **DELETE** | Duplicate |
| `./packages/config/packages/` | **FLATTEN** | Extract nested content |
| `./packages/config/packages/apps/` | **DELETE** | Duplicate (again) |
| `./packages/config/packages/apps/api/` | **DELETE** | Duplicate |
| `./packages/config/packages/apps/api/src/` | **DELETE** | Duplicate |
|./packages/config/packages/apps/api/src/index.ts` | **DELETE** | Duplicate |
| `./packages/config/packages/apps/web/` | **DELETE** | Duplicate |
| `./packages/config/packages/apps/web/src/` | **DELETE** | Duplicate |
|./packages/config/packages/apps/web/src/app/` | **DELETE** | Duplicate |
|./packages/config/packages/apps/web/src/app/layout.tsx` | **DELETE** | Duplicate |
| ./packages/config/packages/apps/web/src/app/page.tsx` | **DELETE** | **DUPLICATE** |
| ./packages/config/packages/apps/web/next.config.js` | **DELETE** | **DUPLICATE** |
| ./packages/config/config/` | **DELETE** | **DUPLICATE** |
| `./packages/config/config/` | **DELETE** | **DUPLICATE** |

### Level 2: Database Package
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./packages/database/` | `./control/shared/packages/database/` | Move to control/shared |
| `./packages/database/package.json` | `./control/shared/packages/database/package.json` | Update paths |
| `./packages/database/prisma/` | `./control/shared/packages/database/prisma/` | Move |
| `./packages/database/prisma/schema.prisma` | `./control/shared/packages/database/prisma/schema.prisma` | Move |
| `./packages/database/prisma/seed.ts` | `./control/shared/packages/database/prisma/seed.ts` | Move |

### Level 2: Platforms Directory
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./platforms/` | `./platforms/` | Keep at root |
| `./platforms/platform-1/` | `./platforms/platform-1/` | Keep structure |
| `./platforms/platform-1/apps/` | `./platforms/platform-1/apps/` | Keep |
| `./platforms/platform-1/config/` | `./platforms/platform-1/config/` | Keep |
|./platforms/platform-1/docker/` | ` | `./platforms/platform-1/docker/` | Keep |
| `./platforms/platform-1/docs/` | `./platforms/platform-1/docs/` | Keep |
| `./platforms/platform-1/packages/` | `./platforms/platform-1/packages/` | Keep |
| `./platforms/platform-1/packages/ai-engine/` | `./platforms/platform-1/packages/ai-engine/` | Keep |
| `./platforms/platform-1/packages/shared/` | `./platforms/platform-1/packages/shared/` | Keep |
 epoxy |
| `./platforms/platform-1/packages/governance/` | `./platforms/platform-1/packages/governance/` | Keep |
| `./platforms/platform-1/packages/semantic-engine/` | `./platforms/platform-1/packages/semantic-engine/` | Keep |
| `./platforms/platform-1/packages/database/` | **DELETE** | Duplicate of control/shared/packages/database/ |
| `./platforms/platform-1/packages/database/prisma/` | **DELETE** | Duplicate |
| `./platforms/platform-1/packages/database/prisma/seed.ts` | **DELETE** | Duplicate |
| `./platforms/platform-1/packages/database/prisma/schema.prisma/` | **DELETE** | **DUPLICATE** |
| `./platforms/platform-1/scripts/` | `./platforms/platform-1/scripts/` | Keep |
| `./platforms/platform-1/scripts/setup/setup-dev.sh` | `./platforms/platform-1/scripts/setup-dev.sh` | Update paths |
| `./platforms/platform-1/README.md` | `./platforms/platform-1/README.md` | Update references |
| `./platforms/platform-1/QUICKSTART.md` | `./platforms/platform-1/QUICKSTART.md` | Update references |
| `./platforms/platform-1/ARCHITECTURE_COMPLETENESS_CHECKLIST.md` | `./platforms/platform-` | **DUPLICATE** |
| `./platforms/platform-1/package.json` | `./platforms/platform-1/package.json` | **DUPLICATE** |

### Platform-1 Documentation Files
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./platforms/platform-1/README.md` | `./platforms/platform-1/README.md` | Keep, update references |
| `./platforms/QUICKSTART.md` | `./platforms/platform-1/QUICKSTART.md` | Update references |
| `./platforms/platform-1/ARCHITECTURE_COMPLETENESS_CHECKLIST.md` | `./platforms/platform-` | **DUPLICATE** |

### Platform-1 Configuration Files
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./platforms/platform-1/README.md` | `./platforms/platform-1/` | **DUPLICATE** |
| `./platforms/platform-1/README.md` | `./platforms/platform-1/` | **DUPLICATE** |
| `./platforms/platform-1/package.json` | `./platforms/platform-1/package.json` | **DUPLICATE** |
| `./platforms/platform-1/.env.example` | `./platforms/platform-1/.env.example` | **DUPLICATE** |

### Platform-1 Docker Files
**From → To**

| Current Path | New Path | Notes |
|-------------|---------|-------|
| `./platforms/platform-1/docker/docker-compose.dev.yml` | `./platforms/platform-1/docker/compose.dev.yml` | Rename |
| `./platforms/platform-1/docker/docker-compose.dev.yml` | `./platforms/platform-1/docker/compose.dev.yml` | Rename |

## Summary of Changes

### Directories to Create
- `control/` (new)
  - `shared/` (new)
  - `interfaces/` polys/ (new)
  - `governance/` (new)
  - `tooling/` (new)
  - `environment/` (new)
- `interfaces/` (new)
  - `apps/` (move from root/apps/)
  - `api/` (new - reorganize root/apps/api/)
  - `gateway/` (new - reorganize root/apps/web/)
  - `docs/` (new - API docs)
- `platforms/.template/` (new - platform template)

### Directories to Move
- `ai-dev-environment/` → `control/tooling/ai-dev-environment/`
- `docker/` → `control/environment/docker/`
- `scripts/` → `control/tooling/scripts/`
- `packages/database/` → `control/shared/packages/database/`
- `apps/` → `interfaces/apps/`
- `root/docs/` → `docs/` (keep at root)
- `root/docs/architecture/` → `docs/architecture/` (keep)
- `root/docs/deployment/` → `docs/deployment/` (keep)
- `root/README.md` → `README.md` (keep)
- `root/QUICKSTART.md` → `docs/quickstart/QUICKSTART.md` (move)
- `root/ARCHITECTURE_COMPLETENESS_CHECKLIST.md` → `docs/architecture/ whisker/COMPLETENISH_CHECKLIST.md` (move)

### Directories to DELETE (Duplicates)
- `contracts-l1-config/` (entire directory - duplicate)
- `packages/config/` (entire directory - deeply nested duplicates)
- `packages/config/packages/` (entire directory - nested duplicates)
- `packages/config/packages/database/` (duplicate of control/shared/packages/database/)
- `packages/config/packages/apps/` (duplicate of root/apps/)
- `packages/config/apps/` (duplicate of root/apps/)
- `platforms/platform-1/packages/database/` (duplicate of control/shared/packages/database/)
- `platforms/platform-1/.env.example` (duplicate of root/.env.example)
- `platforms/platform-1/README.md` (duplicate of root/README.md)

### Files to DELETE (Duplicates)
- `./packages/config/packages/apps/web/src/app/layout.tsx` (duplicate)
- `./packages/config/packages/apps/web/src/app/page.tsx` (duplicate)
- `./packages/config/packages/apps/web/next.config.js` (duplicate)
- `./packages/config/packages/apps/web/postcss.config.js` (duplicate)
- `./packages/config/packages/apps/web/tailwind.config.js` (duplicate)
- `././packages/config/packages/apps/api/src/index.ts` (duplicate)
- `./packages/config/packages/database/prisma/seed.ts` (duplicate)
- `./packages/config/packages/database/prisma/schema.prisma` (duplicate)
- `./packages/config/package.json` (duplicate)
- `./packages/config/apps/api/package.json` (duplicate)
- `./packages/config/apps/web/package.json` (duplicate)

### Files to UPDATE (Path References)
- All `package.json` files (update import paths)
- All `tsconfig.json` files (update paths)
- All `docker-compose.yml` files (update volume paths)
- All `*.sh` scripts (update cd paths)
- All README.md files (update path references)
- All documentation files (update path references)
- All `setup.sh` scripts (update paths)

### Files to RENAME
- `docker-compose.dev.yml` → `compose.dev.yml` (remove docker- prefix)
- `docker-compose.yml` → `compose.yml` (remove docker- prefix)
- `README.md` → Keep as is

## Critical Notes

1. **DO NOT DELETE**: The following are **NOT** duplicates:
   - `./platforms/platform-1/` - Keep entire structure
   - `./platforms/platform-1/packages/ai-engine/` - Unique platform component
   - `./platforms/platform-1/packages/shared/` - Unique platform component
   - `./platforms/platform-`packages/governance/` - Unique platform component
   - `./platforms/platform-1/packages/semantic-engine/` - Unique platform component

2. **DO DELETE**: The following ARE **DEFINITELY** duplicates:
   - `./contracts-l1-config/` - Entire directory is duplicate of `platform-1/config/`
   - `./packages/config/packages/database/` - Duplicate of `./packages/database/`
   - `./packages/config/apps/` - Duplicate of `./apps/`
   -./packages/config/packages/apps/` - Duplicate of `./apps/`

3. **Platform-1 Database**: This is a **NOT** a duplicate:
   - `./platforms/platform-1/packages/database/` - This is platform-specific
   - `./packages/database/` - This is global/shared database
   - KEEP BOTH: One for shared, one for platform

4. **Validation Strategy**:
   - Before deletion: Verify content is truly identical
   - After migration: Verify all imports and paths updated
   - After migration: Verify all functionality preserved
   - After migration: Run all tests
   - After migration: Verify docker-compose works

## Pre-Migration Checklist
- [x] Repository cloned
- [x] Backup created (autoecosystem-backup-20260210_:105709.tar.gz)
- [x] Structure analyzed
- [x] Migration mapping documented
- [ ] Create Git branch: feature/3-layer-architecture-restructure
- [ ] Verify all duplicates are truly duplicates
- [ ] Document which files will be deleted
- [ ] Document all path updates needed
- [ ] Verify backup can be restored

## Post-Migration Checklist
- [ ] Verify all files accounted for
- [ ] Verify no functionality lost
- [ ] Verify all imports updated
- [ ] Verify all scripts updated
- [ ] Verify all docs updated
- [ ] Verify docker-compose works
- [ ] Verify package.json workspaces work
- [ ] Run all tests
- [ ] Update README files
-- [ ] Commit changes

## Risk Assessment
- **Low Risk**: Moving directories and updating paths
- **Medium Risk**: Deleting duplicates (need verification)
- **High Risk**: Breaking imports or paths
- **Mitigation**: Complete backup, careful verification, step-by-step migration