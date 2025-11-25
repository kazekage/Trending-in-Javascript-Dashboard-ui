# API Examples & Mock Data

This document provides example API responses for backend developers implementing the service.

## Endpoint: GET /api/repos/trending

Returns trending JavaScript repositories from GitHub.

### Example Response

```json
[
  {
    "id": 1296269,
    "name": "react",
    "full_name": "facebook/react",
    "description": "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    "html_url": "https://github.com/facebook/react",
    "stargazers_count": 215000,
    "forks_count": 44500,
    "language": "JavaScript",
    "open_issues_count": 1200,
    "owner": {
      "login": "facebook",
      "avatar_url": "https://avatars.githubusercontent.com/u/69631?v=4"
    },
    "created_at": "2013-05-24T16:15:54Z",
    "updated_at": "2024-01-15T10:30:00Z",
    "topics": ["react", "javascript", "ui", "frontend", "library"]
  },
  {
    "id": 10270250,
    "name": "next.js",
    "full_name": "vercel/next.js",
    "description": "The React Framework for the Web",
    "html_url": "https://github.com/vercel/next.js",
    "stargazers_count": 118000,
    "forks_count": 25000,
    "language": "JavaScript",
    "open_issues_count": 2100,
    "owner": {
      "login": "vercel",
      "avatar_url": "https://avatars.githubusercontent.com/u/14985020?v=4"
    },
    "created_at": "2016-10-05T23:12:37Z",
    "updated_at": "2024-01-15T09:45:00Z",
    "topics": ["nextjs", "react", "ssr", "hybrid", "framework"]
  },
  {
    "id": 28457823,
    "name": "node",
    "full_name": "nodejs/node",
    "description": "Node.js JavaScript runtime",
    "html_url": "https://github.com/nodejs/node",
    "stargazers_count": 98500,
    "forks_count": 27000,
    "language": "JavaScript",
    "open_issues_count": 1650,
    "owner": {
      "login": "nodejs",
      "avatar_url": "https://avatars.githubusercontent.com/u/9950313?v=4"
    },
    "created_at": "2014-12-30T23:36:55Z",
    "updated_at": "2024-01-15T11:20:00Z",
    "topics": ["nodejs", "javascript", "runtime", "v8"]
  }
]
```

### TypeScript Type

```typescript
interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
  topics: string[];
}
```

---

## Endpoint: GET /api/repos/search?q={query}

Search repositories by query string.

### Example Request
```
GET /api/repos/search?q=react hooks
```

### Example Response

Same format as `/api/repos/trending`, filtered by search query.

---

## Endpoint: GET /api/articles/trending

Returns trending developer articles from Dev.to.

### Example Response

```json
[
  {
    "id": 1234567,
    "title": "10 Advanced React Patterns You Should Know in 2024",
    "description": "Explore the most useful React patterns that will make your code more maintainable and scalable.",
    "url": "https://dev.to/username/10-advanced-react-patterns-you-should-know",
    "published_at": "2024-01-15T08:00:00Z",
    "tag_list": ["react", "javascript", "webdev", "programming"],
    "positive_reactions_count": 542,
    "public_reactions_count": 542,
    "comments_count": 38,
    "reading_time_minutes": 8,
    "user": {
      "name": "John Developer",
      "username": "johndev",
      "profile_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--example--/https://dev-to-uploads.s3.amazonaws.com/example.jpg"
    },
    "cover_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--example--/https://dev-to-uploads.s3.amazonaws.com/cover.jpg"
  },
  {
    "id": 1234568,
    "title": "Building a Full-Stack App with Node.js and TypeScript",
    "description": "A comprehensive guide to building modern web applications with Node.js and TypeScript",
    "url": "https://dev.to/username/building-fullstack-app-nodejs-typescript",
    "published_at": "2024-01-14T14:30:00Z",
    "tag_list": ["nodejs", "typescript", "backend", "tutorial"],
    "positive_reactions_count": 389,
    "public_reactions_count": 389,
    "comments_count": 25,
    "reading_time_minutes": 12,
    "user": {
      "name": "Sarah Code",
      "username": "sarahcode",
      "profile_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--example2--/https://dev-to-uploads.s3.amazonaws.com/example2.jpg"
    },
    "cover_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--example2--/https://dev-to-uploads.s3.amazonaws.com/cover2.jpg"
  },
  {
    "id": 1234569,
    "title": "Understanding JavaScript Closures Once and For All",
    "description": "Master one of JavaScript's most powerful and confusing concepts with practical examples",
    "url": "https://dev.to/username/understanding-javascript-closures",
    "published_at": "2024-01-13T10:15:00Z",
    "tag_list": ["javascript", "webdev", "beginners", "tutorial"],
    "positive_reactions_count": 712,
    "public_reactions_count": 712,
    "comments_count": 56,
    "reading_time_minutes": 6,
    "user": {
      "name": "Alex JavaScript",
      "username": "alexjs",
      "profile_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--example3--/https://dev-to-uploads.s3.amazonaws.com/example3.jpg"
    }
  }
]
```

### TypeScript Type

```typescript
interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  positive_reactions_count: number;
  public_reactions_count: number;
  comments_count: number;
  reading_time_minutes: number;
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  cover_image?: string;
}
```

