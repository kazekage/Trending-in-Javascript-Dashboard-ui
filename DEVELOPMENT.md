# Trending in JavaScript Dashboard - Development Guide

## Quick Start Commands

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start dev server
npm run dev
```

## Development Workflow

### 1. Environment Setup
Create a `.env` file with your backend API URL:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Running the Application

**Development Mode**
```bash
npm run dev
```
Access at: http://localhost:5173

**Production Build**
```bash
npm run build
npm run preview
```

### 3. Code Quality

**Linting**
```bash
npm run lint
```

## Architecture Overview

### Component Hierarchy

```
App (Router)
├── LandingPage
├── TrendingReposPage
│   ├── Filter Controls
│   ├── Search Input
│   ├── Sort Dropdown
│   └── Repository Cards
└── TrendingArticlesPage
    ├── Filter Controls
    ├── Search Input
    ├── Sort Dropdown
    └── Article Cards
```

### Data Flow

1. **Page mounts** → Fetches data from backend API
2. **User interacts** → Updates filter store (Zustand)
3. **Store changes** → Components re-render with filtered data
4. **User navigates** → React Router updates view

### State Management

- **Local State** (useState): Component-specific data (repos, articles, loading, error)
- **Global State** (Zustand): Shared filter state across pages
- **Derived State** (useMemo): Computed filtered/sorted results

## API Integration

### Expected Backend Responses

**Repository Object**
```typescript
{
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  topics: string[];
  updated_at: string;
}
```

**Article Object**
```typescript
{
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  positive_reactions_count: number;
  comments_count: number;
  reading_time_minutes: number;
  user: {
    name: string;
    profile_image: string;
  };
  cover_image?: string;
}
```

## Styling Guide

### Tailwind CSS Classes

The project uses a custom design system with Tailwind:

- **Spacing**: Uses standard Tailwind spacing scale (4, 8, 12, 16, etc.)
- **Colors**: CSS custom properties for theme colors
- **Typography**: Responsive text sizes
- **Components**: Utility-first approach with component abstractions

### Adding New Components

1. Create in `src/components/ui/`
2. Use `cn()` utility for conditional classes
3. Forward refs for compatibility
4. Export all variants

Example:
```typescript
import { cn } from "@/lib/utils"

interface MyComponentProps {
  variant?: 'default' | 'secondary';
  className?: string;
}

export const MyComponent = ({ variant = 'default', className }: MyComponentProps) => {
  return (
    <div className={cn('base-classes', variantClasses[variant], className)}>
      {/* content */}
    </div>
  )
}
```

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link from Landing Page

### Adding a New Filter

1. Update `FilterState` type in `src/types/index.ts`
2. Add state management in `src/store/filterStore.ts`
3. Add UI control in page component
4. Update filtering logic in `useMemo`

### Connecting to a Different Backend

Update the API service files:
- `src/services/repositoryService.ts`
- `src/services/articleService.ts`

Or set `VITE_API_BASE_URL` in `.env`

## Performance Optimization

### Current Optimizations

1. **useMemo** for expensive filtering/sorting operations
2. **Lazy imports** ready (can add with React.lazy)
3. **Vite optimizations** for fast builds
4. **Tailwind purging** removes unused CSS

### Future Improvements

- Add virtual scrolling for large lists
- Implement pagination
- Add service worker for offline support
- Lazy load images
- Add caching layer

## Testing Strategy

### Recommended Testing Setup

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**Unit Tests**: Components, utilities, services
**Integration Tests**: Page flows, API integration
**E2E Tests**: Full user journeys (Playwright/Cypress)

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.ts
export default defineConfig({
  server: { port: 3001 }
})
```

### API CORS Errors
Configure proxy in `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
```

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript](https://www.typescriptlang.org/)
