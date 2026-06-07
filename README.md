<div align="center">

# 🌙 Sakina

**Your quiet sanctuary for mental wellness, journaling, and peaceful reflection.**

*মানসিক শান্তির নীড় — honest reflection, gentle insights, and a calm space to write.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare](https://img.shields.io/badge/Deploy-Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers/)

[Live Demo](https://sakina.rakib2020-tkg.workers.dev/) · [Report Bug](https://github.com/rakibislam2233/sakina/issues) · [Request Feature](https://github.com/rakibislam2233/sakina/issues)

</div>

---

## ✨ About

**Sakina** is a mental wellness journal built for people who want a softer, more intentional way to process their thoughts. Write daily chapters, track your moods, and receive thoughtful **Sakina Insights** — poetic reflections, emotional resonance, and curated reading suggestions tailored to how you feel.

The app is fully bilingual (**English** & **Bangla**), theme-aware, and designed to feel calm on both mobile and desktop.

**Live site:** [sakina.rakib2020-tkg.workers.dev](https://sakina.rakib2020-tkg.workers.dev/)

---

## 🌿 Features

| Feature | Description |
| --- | --- |
| **Compose** | Write journal chapters with title, mood, word count, and draft auto-save |
| **Sakina Insights** | AI-style reflection panels — emotional embrace, spiritual tranquility, and book recommendations |
| **Chapters** | Search, filter by mood, read, edit, and archive your writing history |
| **Wellness Report** | Mood ratios, writing streaks, word trends, and weekly summaries |
| **Account** | Profile, avatar, daily goals, theme & language preferences, password management |
| **5 Themes** | Parchment, Night, Dawn, Forest, and Ocean — each with its own mood |
| **i18n** | English & Bangla (Hind Siliguri font for Bangla typography) |
| **Auth** | Login, register, forgot/reset password flows |
| **Responsive UI** | Mobile hamburger nav, accessible shadcn/ui components |

---

## 🎨 Themes

| Theme | Emoji | Vibe |
| --- | --- | --- |
| Sakina Parchment | 📜 | Warm light tones for calm daytime reflection |
| Sakina Night | 🌙 | Soft dark lavender for peaceful evening journaling |
| Sakina Dawn | 🌅 | Golden peach hues for hopeful morning clarity |
| Sakina Forest | 🌿 | Earthy greens for grounding and natural balance |
| Sakina Ocean | 🌊 | Deep teal blues for flow, clarity, and stillness |

---

## 🛠 Tech Stack

- **Framework** — [Next.js 15](https://nextjs.org/) (App Router)
- **UI** — [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Forms** — [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **i18n** — [i18next](https://www.i18next.com/) + react-i18next
- **Icons** — [Lucide React](https://lucide.dev/)
- **Deploy** — [OpenNext Cloudflare](https://opennext.js.org/cloudflare) + Wrangler

---

## 📁 Project Structure

```
sakina/
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── (auth)/             # Login, register, password flows
│   │   ├── (main)/             # Compose, chapters, wellness, account
│   │   └── api/                # Entries & reflection endpoints
│   ├── components/
│   │   ├── auth/               # Auth forms & shell
│   │   ├── chapters/           # Compose, list, detail, insights
│   │   ├── layout/             # Header, footer, theme picker
│   │   ├── moods/              # Mood selector
│   │   ├── providers/          # Auth, journal, theme, i18n
│   │   ├── ui/                 # shadcn primitives
│   │   └── wellness/           # Report & account views
│   ├── lib/                    # Themes, SEO, utilities
│   ├── locales/                # en.json, bn.json
│   └── types/                  # Shared TypeScript types
├── open-next.config.ts         # OpenNext Cloudflare config
├── wrangler.jsonc              # Cloudflare Workers config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/rakibislam2233/sakina.git
cd sakina

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required for Gemini AI reflection (when enabled)
GEMINI_API_KEY="your_gemini_api_key"

# Optional — used for SEO and self-referential links
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
APP_URL="http://localhost:3000"
```

> **Note:** The reflection API currently serves curated dummy insights for development. Connect your Gemini API key when you wire up live AI responses.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server locally |
| `npm run lint` | Type-check with TypeScript |
| `npm run clean` | Remove `.next` and `.open-next` caches |
| `npm run preview` | Build & preview on Cloudflare locally |
| `npm run deploy` | Deploy to Cloudflare Workers |

---

## ☁️ Deploy to Cloudflare

Sakina is configured for edge deployment with OpenNext + Cloudflare Workers.

```bash
# Preview locally with Wrangler
npm run preview

# Deploy to Cloudflare
npm run deploy
```

Make sure your Cloudflare account is linked and `wrangler.jsonc` is configured for your worker name.

---

## 🗺 Routes

| Route | Purpose |
| --- | --- |
| `/compose` | Write a new journal chapter |
| `/chapters` | Browse and search your chapters |
| `/chapters/[id]` | Read or edit a single chapter |
| `/wellness` | Wellness report & writing analytics |
| `/account` | Profile, theme, language & settings |
| `/login` | Sign in |
| `/register` | Create account |
| `/forgot-password` | Request password reset |
| `/reset-password` | Set a new password |

---

## 🌍 Languages

Switch between **English** and **Bangla (বাংলা)** from the header or Account page. Bangla content uses the **Hind Siliguri** typeface for readable, elegant typography.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request on [GitHub](https://github.com/rakibislam2233/sakina).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. See the repository for license details.

---

<div align="center">

**Made with care for peaceful hours** 🌙

[GitHub Repository](https://github.com/rakibislam2233/sakina)

</div>
