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

What the admin panel updates:
- Website content in `data/siteContent.json`
- Enquiries in `data/enquiries.json`
- Uploaded images in `public/uploads`

The website reads from the same files, so admin updates are reflected on the site.

## Production Deployment

This project must be hosted as a real Node.js app.

Production commands:

```bash
npm install
npm run build
npm run start
```

## Important Hosting Requirement

The hosting environment must support persistent writable storage.

Why:
- Admin content updates write to `data/siteContent.json`
- Contact enquiries write to `data/enquiries.json`
- Image uploads write to `public/uploads`

If the server filesystem is read-only or temporary, admin changes will not persist after restart or redeploy.

Recommended hosting:
- VPS
- dedicated server
- VM
- Docker container with persistent mounted volumes

Persist these folders in production:
- `data/`
- `public/uploads/`

## Handoff Checklist

Before going live, verify all of the following:
- the public website opens correctly
- `/admin/login` opens correctly
- admin login works with the configured password
- editing content in admin updates the website
- uploading images in admin works
- submitting the contact form creates a new enquiry
- deleting an enquiry works
- the `Call` button in enquiries works on supported devices

## Build Status

The project builds successfully with:

```bash
npm run build
```
