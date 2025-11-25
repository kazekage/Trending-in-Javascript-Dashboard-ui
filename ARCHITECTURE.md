# Project Architecture

## Application Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (User)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  React Application                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │            React Router (App.tsx)                     │  │
│  └───────────────────┬───────────────────────────────────┘  │
│                      │                                       │
│      ┌───────────────┼───────────────┐                      │
│      ▼               ▼               ▼                      │
│  ┌────────┐   ┌──────────┐   ┌────────────┐               │
│  │Landing │   │  Repos   │   │  Articles  │               │
│  │  Page  │   │   Page   │   │    Page    │               │
│  └────────┘   └──────────┘   └────────────┘               │
│                  │     │         │      │                   │
│                  │     └─────────┼──────┘                   │
│                  │               │                          │
│                  ▼               ▼                          │
│            ┌──────────┐   ┌──────────┐                     │
│            │ Zustand  │   │   UI     │                     │
│            │  Store   │   │Components│                     │
│            └──────────┘   └──────────┘                     │
│                  │                                          │
│                  ▼                                          │
│            ┌──────────┐                                     │
│            │ Services │                                     │
│            └──────────┘                                     │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend API Service                            │
│  ┌────────────────────┐  ┌────────────────────┐            │
│  │ GET /api/repos/*   │  │ GET /api/articles/*│            │
│  └────────────────────┘  └────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

```
src/
├── main.tsx                    # Application entry point
│   └── Renders App component
│
├── App.tsx                     # Router configuration
│   ├── Route: /               → LandingPage
│   ├── Route: /repos          → TrendingReposPage
│   └── Route: /articles       → TrendingArticlesPage
│
├── pages/                      # Page-level components
│   ├── LandingPage.tsx
│   │   ├── Uses: Button, Card components
│   │   └── Navigation to detail pages
│   │
│   ├── TrendingReposPage.tsx
│   │   ├── State: repos, loading, error
│   │   ├── Uses: repositoryService
│   │   ├── Uses: useFilterStore (Zustand)
│   │   ├── Features: search, sort, filter
│   │   └── Renders: Repository Cards
│   │
│   └── TrendingArticlesPage.tsx
│       ├── State: articles, loading, error
│       ├── Uses: articleService
│       ├── Uses: useFilterStore (Zustand)
│       ├── Features: search, sort, filter
│       └── Renders: Article Cards
│
├── components/ui/              # Reusable UI components
│   ├── Button.tsx             # Multi-variant button
│   ├── Card.tsx               # Card container components
│   ├── Input.tsx              # Form input
│   ├── Loading.tsx            # Loading states
│   └── ErrorMessage.tsx       # Error display
│
├── services/                   # API integration layer
│   ├── repositoryService.ts
│   │   ├── getTrendingRepos()
│   │   └── searchRepos(query)
│   │
│   └── articleService.ts
│       ├── getTrendingArticles()
│       └── searchArticles(query)
│
├── store/                      # State management
│   └── filterStore.ts         # Zustand store
│       ├── search: string
│       ├── sortBy: SortOption
│       ├── sortDirection: 'asc' | 'desc'
│       └── Actions: setSearch, setSortBy, etc.
│
├── types/                      # TypeScript definitions
│   └── index.ts
│       ├── Repository interface
│       ├── Article interface
│       └── Filter types
│
└── lib/                        # Utilities
    └── utils.ts               # Helper functions (cn)
```

## Data Flow

### Repository Page Flow

```
1. User visits /repos
   ↓
2. TrendingReposPage mounts
   ↓
3. useEffect triggers
   ↓
4. fetchRepos() called
   ↓
5. repositoryService.getTrendingRepos()
   ↓
6. Fetch GET /api/repos/trending
   ↓
7. Backend returns Repository[]
   ↓
8. setState(repos)
   ↓
9. useMemo computes filtered/sorted repos
   ↓
10. Render repository cards

User Interaction:
   User types in search
   ↓
   setSearch() → Zustand store updated
   ↓
   useMemo recomputes
   ↓
   Re-render with filtered results
```

### State Management Strategy

```
┌────────────────────────────────────────────────────┐
│                 Component State                    │
│  ┌──────────────────────────────────────────────┐  │
│  │  Local State (useState)                      │  │
│  │  - repos: Repository[]                       │  │
│  │  - articles: Article[]                       │  │
│  │  - loading: boolean                          │  │
│  │  - error: string | null                      │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│               Global State (Zustand)               │
│  ┌──────────────────────────────────────────────┐  │
│  │  Filter Store                                │  │
│  │  - search: string                            │  │
│  │  - sortBy: SortOption                        │  │
│  │  - sortDirection: 'asc' | 'desc'             │  │
│  │  - selectedTags: string[]                    │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│              Derived State (useMemo)               │
│  ┌──────────────────────────────────────────────┐  │
│  │  Computed Values                             │  │
│  │  - filteredAndSortedRepos                    │  │
│  │  - filteredAndSortedArticles                 │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

## Interactive Elements

### Landing Page
- **2 Navigation Buttons**: Route to detail pages
- **Hover Effects**: Card shadows and transitions

### Trending Repos Page
1. **Search Input**: Filter by name, description, or owner
2. **Sort Dropdown**: Stars, Forks, Recently Updated
3. **Sort Direction Button**: Ascending/Descending toggle
4. **External Links**: Open GitHub repo in new tab
5. **Back Button**: Return to landing page

### Trending Articles Page
1. **Search Input**: Filter by title, description, or tags
2. **Sort Dropdown**: Reactions, Comments, Date
3. **Sort Direction Button**: Ascending/Descending toggle
4. **External Links**: Open Dev.to article in new tab
5. **Back Button**: Return to landing page

## Performance Considerations

### Optimizations Implemented

1. **useMemo**: Memoizes filtered/sorted results
   - Only recomputes when dependencies change
   - Prevents unnecessary array operations

2. **Key Props**: Proper keys on mapped elements
   - Efficient React reconciliation

3. **Lazy Evaluation**: Data only fetched when needed
   - Pages load data on mount
   - No unnecessary prefetching

4. **CSS Optimization**: Tailwind CSS purging
   - Removes unused styles in production
   - Minimal bundle size

### Loading States

```
Initial Load
   ↓
┌──────────────────┐
│ LoadingSpinner   │
│ + LoadingCards   │
└──────────────────┘
   ↓
Data Loaded
   ↓
┌──────────────────┐
│ Actual Content   │
└──────────────────┘
```

### Error Handling

```
API Call Failed
   ↓
┌──────────────────┐
│ ErrorMessage     │
│ - Display error  │
│ - Retry button   │
└──────────────────┘
   ↓
User clicks Retry
   ↓
Refetch data
```

## Styling System

### Theme Variables (CSS Custom Properties)

```css
:root {
  --primary: hsl(221.2 83.2% 53.3%)
  --secondary: hsl(210 40% 96.1%)
  --background: hsl(0 0% 100%)
  --foreground: hsl(222.2 84% 4.9%)
  /* ... more colors ... */
}
```

### Component Styling Pattern

```typescript
// 1. Base classes (always applied)
const baseClasses = "rounded-md font-medium ..."

