
## Project Overview

I've built a full-stack starter project that combines React 19 with React Router 7 in framework mode with Strapi 5 headless CMS and I would like to share it with you. This project demonstrates how to create a dynamic blog website with server-side rendering, type safety, and a flexible content management system.

Later this tutorial we will build the project together. But now let's talk about the tech stack and my choices.

### Frontend Technologies

**React 19** - Because it is awesome. [Learn more about React](https://react.dev)

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

You can checkout the video that showcases the project and the setup steps.

## What Makes This Project Special

Give project overviwe blog website wtih dynamic ldning page aritlce page and article detail page

**Dynamic Content Blocks**

One of the coolest features is the dynamic content block system. Non-technical users can easily rearrange page sections through the Strapi admin panel, and the changes reflect immediately on the frontend. This is achieved through a flexible block renderer system that matches Strapi components to React components.

**Strapi API Integration**

The project uses Strapi's SDK for clean, type-safe API calls. Instead of manually writing fetch requests, you get elegant functions like:

```typescript
// Clean, API calls
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