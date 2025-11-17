## Project Overview

I've built a full-stack starter project that combines React 19 with React Router 7 in framework mode and Strapi 5 headless CMS, and I'd love to share it with you. 

We'll build a simple but powerful blog website with three main pages:

1. **Dynamic Landing Page** - We'll create a homepage that pulls content from our Strapi backend. The cool part? Content managers can rearrange sections without touching any code.

2. **Articles Page** - A clean page that displays all our blog posts in a grid layout, ready for future pagination features.

3. **Article Detail Page** - Individual pages for each blog post, complete with the author info, content, and proper SEO tags.

What makes this project special is how everything connects. Our React frontend talks to Strapi through a clean API, giving us server-side rendering for better SEO, full TypeScript support for fewer bugs, and a content management system that non-technical users can actually use.

Later in this tutorial, we'll build the project together step by step. But first, let's talk about the tech stack and why I chose these tools.

## Tech Stack & Why These Choices

### Frontend Technologies

**React 19** - Because it's awesome and brings the latest performance improvements and modern features. [Learn more about React](https://react.dev)

**React Router 7 Framework Mode** - The evolution of Remix, now integrated into React Router. This provides server-side rendering, file-based routing, and excellent developer experience out of the box. [React Router Documentation](https://reactrouter.com)

**Shadcn/ui & Tailwind CSS** - A combination of accessible, customizable components built on Radix UI with Tailwind's utility-first styling approach. This provides a clean, modern design system that's both beautiful and functional. [Shadcn/ui](https://ui.shadcn.com) | [Tailwind CSS](https://tailwindcss.com)

### Backend Technologies

**Strapi 5** - A powerful headless CMS that provides a flexible admin panel, TypeScript support, and excellent developer experience. [Strapi Documentation](https://docs.strapi.io)

## TL;DR - Just Want to Try It?

If you just want to get the project running quickly:

```bash
git clone https://github.com/PaulBratslavsky/strapi-react-router-7-starter.git
cd strapi-react-router-7-starter
yarn setup
yarn seed
yarn dev
```

The frontend will be available at `http://localhost:5173` and the Strapi admin at `http://localhost:1337/admin`. 

Check out the video walkthrough that showcases the project features and setup process.


## What Makes This Project Special

### Dynamic Content Blocks

One of the coolest features is the dynamic content block system. Non-technical users can easily rearrange page sections through the Strapi admin panel, and the changes reflect immediately on the frontend. This is achieved through a flexible block renderer system that matches Strapi components to React components.

### Strapi Cline SDK API Integration

The project uses Strapi's SDK for clean, type-safe API calls. Instead of manually writing fetch requests, you get elegant functions like:

```typescript
// Clean, typed API calls
const landingPageData = await sdk.find('landing-page');
const articles = await sdk.find('articles');
```

### SEO Optimized

Each page uses React Router 7's meta function to dynamically set SEO tags based on content from Strapi, ensuring great search engine optimization.

### Error Handling

Custom error boundaries provide graceful fallbacks and a clean 404 page experience when content isn't found.

## Project Architecture

The project is structured as a monorepo with two main directories:

- `client/` - React Router 7 frontend application
- `server/` - Strapi 5 backend CMS

### Frontend Structure

```
client/app/
├── components/
│   ├── blocks/     # Dynamic content blocks
│   ├── custom/     # Custom components
│   └── ui/         # Base UI components
├── lib/            # API client and utilities
├── routes/         # File-based routing
└── types/          # TypeScript definitions
```

### Key Features

- **File-based Routing** - Routes are automatically generated from the file structure
- **Server-side Rendering** - Better SEO and performance with SSR
- **Dynamic Content Management** - Content blocks can be reordered and managed through Strapi
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Type Safety** - Full TypeScript support across the stack

Now let's build this project together step by step.

## Setting Up the Strapi Backend

We won't build the Strapi backend from scratch in this tutorial, but let's understand how our API works. You can learn how to build it completely from my [Strapi 5 Crash Course](https://youtube.com/@PaulBratslavsky) on YouTube.

### Understanding Our API Endpoints

Our Strapi backend provides two main endpoints:

**Landing Page Endpoint:** `http://localhost:1337/api/landing-page`

This returns our homepage data with dynamic content blocks. Here's what the response looks like:

```json
{
  "data": {
    "id": 2,
    "title": "Landing Page",
    "blocks": [
      {
        "__component": "blocks.hero",
        "id": 2,
        "heading": "Build & Launch without problems",
        "text": "Lorem ipsum dolor sit amet..."
      },
      {
        "__component": "blocks.section-heading",
        "id": 2,
        "heading": "Build & Launch without problems"
      }
      // ... more blocks
    ]
  }
}
```

**Articles Endpoint:** `http://localhost:1337/api/articles`

This returns all our blog articles with author info, featured images, and content:

```json
{
  "data": [
    {
      "id": 7,
      "title": "Why JavaScript is Still Popular",
      "slug": "why-javascript-is-still-popular",
      "description": "JavaScript has dominated...",
      "content": "## Introduction\nJavaScript has...",
      "featuredImage": { "url": "/uploads/image.avif" },
      "author": {
        "fullName": "Jacke Brown",
        "bio": "I am a fullstack developer"
      }
    }
  ]
}
```

## Building the React Router 7 Frontend

Now let's create our React Router 7 application step by step.

### Step 1: Setting Up the React Router 7 Project

First, create a new React Router 7 project in framework mode:

```bash
npx create-react-router@latest my-blog-app --framework
cd my-blog-app
```

### Step 2: Understanding React Router 7 File-Based Routing

React Router 7 uses file-based routing with dot notation. Here's how our routes are structured:

```
app/routes/
├── $.tsx                    # Fallback route (404 page)
├── home.tsx                 # Homepage route
├── articles._index.tsx      # Articles listing page
└── articles.$slug.tsx       # Individual article page
```

Let's break down the naming convention:

- `$.tsx` - Catch-all route that handles 404 errors
- `home.tsx` - Maps to `/home` URL  
- `articles._index.tsx` - Maps to `/articles` (the underscore makes it the index)
- `articles.$slug.tsx` - Dynamic route that matches `/articles/any-slug`

### Step 3: Setting Up Shadcn/ui Components

Install Shadcn/ui for our UI components:

```bash
npx shadcn@latest init
npx shadcn@latest add button card avatar badge separator
```

### Step 4: Creating the Application Layout

Let's set up our main layout in `app/root.tsx`:

```tsx
import { Outlet } from "react-router";
import { Navigation } from "./components/custom/Navigation";
import { ErrorBoundary } from "./components/custom/ErrorBoundary";
import "./app.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ErrorBoundary>
          <Navigation />
          <Outlet />
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

### Step 5: Creating the Navigation Component

Create `app/components/custom/Navigation.tsx`:

```tsx
import { NavLink } from "react-router";

const styles = {
  nav: "flex items-center justify-between p-4 bg-white shadow-sm",
  brand: "text-xl font-bold text-gray-900",
  links: "flex space-x-6",
  link: "text-gray-600 hover:text-gray-900 transition-colors"
};

export function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/home" className={styles.brand}>
        My Blog
      </NavLink>
      <div className={styles.links}>
        <NavLink to="/home" className={styles.link}>
          Home
        </NavLink>
        <NavLink to="/articles" className={styles.link}>
          Articles
        </NavLink>
      </div>
    </nav>
  );
}
```

### Step 6: Setting Up the Strapi SDK

Install the Strapi SDK and create our API client:

```bash
npm install @strapi/sdk
```

Create `app/lib/sdk.ts`:

```typescript
import { Strapi } from "@strapi/sdk";

const sdk = new Strapi({
  url: "http://localhost:1337",
  prefix: "/api",
});

export default sdk;
```

### Step 7: Creating API Functions

Create `app/lib/api.ts` for our data fetching functions:

```typescript
import sdk from "./sdk";

interface StrapiResponse<T> {
  data?: T;
  error?: {
    status: number;
    message: string;
  };
}

export async function getLandingPage() {
  const response = await sdk.single("landing-page").find();
  return response as StrapiResponse<any>;
}

export async function getArticles() {
  const response = await sdk.collection("articles").find();
  return response as StrapiResponse<any[]>;
}

export async function getArticleBySlug(slug: string) {
  const response = await sdk.collection("articles").find({
    filters: { slug: { $eq: slug } }
  });
  return response as StrapiResponse<any[]>;
}
```

### Step 8: Building the Dynamic Homepage

Now let's create our homepage with dynamic blocks. First, create the Block Renderer in `app/components/blocks/BlockRenderer.tsx`:

```tsx
import { Hero } from "./Hero";
import { SectionHeading } from "./SectionHeading";
import { CardGrid } from "./CardGrid";

export function BlockRenderer({ blocks }: { blocks: any[] }) {
  const renderBlock = (block: any) => {
    switch (block.__component) {
      case "blocks.hero":
        return <Hero key={block.id} {...block} />;
      case "blocks.section-heading":
        return <SectionHeading key={block.id} {...block} />;
      case "blocks.card-grid":
        return <CardGrid key={block.id} {...block} />;
      default:
        return null;
    }
  };

  return <div>{blocks.map(renderBlock)}</div>;
}
```

### Step 9: Creating Block Components

Create individual block components. Here's the Hero component in `app/components/blocks/Hero.tsx`:

```tsx
interface HeroProps {
  id: number;
  heading: string;
  text: string;
  links?: Array<{
    href: string;
    label: string;
    isExternal: boolean;
  }>;
}

const styles = {
  container: "py-20 px-4 text-center bg-gradient-to-br from-blue-50 to-indigo-100",
  heading: "text-4xl md:text-6xl font-bold text-gray-900 mb-6",
  text: "text-xl text-gray-600 mb-8 max-w-2xl mx-auto",
  buttonContainer: "flex gap-4 justify-center"
};

export function Hero({ heading, text, links }: HeroProps) {
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.text}>{text}</p>
      {links && (
        <div className={styles.buttonContainer}>
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.href}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
```

### Step 10: Creating the Homepage Route

Create `app/routes/home.tsx`:

```tsx
import type { Route } from "./+types/home";
import { BlockRenderer } from "../components/blocks";
import { getLandingPage } from "../lib/api";

export async function loader({}: Route.LoaderArgs) {
  const response = await getLandingPage();
  
  if (!response?.data) {
    throw new Response("Landing page not found", { status: 404 });
  }
  
  return response.data;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Blog - Home" },
    { name: "description", content: "Welcome to my blog" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <BlockRenderer blocks={loaderData.blocks} />
    </main>
  );
}
```

### Step 11: Building the Articles Page

Create `app/routes/articles._index.tsx`:

```tsx
import type { Route } from "./+types/articles._index";
import { Link } from "react-router";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { getArticles } from "../lib/api";

export async function loader({}: Route.LoaderArgs) {
  const response = await getArticles();
  return response?.data || [];
}

export default function Articles({ loaderData }: Route.ComponentProps) {
  const articles = loaderData;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Articles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article: any) => (
          <Card key={article.id}>
            {article.featuredImage && (
              <img 
                src={`http://localhost:1337${article.featuredImage.url}`}
                alt={article.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <CardHeader>
              <h2 className="text-xl font-semibold">{article.title}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <Link 
                to={`/articles/${article.slug}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Read more →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
```

### Step 12: Creating Individual Article Pages

Create `app/routes/articles.$slug.tsx`:

```tsx
import type { Route } from "./+types/articles.$slug";
import { getArticleBySlug } from "../lib/api";
import ReactMarkdown from "react-markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const response = await getArticleBySlug(params.slug);
  
  if (!response?.data?.[0]) {
    throw new Response("Article not found", { status: 404 });
  }
  
  return response.data[0];
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.title },
    { name: "description", content: loaderData.description },
  ];
}

export default function Article({ loaderData }: Route.ComponentProps) {
  const article = loaderData;
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-600 text-lg mb-4">{article.description}</p>
          
          <div className="flex items-center space-x-4">
            <img 
              src={`http://localhost:1337${article.author.image?.url}`}
              alt={article.author.fullName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{article.author.fullName}</p>
              <p className="text-gray-500">{article.author.bio}</p>
            </div>
          </div>
        </header>
        
        <div className="prose max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
```

### Step 13: Adding Error Handling

Create `app/routes/$.tsx` for 404 handling:

```tsx
export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a 
          href="/home" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
```

## What We've Built

In this tutorial, we've created a complete blog website with:

1. **Dynamic Homepage** - Content blocks that can be rearranged in Strapi without touching code
2. **Articles Listing** - Clean grid layout showing all blog posts  
3. **Individual Article Pages** - Full articles with author info and SEO optimization
4. **Error Handling** - Graceful 404 pages and error boundaries
5. **Type Safety** - TypeScript throughout for better development experience

The magic is in the Block Renderer system - it dynamically displays different content types based on what's configured in Strapi. Content managers can add, remove, or reorder sections without developers needing to deploy code changes.

## What's Next?

You now have a solid foundation for a modern blog. Consider adding:

- Search functionality
- Pagination for articles
- Comments system  
- User authentication
- Related articles
- Newsletter signup

The combination of React Router 7 and Strapi gives you the flexibility to build whatever features your project needs next.

### Quick Setup

1. **Clone and install**
   ```bash
   git clone https://github.com/PaulBratslavsky/strapi-react-router-7-starter.git
   cd strapi-react-router-7-starter
   yarn setup
   ```

2. **Seed the database**
   ```bash
   yarn seed
   ```

3. **Start development servers**
   ```bash
   yarn dev
   ```

This will start both the React frontend (http://localhost:5173) and Strapi backend (http://localhost:1337) concurrently.

### Available Scripts

- `yarn setup` - Install dependencies for both client and server
- `yarn dev` - Start both development servers
- `yarn seed` - Import sample data into Strapi
- `yarn client` - Start only the frontend
- `yarn server` - Start only the backend

## What You'll Learn

This starter project demonstrates several key concepts:

1. **Modern React Patterns** - Using React 19 features with proper TypeScript typing
2. **Full-stack Architecture** - How frontend and backend work together seamlessly  
3. **Content Management** - Building flexible, dynamic content systems
4. **Server-side Rendering** - Implementing SSR with React Router 7
5. **API Integration** - Clean patterns for fetching and handling data
6. **Error Handling** - Graceful error boundaries and 404 handling
7. **SEO Best Practices** - Dynamic meta tags and structured content

## What's Next?

This starter gives you a solid foundation to build upon. Some ideas for extending the project:

- Add user authentication and protected routes
- Implement search functionality
- Add pagination for articles
- Create additional content types
- Add image optimization
- Implement caching strategies

## Learn More

Want to see how the Strapi backend was built from scratch? Check out my [Strapi 5 Crash Course](https://youtube.com/@PaulBratslavsky) - over 3.5 hours of free content walking through every step of building a production-ready CMS.

The combination of React Router 7 and Strapi 5 creates a powerful, flexible foundation for modern web applications. Whether you're building a blog, portfolio site, or complex web application, this starter provides the structure and patterns you need to succeed.