#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";

const SUPPORTED_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".ico",
  ".avif",
]);

const MIME_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".avif": "image/avif",
};

const cwd = process.cwd();
const imagesRoot = path.join(cwd, "src", "images");
const outputMapPath = path.join(cwd, "src", "data", "supabase-image-map.json");

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "assets";
const prefix = (
  process.env.SUPABASE_STORAGE_PREFIX ||
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PREFIX ||
  "images"
).replace(/^\/+|\/+$/g, "");
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const dryRun = process.argv.includes("--dry-run");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function encodeObjectPath(objectPath) {
  return objectPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

async function listFilesRecursive(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return listFilesRecursive(fullPath);
      }
      return [fullPath];
    })
  );
  return files.flat();
}

function toPosixPath(p) {
  return p.split(path.sep).join("/");
}

function createPublicUrl(objectPath) {
  const encodedBucket = encodeURIComponent(bucket);
  return `${supabaseUrl}/storage/v1/object/public/${encodedBucket}/${encodeObjectPath(objectPath)}`;
}

async function uploadFile(localFilePath, objectPath) {
  const extension = path.extname(localFilePath).toLowerCase();
  const mimeType = MIME_TYPES[extension] || "application/octet-stream";
  const body = await fs.readFile(localFilePath);
  const encodedBucket = encodeURIComponent(bucket);
  const uploadUrl = `${supabaseUrl}/storage/v1/object/${encodedBucket}/${encodeObjectPath(objectPath)}`;

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
      "Content-Type": mimeType,
      "x-upsert": "true",
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed (${response.status}) ${localFilePath}: ${text}`);
  }
}

async function main() {
  if (!supabaseUrl) {
    fail("Missing NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!dryRun && !serviceRoleKey) {
    fail("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  const allFiles = await listFilesRecursive(imagesRoot);
  const imageFiles = allFiles.filter((filePath) =>
    SUPPORTED_EXTENSIONS.has(path.extname(filePath).toLowerCase())
  );

  if (!imageFiles.length) {
    console.log("No image files found in src/images.");
    return;
  }

  const mapping = {};
  const failures = [];

  for (const filePath of imageFiles) {
    const relativePath = toPosixPath(path.relative(imagesRoot, filePath));
    const objectPath = prefix ? `${prefix}/${relativePath}` : relativePath;
    const aliasPath = `@/images/${relativePath}`;
    const publicUrl = createPublicUrl(objectPath);

    try {
      if (!dryRun) {
        await uploadFile(filePath, objectPath);
      }
      mapping[aliasPath] = publicUrl;
      console.log(`${dryRun ? "[DRY RUN]" : "[UPLOADED]"} ${aliasPath} -> ${publicUrl}`);
    } catch (error) {
      failures.push(String(error));
      console.error(`[FAILED] ${filePath}`);
    }
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    bucket,
    prefix,
    total: imageFiles.length,
    uploaded: imageFiles.length - failures.length,
    failed: failures.length,
    mapping,
    failures,
  };

  await fs.writeFile(outputMapPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`\nWrote mapping file: ${outputMapPath}`);

  if (failures.length) {
    console.error(`Upload finished with ${failures.length} failure(s).`);
    process.exit(2);
  }
}

main().catch((error) => {
  fail(String(error));
});
