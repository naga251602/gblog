# 🚀 gblog

A high-performance, minimalist digital garden built with **Next.js 15**, **Supabase**, and **TypeScript**. Engineered for speed, accessibility, and algorithmic efficiency.

![Lighthouse Score](https://img.shields.io/badge/Lighthouse-95%2B-success?style=for-the-badge&logo=lighthouse)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)

---

## 📸 Demo

![gblog demo](./demo/demo.png)

> _A clean, fast, and distraction-free writing environment._

---

## ⚡ Key Features

- **Algorithmic Search:** Implemented a custom **AVL Tree** search index over post metadata. This ensures guaranteed $O(\log n)$ tag and category lookups, with automatic rebalancing on content updates.
- **Extreme Performance:** Maintains a **95+ Lighthouse score** across mobile and desktop.
- **Advanced ISR:** Utilizes Incremental Static Regeneration with on-demand revalidation via Supabase Webhooks.
- **Automated Quality:** Every Pull Request triggers a **Lighthouse CI** audit on Vercel preview environments to prevent performance regression.
- **Optimized Assets:** Automatic image optimization and format selection (WebP/AVIF) via Next.js and custom configured remote patterns.

---

## 🏗️ Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            gblog Architecture                           │
└─────────────────────────────────────────────────────────────────────────┘

  ┌──────────────┐     ┌────────────────────────────────────────────────┐
  │              │     │                  Next.js 15 App                 │
  │   Browser /  │────▶│  ┌──────────────┐   ┌──────────────────────┐  │
  │    Client    │     │  │  App Router  │   │   ISR + Static Pages  │  │
  │              │◀────│  │  (RSC + SSG) │   │  (revalidate on-demand│  │
  └──────────────┘     │  └──────┬───────┘   └──────────┬───────────┘  │
                        │         │                       │              │
                        │  ┌──────▼───────────────────────▼───────────┐ │
                        │  │           Custom Search Index              │ │
                        │  │  ┌─────────────────────────────────────┐  │ │
                        │  │  │         AVL Tree (In-Memory)         │  │ │
                        │  │  │  • Tag lookups:      O(log n)        │  │ │
                        │  │  │  • Category lookups: O(log n)        │  │ │
                        │  │  │  • Auto-rebalance on content updates  │  │ │
                        │  │  └─────────────────────────────────────┘  │ │
                        │  └────────────────────┬───────────────────────┘ │
                        └───────────────────────│──────────────────────────┘
                                                │
                        ┌───────────────────────▼──────────────────────────┐
                        │                   Supabase                        │
                        │  ┌─────────────────┐   ┌──────────────────────┐  │
                        │  │   PostgreSQL DB  │   │  Webhook Triggers    │  │
                        │  │  (Posts, Tags,   │   │  (On-demand ISR      │  │
                        │  │   Categories)    │   │   Revalidation)      │  │
                        │  └─────────────────┘   └──────────────────────┘  │
                        └──────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────────────┐
  │                          CI/CD Pipeline                                 │
  │                                                                         │
  │  Developer Push                                                         │
  │       │                                                                 │
  │       ▼                                                                 │
  │  ┌─────────┐    ┌──────────────┐    ┌───────────────┐    ┌──────────┐ │
  │  │ GitHub  │───▶│    Vercel    │───▶│ Lighthouse CI │───▶│   PR     │ │
  │  │  Push   │    │  Preview     │    │  Headless     │    │ Blocked  │ │
  │  │         │    │  Deploy      │    │  Audit        │    │ if < 95  │ │
  │  └─────────┘    └──────────────┘    └───────────────┘    └──────────┘ │
  │                                      Perf · A11y · SEO                 │
  └─────────────────────────────────────────────────────────────────────────┘
```

### Custom Search Indexing (AVL Tree)

Unlike standard linear searches, gblog tokenizes post metadata and titles into a self-balancing binary search tree. This architectural choice minimizes latency as the content library scales.

### CI/CD Pipeline

Deployed on **Vercel** with a dedicated GitHub Action for performance monitoring:

1. **Push:** Developer pushes code to a branch.
2. **Preview:** Vercel generates a preview deployment.
3. **Audit:** Lighthouse CI spins up a headless browser to verify Performance, Accessibility, Best Practices, and SEO.
4. **Enforce:** PR is blocked if any score falls below **95**.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Supabase Project

### Installation

```bash
git clone https://github.com/naga251602/gblog.git
cd gblog
npm install
```

### Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
REVALIDATION_SECRET=your_secret
```

### Running Locally

```bash
npm run dev
```

---

## 🛠️ Tech Stack

| Layer     | Technology                     |
| --------- | ------------------------------ |
| Framework | Next.js 15 (App Router)        |
| Language  | TypeScript                     |
| Styling   | Tailwind CSS v4                |
| Database  | PostgreSQL (Supabase)          |
| Icons     | Lucide React                   |
| CI/CD     | GitHub Actions + Lighthouse CI |
| Hosting   | Vercel                         |

---

Built with 🖤 by Gaurav N V
