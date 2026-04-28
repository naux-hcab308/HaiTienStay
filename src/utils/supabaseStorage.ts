export function getSupabasePublicAssetUrl(relativePath: string): string | null {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "assets";
  const prefix = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PREFIX || "images";

  if (!baseUrl) return null;

  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const cleanPrefix = prefix.replace(/^\/+|\/+$/g, "");
  const cleanPath = relativePath.replace(/^\/+/, "");
  const objectPath = [cleanPrefix, cleanPath].filter(Boolean).join("/");

  const encodedObjectPath = objectPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${normalizedBase}/storage/v1/object/public/${encodeURIComponent(
    bucket
  )}/${encodedObjectPath}`;
}
