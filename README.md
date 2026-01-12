# Frontend System - Infinity X One Systems

**Consolidated frontend components for Infinity X One Systems.**

This repository contains all production-grade frontend components and applications for the Infinity X One Systems ecosystem.

## Repository Structure

```
frontend-system/
├── admin-dashboard/          # Administrative control plane UI
├── frontend/                 # Main frontend application
├── infinity-matrix/          # ADMINOS Control Plane (primary UI system)
├── package.json              # Workspace dependencies
└── README.md                 # This file
```

## Components

### 1. Admin Dashboard (`admin-dashboard/`)

Administrative dashboard for system management and monitoring.

**Purpose:** Provide admin-level access to system controls, user management, and operational monitoring.

**Key Features:**
- System health monitoring
- User management interface
- Configuration management
- Analytics dashboard

**Setup:**
```bash
cd admin-dashboard
npm install
npm run dev
```

### 2. Main Frontend (`frontend/`)

Primary frontend application for end-user interactions.

**Purpose:** Deliver user-facing features, workflows, and integrations.

**Key Features:**
- User authentication and profile management
- Workspace integration (Gmail, Calendar, Drive, Sheets)
- Real estate and loan intelligence interfaces
- Lead management and CRM
- Document synchronization

**Setup:**
```bash
cd frontend
npm install
npm run dev
```

### 3. Infinity Matrix (`infinity-matrix/`)

**ADMINOS Control Plane** - The authoritative UI system for Infinity X One Systems.

**Purpose:** Central command and control interface for all system operations, agent management, and autonomous workflows.

**Key Features:**
- Vision Cortex multi-agent interface
- Real-time agent coordination
- Workflow orchestration
- System analytics and monitoring
- Agent blueprint management
- Live documentation

**Architecture:**
- React 19 + TypeScript
- Tailwind CSS 4 for styling
- tRPC for type-safe API communication
- Real-time updates via WebSocket
- Multi-agent chat interface
- Vision Cortex Council Mode

**Setup:**
```bash
cd infinity-matrix
npm install
npm run dev
```

**Key Files:**
- `src/pages/AdminPage.tsx` - Main admin interface
- `src/components/AdminSidebar.tsx` - Navigation
- `src/components/AdminVisionCortex.tsx` - Vision Cortex interface
- `src/components/AdminAgents.tsx` - Agent management
- `src/components/AdminLiveData.tsx` - Real-time monitoring

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/InfinityXOneSystems/frontend-system.git
cd frontend-system

# Install workspace dependencies
npm install

# Or use pnpm for faster installation
pnpm install
```

### Development

Each component has its own development server:

```bash
# Run admin-dashboard
cd admin-dashboard && npm run dev

# Run frontend
cd frontend && npm run dev

# Run infinity-matrix (ADMINOS)
cd infinity-matrix && npm run dev
```

### Production Build

```bash
# Build all components
npm run build

# Build specific component
cd infinity-matrix && npm run build
```

## Architecture

### Data Flow

```
User Interface (Frontend)
        ↓
tRPC Client
        ↓
API Gateway (Cloud Run)
        ↓
Orchestrator (Manus Core)
        ↓
Agents (50+ specialists)
        ↓
Data Layer (Cloud SQL, Firestore, BigQuery)
```

### Styling System

All components use **Tailwind CSS 4** with a unified design system:

- **Color Palette:** Electric blue/cyan primary, with supporting colors
- **Typography:** System fonts with responsive scaling
- **Spacing:** 4px base unit for consistent layout
- **Components:** shadcn/ui for consistent UI patterns

### State Management

- **Global State:** React Context + tRPC
- **Real-time State:** Firestore listeners
- **Form State:** React Hook Form
- **Server State:** tRPC Query/Mutation hooks

## Integration Points

### Google Workspace

- Gmail integration for communication
- Calendar for scheduling
- Drive for document storage
- Sheets for data management

### Google Cloud

- Cloud Run for API hosting
- Cloud SQL for persistent data
- Firestore for real-time coordination
- BigQuery for analytics
- Vertex AI for LLM inference

### GitHub

- Continuous deployment via GitHub Actions
- Issue tracking and project management
- Code review workflows
- Automated testing

## Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## Deployment

### Staging

```bash
npm run deploy:staging
```

### Production

```bash
npm run deploy:production
```

## Documentation

Comprehensive documentation is available in each component:

- `admin-dashboard/README.md` - Admin dashboard documentation
- `frontend/README.md` - Frontend application documentation
- `infinity-matrix/README.md` - ADMINOS Control Plane documentation
- `infinity-matrix/ARCHITECTURE.md` - System architecture
- `infinity-matrix/IMPLEMENTATION.md` - Implementation details

## Performance

### Optimization Strategies

- **Code Splitting:** Each route is code-split for faster initial load
- **Image Optimization:** Images are optimized and served via CDN
- **Caching:** Aggressive caching for static assets
- **Lazy Loading:** Components loaded on-demand
- **Tree Shaking:** Unused code removed in production builds

### Metrics

- **Lighthouse Score:** 90+
- **Core Web Vitals:** All green
- **Bundle Size:** <500KB (gzipped)
- **Time to Interactive:** <2 seconds

## Security

### Authentication

- OAuth 2.0 via Manus platform
- Session management with secure cookies
- CSRF protection
- XSS prevention

### Data Protection

- All data encrypted in transit (TLS 1.3)
- All data encrypted at rest
- User data isolation
- Audit logging for all operations

### Compliance

- GDPR compliant
- SOC 2 ready
- HIPAA compatible
- PCI DSS ready

## Contributing

### Code Standards

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits for version control

### Pull Request Process

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit PR with clear description
5. Wait for review and approval
6. Merge to main

### Commit Messages

```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Failures

```bash
# Clear build cache
rm -rf .next dist build

# Rebuild
npm run build
```

## Support

For issues, questions, or contributions:

1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Include reproduction steps
4. Attach relevant logs or screenshots

## License

All components are part of Infinity X One Systems and are subject to the organization's licensing terms.

## System Status

| Component | Status | Last Updated |
|-----------|--------|---------------|
| Admin Dashboard | ✅ Operational | 2026-01-12 |
| Frontend Application | ✅ Operational | 2026-01-12 |
| Infinity Matrix (ADMINOS) | ✅ Operational | 2026-01-12 |
| Google Workspace Integration | ✅ Operational | 2026-01-12 |
| Cloud Integration | ✅ Operational | 2026-01-12 |

---

**Remember:** This is the consolidated frontend system. Each component is production-ready and follows Infinity X One Systems standards.

For questions about the system architecture, see the `canonical` repository: https://github.com/InfinityXOneSystems/canonical