---

## Endpoint: GET /api/articles/search?q={query}

Search articles by query string.

### Example Request
```
GET /api/articles/search?q=typescript
```

### Example Response

Same format as `/api/articles/trending`, filtered by search query.

---

## Implementation Tips for Backend Developers

### 1. GitHub API Integration

```javascript
// Example: Fetch trending JavaScript repos from GitHub
const response = await fetch(
  'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=30',
  {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${process.env.GITHUB_TOKEN}` // Optional but recommended
    }
  }
);

const data = await response.json();
const repos = data.items.map(item => ({
  id: item.id,
  name: item.name,
  full_name: item.full_name,
  description: item.description,
  html_url: item.html_url,
  stargazers_count: item.stargazers_count,
  forks_count: item.forks_count,
  language: item.language,
  open_issues_count: item.open_issues_count,
  owner: {
    login: item.owner.login,
    avatar_url: item.owner.avatar_url
  },
  created_at: item.created_at,
  updated_at: item.updated_at,
  topics: item.topics || []
}));
```

### 2. Dev.to API Integration

```javascript
// Example: Fetch trending articles from Dev.to
const response = await fetch(
  'https://dev.to/api/articles?tag=javascript&top=7&per_page=30',
  {
    headers: {
      'Accept': 'application/json'
    }
  }
);

const articles = await response.json();
// Articles are already in the correct format for Dev.to API
```

### 3. CORS Configuration

Ensure your backend enables CORS for the frontend domain:

```javascript
// Express.js example
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET'],
  credentials: true
}));
```

### 4. Rate Limiting Considerations

- **GitHub**: 60 requests/hour unauthenticated, 5000/hour authenticated
- **Dev.to**: No strict limits but be reasonable
- Consider caching responses (Redis, memory cache)
- Implement request throttling

### 5. Error Handling

Return appropriate HTTP status codes:

```javascript
// 200 - Success
res.status(200).json(data);

// 400 - Bad Request (invalid query)
res.status(400).json({ error: 'Invalid search query' });

// 500 - Server Error
res.status(500).json({ error: 'Failed to fetch data from external API' });

// 503 - Service Unavailable (rate limit exceeded)
res.status(503).json({ error: 'Rate limit exceeded, try again later' });
```

### 6. Caching Strategy

```javascript
// Simple in-memory cache with expiration
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedOrFetch(key, fetchFn) {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

### 7. Search Implementation

```javascript
// Filter results by query
function searchRepos(repos, query) {
  const lowerQuery = query.toLowerCase();
  
  return repos.filter(repo => 
    repo.name.toLowerCase().includes(lowerQuery) ||
    repo.description?.toLowerCase().includes(lowerQuery) ||
    repo.owner.login.toLowerCase().includes(lowerQuery) ||
    repo.topics.some(topic => topic.toLowerCase().includes(lowerQuery))
  );
}
```

---

## Testing Your API

### Using curl

```bash
# Test trending repos
curl http://localhost:3000/api/repos/trending

# Test search
curl "http://localhost:3000/api/repos/search?q=react"

# Test trending articles
curl http://localhost:3000/api/articles/trending

# Test article search
curl "http://localhost:3000/api/articles/search?q=typescript"
```

### Using Postman

1. Import collection with endpoints
2. Set base URL: `http://localhost:3000/api`
3. Test each endpoint
4. Verify response format matches TypeScript types

---

## Sample Backend Server (Express.js)

```javascript
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper function
async function getCachedOrFetch(key, fetchFn) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  const data = await fetchFn();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

// GET /api/repos/trending
app.get('/api/repos/trending', async (req, res) => {
  try {
    const data = await getCachedOrFetch('trending-repos', async () => {
      const response = await axios.get(
        'https://api.github.com/search/repositories',
        {
          params: {
            q: 'language:javascript',
            sort: 'stars',
            order: 'desc',
            per_page: 30
          }
        }
      );
      return response.data.items;
    });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// GET /api/repos/search
app.get('/api/repos/search', async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }
  
  try {
    const response = await axios.get(
      'https://api.github.com/search/repositories',
      {
        params: {
          q: `${q} language:javascript`,
          sort: 'stars',
          order: 'desc',
          per_page: 30
        }
      }
    );
    
    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search repositories' });
  }
});

// GET /api/articles/trending
app.get('/api/articles/trending', async (req, res) => {
  try {
    const data = await getCachedOrFetch('trending-articles', async () => {
      const response = await axios.get(
        'https://dev.to/api/articles',
        {
          params: {
            tag: 'javascript',
            top: '7',
            per_page: 30
          }
        }
      );
      return response.data;
    });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET /api/articles/search
app.get('/api/articles/search', async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }
  
  try {
    const response = await axios.get(
      'https://dev.to/api/articles/search',
      {
        params: {
          q,
          tag: 'javascript',
          per_page: 30
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search articles' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Environment Variables for Backend

```bash
# .env
GITHUB_TOKEN=your_github_personal_access_token
FRONTEND_URL=http://localhost:5173
PORT=3000
```

This should help backend developers quickly implement a compatible API service!
