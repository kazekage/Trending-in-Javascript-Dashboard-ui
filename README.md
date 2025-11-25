# Trending in JavaScript Dashboard

A modern, production-ready React application that aggregates real-time developer metrics from public APIs, presenting trending JavaScript repositories and articles in an interactive dashboard.

## 🚀 Features

- **Landing Page**: Clean, gradient-styled homepage with navigation to two main sections
- **Trending JS Repos**: Browse popular JavaScript repositories from GitHub with:
  - Real-time search functionality
  - Sorting by stars, forks, or last updated
  - Ascending/descending order toggle
  - Repository cards with stars, forks, and topics
  - Direct links to GitHub repos
  
- **Trending JS Articles**: Discover developer articles from Dev.to with:
  - Full-text search across titles, descriptions, and tags
  - Sort by reactions, comments, or date
  - Reading time estimates
  - Cover images and article metadata
  - Direct links to Dev.to articles

- **Production-Ready UX**:
  - Responsive design for mobile, tablet, and desktop
  - Loading states with skeleton screens
  - Error handling with retry functionality
  - Smooth animations and transitions
  - Accessible UI components
  - Dark mode ready with CSS variables

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: Zustand (lightweight state management)
- **Component Architecture**: Custom UI components inspired by shadcn/ui
- **API Integration**: Fetch API with TypeScript type safety

## 📁 Project Structure

```
src/
├── components/
│   └── ui/              # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Loading.tsx
│       └── ErrorMessage.tsx
├── pages/               # Page components
│   ├── LandingPage.tsx
│   ├── TrendingReposPage.tsx
│   └── TrendingArticlesPage.tsx
├── services/            # API service layers
│   ├── repositoryService.ts
│   └── articleService.ts
├── store/               # Zustand store
│   └── filterStore.ts
├── types/               # TypeScript types
│   └── index.ts
├── lib/                 # Utilities
│   └── utils.ts
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A backend API service (see Backend Requirements below)

### Installation

1. **Clone the repository**
   ```bash
   cd Trending-in-Javascript-Dashboard-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your backend API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔌 Backend API Requirements

The frontend expects a backend service with the following endpoints:

### Repositories

- `GET /api/repos/trending` - Returns trending JavaScript repositories
  ```typescript
  Response: Repository[]
  ```

- `GET /api/repos/search?q={query}` - Search repositories
  ```typescript
  Response: Repository[]
  ```

### Articles

- `GET /api/articles/trending` - Returns trending developer articles
  ```typescript
  Response: Article[]
  ```

- `GET /api/articles/search?q={query}` - Search articles
  ```typescript
  Response: Article[]
  ```

See `src/types/index.ts` for complete type definitions.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

The application uses a custom design system built on Tailwind CSS with:

- **Color Scheme**: CSS custom properties for theming
- **Typography**: Responsive font sizes and weights
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components with variants
- **Animations**: Smooth transitions and fade-in effects
- **Dark Mode**: Ready for dark mode implementation

## 🔍 Key Features Explained

### State Management

Uses Zustand for global filter state management across pages:
- Search queries
- Sort options and directions
- Selected filters

### API Service Layer

Clean separation of concerns with dedicated service modules:
- Centralized error handling
- Type-safe responses
- Easy to mock for testing

### Interactive Elements

Both detail pages include multiple interactive features:
- **Search**: Real-time filtering as you type
- **Sorting**: Multiple sort criteria with direction toggle
- **Navigation**: Smooth routing between pages
- **External Links**: Open repos/articles in new tabs

### Loading & Error States

Production-ready UX patterns:
- Skeleton loading cards during data fetch
- Centered spinner for initial loads
- Friendly error messages with retry buttons
- Empty state messaging

## 🚀 Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build locally**
   ```bash
   npm run preview
   ```

3. **Deploy** to your preferred hosting platform:
   - Vercel: `vercel --prod`
   - Netlify: `netlify deploy --prod`
   - AWS S3/CloudFront
   - Any static hosting service

4. **Environment Variables**: Ensure `VITE_API_BASE_URL` is set in your hosting platform

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- GitHub API for repository data
- Dev.to API for article data
- Tailwind CSS for styling utilities
- Lucide React for beautiful icons
- shadcn/ui for component inspiration