# 👔 Recruiterre - Modern Job Board

<div align="center">

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?style=for-the-badge&logo=nuxt.js)](https://nuxt.com)
[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

A modern job board application built with Nuxt 3, featuring real-time search, filtering, and an interactive map interface.

[Demo](https://recruiterre-os.nuxtmint.com) · [Report Bug](https://github.com/NuxtMint/recruiterre-mint/issues) · [Request Feature](https://github.com/NuxtMint/recruiterre-mint/issues)

</div>

## 💝 Support My Work

[![NuxtMint](https://nuxtmint.com/nuxt-mint-logo.png)](https://nuxtmint.com)

> This template and many others are available at [NuxtMint.com](https://nuxtmint.com)

[![Discord](https://img.shields.io/badge/Discord-Join_Us!-5865F2?style=for-the-badge&logo=discord)](https://discord.gg/dZF8tDgBrM)

> Join our friendly Discord community to get help, share your ideas, and connect with other developers!

## Features

- 🔍 Real-time job search and filtering
- 🗺️ Interactive location mapping with Leaflet
- 💅 Modern UI with Tailwind CSS
- 🎨 Smooth animations and transitions
- 📱 Fully responsive design
- ⚡ Server-side rendering with Nuxt 3
- 📝 Markdown-based job listings
- 🔄 Dynamic content with @nuxt/content

## Setup

Make sure to install dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

## Deployment

We recommend using Cloudflare for deployment. This project is optimized for serverless environments and uses [@nuxt/content](https://content.nuxt.com/docs/deploy/serverless#_1-select-a-database-service) for content management.

### Setup with Cloudflare

1. Create a D1 database in your Cloudflare account
2. Update your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  content: {
    database: {
      type: 'd1',
      binding: '<YOUR_BINDING_NAME>',
    },
  },
});
```

3. Deploy using Cloudflare Pages with the following settings:
   - Build command: `pnpm build`
   - Build output directory: `dist`
4. Bind your D1 database to the project Page in your Page settings in CloudFlare (Bindings -> Add binding -> Service -> D1 -> Select your database -> Bind to project)
5. Re-deploy the project

The deployment will automatically handle:

- Server-side rendering
- Content database integration
- Asset optimization
- Global CDN distribution

## Tech Stack

- [Nuxt 3](https://nuxt.com/) - The Vue Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [@nuxt/content](https://content.nuxtjs.org/) - Content management
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework

## Project Structure

```
├── assets/                 # Static assets like CSS, images
│   └── css/               # Global CSS files
├── components/            # Vue components
│   ├── JobCard.vue       # Job listing card
│   ├── JobListings.vue   # Job listings container
│   ├── JobFilters.vue    # Search and filter components
│   └── HomeHero.vue      # Landing page hero section
├── content/              # Content management
│   └── jobs/             # Job listing markdown files
├── layouts/              # Page layouts
│   └── default.vue       # Default application layout
├── pages/                # Application routes
│   ├── index.vue         # Homepage
│   └── jobs/             # Job-related pages
│       └── [slug].vue    # Individual job page
├── public/               # Public static files
├── nuxt.config.ts        # Nuxt configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Nuxt](https://nuxt.com/) for the amazing Vue framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Leaflet](https://leafletjs.com/) for the interactive mapping capabilities
- [Heroicons](https://heroicons.com/) for the beautiful icons
- The Vue.js community for their invaluable resources and support

## License

This project is open source and available under the [MIT License](LICENSE).

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information about deploying to production.
