# Arjun Industries Website

This is a Next.js website with a connected admin panel.

Public pages:
- `/`
- `/about`
- `/services`
- `/gallery`
- `/contact`

Admin pages:
- `/admin/login`
- `/admin`

## Environment

Create a local env file from `.env.example` and set real values:

```bash
cp .env.example .env.local
```

Required env vars:
- `ADMIN_PASSWORD`
- `ADMIN_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

Required on Vercel for persistent admin edits, enquiries, and image uploads:
- `BLOB_READ_WRITE_TOKEN`

Optional SEO/social env vars:
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_GOOGLE_BUSINESS_URL`

## Local Run

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Admin Panel

Login path:

```bash
http://localhost:3000/admin/login
```

The admin panel uses only a password field. Current password:
- `123`

What the admin panel updates:
- Website content in `data/siteContent.json`
- Enquiries in `data/enquiries.json`
- Uploaded images in `public/uploads`

The website reads from the same files, so admin updates are reflected on the site.

## Vercel Deployment

The public website is ready to deploy on Vercel as a Next.js app.

Recommended Vercel settings:
- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave empty

Set these environment variables in the Vercel project before production deploy:
- `ADMIN_PASSWORD`
- `ADMIN_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

For persistent admin edits, contact enquiries, and uploaded images, add a Vercel Blob store to the project and set:
- `BLOB_READ_WRITE_TOKEN`

Without `BLOB_READ_WRITE_TOKEN`, local development and Docker use the JSON files in this repository, but Vercel production should be treated as read-only for admin writes.

## Persistent Storage

This project supports two storage modes:
- Local/Docker: writes to `data/` and `public/uploads/`
- Vercel: writes to Vercel Blob when `BLOB_READ_WRITE_TOKEN` is configured

Persistent storage is needed because:
- Admin content updates write to `data/siteContent.json`
- Contact enquiries write to `data/enquiries.json`
- Image uploads write to `public/uploads`

Vercel deployments do not persist runtime writes to the project filesystem, so production admin features should use Vercel Blob.

To set up Vercel Blob:
1. Open the Vercel project dashboard.
2. Add a Blob store from Storage.
3. Connect it to this project.
4. Confirm `BLOB_READ_WRITE_TOKEN` exists in the project environment variables.
5. Redeploy.

The first time Blob is enabled, the app falls back to the repository JSON seed content until admin changes or new enquiries are saved.

## Docker Deployment

This repository also includes a production-oriented Docker setup for the existing Next.js application.

### Included files

- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

### Prepare environment variables

Create a real `.env` file before running Compose:

```bash
cp .env.example .env
```

Required values:
- `ADMIN_PASSWORD`
- `ADMIN_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

Do not commit `.env`, `.env.local`, or any real secret values.

### Docker Compose commands

Build and start the app:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d
```

Stop the app:

```bash
docker compose down
```

Follow logs:

```bash
docker compose logs -f
```

Rebuild after code changes:

```bash
docker compose up --build
```

### Docker notes

- The container runs the app in production mode on port `3000`.
- The Docker image uses a multi-stage build and the Next.js standalone output to keep the runtime image smaller.
- `docker-compose.yml` mounts `data/` and `public/uploads/` so admin content changes, enquiries, and uploaded images persist across restarts.
- If you deploy without Compose, you still need persistent storage for `data/` and `public/uploads/`.

## Handoff Checklist

Before going live, verify all of the following:
- the public website opens correctly
- `/admin/login` opens correctly
- admin login works with the configured password
- editing content in admin updates the website
- if deployed to Vercel, Vercel Blob is connected and `BLOB_READ_WRITE_TOKEN` is configured
- uploading images in admin works
- submitting the contact form creates a new enquiry
- deleting an enquiry works
- the `Call` button in enquiries works on supported devices

## Build Status

The project builds successfully with:

```bash
npm run build
```
