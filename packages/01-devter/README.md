# DevTer

Twitter for developers.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# orhttps://console.firebase.google.com/u/0/project/devter-b77d3/authentication/providers
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🔥 Tool Kit

- [firebase](https://firebase.google.com), platform to support you throughout your app development journey. Used to authentication with a GitHub account.

## 🪛 Tools

- [svgr](https://react-svgr.com/playground) tool to convert SVG images into React components.
- [eslint](https://eslint.org/docs/latest/use/getting-started) to lint your code with standard js rules.e
- [standarjs](https://standardjs.com/), the JavaScript Standard Style.
- [prettier](https://prettier.io/), to format your code.
- [DateTimeFormat](https://prettier.io/), to format your dates according you region.

> Warning: No use external packages complementaries from eslint and prettier. This make the format and lint set up a cumbersome.

## 📓 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

Check an explanation wiht the use case for the dependencies management in package.json.

- `dependencies`: Dependencies that need our project to work on produuction.
- `devDependencies`: Dependencies taht we use in development stage (e.g., linters, types, formatters, etc.)
- `peerDependencies`: Dependencies that by default require a the project.

Firebase offers youu 2 database type:

1. **Firestore**, to handle *high* frequent data change in database, increasing complexity in the queries.
2. **Realtime**, to handle frequent *low* data change in database, keeping data manipulation simple.

## ☄️ Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                      |
| :------------------------ | :------------------------------------------ |
| `pnpm install`            | Installs dependencies                       |
| `pnpm run dev`            | Starts local dev server at `localhost:3000` |
| `pnpm run build`          | Build your production site to `./dist/`     |
| `pnpm run lint`           | Run the next lin in the project             |
| `pnpx prettier . --check` | Check the format errors                     |
| `pnpx prettier . --write` | write the format errors                     |
