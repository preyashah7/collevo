# Collevo — Backend + Frontend scaffold

This workspace includes the backend scaffold for Collevo (Node.js + Express + TypeScript) and frontend scaffolding (Vite + React + TypeScript + Tailwind) plus SQL schema and seed files for Supabase.

Quick backend steps:

1. cd backend
2. cp .env.example .env and set `DATABASE_URL`
3. npm install
4. npm run dev

Then visit http://localhost:5000/health and API endpoints under `/api/colleges`.

SQL files are in `sql/schema.sql` and `sql/seed_colleges.sql` for running in Supabase.
