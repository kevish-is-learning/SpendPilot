# SpendPilot

SpendPilot is an AI-powered SaaS platform that helps companies audit and optimize their AI tooling expenses. By analyzing current subscriptions against a deterministic rules engine and leveraging generative AI, SpendPilot provides actionable recommendations to downgrade, consolidate, and save on software costs.

## Features

- **Dynamic Audit Form:** React Hook Form + Zod + Zustand for a seamless, multi-step entry of your tech stack.
- **Deterministic Audit Engine:** Rule-based TypeScript engine that calculates true costs (accounting for minimum seats and annual multipliers).
- **Interactive Dashboard:** Beautiful Recharts data visualization comparing Current vs. Proposed spend.
- **Lead Capture & DB:** Prisma + Postgres backend to securely save reports and capture high-intent emails.
- **AI Executive Summary:** Streaming generative AI via Vercel AI SDK to explain savings opportunities.
- **Public Shareable Links:** Server-rendered public reports with dynamic OpenGraph meta tags for viral sharing.
- **CI/CD:** GitHub Actions configured for Jest testing, ESLint, and Next.js builds.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS, shadcn/ui, Framer Motion
- **Database:** PostgreSQL, Prisma ORM
- **State Management:** Zustand
- **Forms:** React Hook Form, Zod
- **AI:** Vercel AI SDK, OpenAI (`gpt-4o-mini`)
- **Testing:** Jest, React Testing Library

## Getting Started Locally

### 1. Clone & Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables
Create a \`.env\` file in the root directory:
\`\`\`env
# Database connection (Use Neon, Supabase, or a local Postgres instance)
DATABASE_URL="postgresql://user:password@localhost:5432/spendpilot?schema=public"

# OpenAI API Key for the Executive Summary generation
OPENAI_API_KEY="sk-your-openai-api-key"

# (Optional) Resend API Key for transactional emails
RESEND_API_KEY="re_your-resend-api-key"
\`\`\`

### 3. Setup the Database
Push the Prisma schema to your Postgres database:
\`\`\`bash
npx prisma db push
npx prisma generate
\`\`\`

### 4. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`
Visit \`http://localhost:3000\` to start your audit.

## Testing

Run the Jest test suite for the deterministic audit engine:
\`\`\`bash
npm run test
\`\`\`

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. In the Vercel dashboard, add your Environment Variables (\`DATABASE_URL\`, \`OPENAI_API_KEY\`).
4. (Optional) If using Vercel Postgres, Vercel will automatically configure the \`POSTGRES_URL\`. Ensure your \`prisma.config.ts\` points to it.
5. Click **Deploy**. Vercel will automatically run \`npm run build\` and deploy the application globally.

## License

MIT
