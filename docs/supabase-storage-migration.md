# Supabase Storage Migration

## 1) Prepare bucket in Supabase

1. Create a public bucket, for example: `assets`.
2. Copy these values from Supabase project settings:
- `Project URL`
- `service_role` key

## 2) Configure environment

Add these variables to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=assets
NEXT_PUBLIC_SUPABASE_STORAGE_PREFIX=images
SUPABASE_STORAGE_PREFIX=images
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

Optional explicit overrides:

```env
NEXT_PUBLIC_SUPABASE_LOGO_URL=
NEXT_PUBLIC_SUPABASE_LOGO_LIGHT_URL=
```

## 3) Upload all local images from `src/images`

Dry run first:

```bash
npm run supabase:upload-images:dry
```

Then upload:

```bash
npm run supabase:upload-images
```

After upload, the script writes:

- `src/data/supabase-image-map.json`

This file maps local alias keys like `@/images/hero-right.png` to Supabase public URLs.

## 4) Use Supabase URLs incrementally

Helper:

- `src/utils/supabaseStorage.ts`

Example usage:

```ts
import { getSupabasePublicAssetUrl } from "@/utils/supabaseStorage";

const src = getSupabasePublicAssetUrl("hero-right.png");
```

Current sample integration is in:

- `src/shared/Logo.tsx`

It already supports:

1. Explicit env URL
2. Supabase URL generated from relative path
3. Local static image fallback

## 5) Notes

- `next.config.js` now auto-allows your Supabase image host if `NEXT_PUBLIC_SUPABASE_URL` is set.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Do not expose it in client code.
- Restart dev server after changing env/config.