// 2. Variant classes (conditional)
const variants = {
  default: "bg-primary text-white",
  secondary: "bg-secondary text-black"
}

// 3. Size classes (conditional)
const sizes = {
  sm: "h-9 px-3",
  lg: "h-11 px-8"
}

// 4. Merge with cn() utility
className={cn(baseClasses, variants[variant], sizes[size], className)}
```

## Type Safety

### TypeScript Configuration

- **Strict mode enabled**: Maximum type safety
- **Path aliases**: `@/*` maps to `src/*`
- **Unused code detection**: Catches unused vars/params

### Type Definitions

All API responses, component props, and state are fully typed:
- `Repository` - GitHub repo structure
- `Article` - Dev.to article structure
- `FilterState` - Filter/sort state
- Component props interfaces

## Build & Deployment

### Development Build
```bash
npm run dev
→ Vite dev server with HMR
→ Fast refresh on file changes
```

### Production Build
```bash
npm run build
→ TypeScript compilation
→ Vite optimization
→ Tailwind CSS purging
→ Output to dist/
```

### Build Output
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── vite.svg
```

## Security Considerations

1. **CORS**: Backend must enable CORS for frontend domain
2. **Environment Variables**: API URL configurable via `.env`
3. **External Links**: `rel="noopener noreferrer"` on external links
4. **Input Sanitization**: React automatically escapes user input
5. **Dependencies**: Regular updates for security patches

## Accessibility

1. **Semantic HTML**: Proper heading hierarchy
2. **Alt Text**: Images have descriptive alt attributes
3. **Keyboard Navigation**: All interactive elements accessible
4. **Focus States**: Visible focus rings on inputs/buttons
5. **ARIA**: Ready for ARIA labels where needed

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **ES2020**: Modern JavaScript features
- **CSS Grid & Flexbox**: Layout system
- **CSS Custom Properties**: Theme system
