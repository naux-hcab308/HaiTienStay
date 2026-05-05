import { supabase } from "./supabaseClient";

export type NewsStatus = "draft" | "published";

export interface NewsRecord {
  id: string;
  slug: string;
  title: string;
  content: string;
  coverImage: string;
  fbLink: string;
  summary: string;
  status: NewsStatus;
  createdAt: string;
}

const normalizeVietnameseText = (value: string) => (value || "").normalize("NFC").trim();

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/([^0-9a-z-\s])/g, "")
    .replace(/(\s+)/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const generateSummary = (content: string, length = 150): string => {
  if (!content) return "";
  const plainText = content.replace(/<[^>]+>/g, "").trim();
  if (plainText.length <= length) return plainText;
  return plainText.substring(0, length) + "...";
};

export async function getAllNews(): Promise<NewsRecord[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all news:", error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content,
    coverImage: row.cover_image,
    fbLink: row.fb_link,
    summary: row.summary,
    status: row.status as NewsStatus,
    createdAt: row.created_at,
  }));
}

export async function getPublishedNews(): Promise<NewsRecord[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published news:", error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content,
    coverImage: row.cover_image,
    fbLink: row.fb_link,
    summary: row.summary,
    status: row.status as NewsStatus,
    createdAt: row.created_at,
  }));
}

export async function getNewsBySlug(slug: string): Promise<NewsRecord | null> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error(`Error fetching news by slug (${slug}):`, error);
    return null;
  }

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    content: data.content,
    coverImage: data.cover_image,
    fbLink: data.fb_link,
    summary: data.summary,
    status: data.status as NewsStatus,
    createdAt: data.created_at,
  };
}

export async function addNews(
  post: Omit<NewsRecord, "id" | "slug" | "summary" | "createdAt">
): Promise<boolean> {
  const safeTitle = normalizeVietnameseText(post.title);
  const safeContent = normalizeVietnameseText(post.content);
  const safeFbLink = (post.fbLink || "").trim();
  const baseSlug = generateSlug(safeTitle) || "tin-tuc";
  const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;
  const summary = generateSummary(safeContent);

  const { error } = await supabase.from("news").insert([
    {
      slug,
      title: safeTitle,
      content: safeContent,
      cover_image: post.coverImage,
      fb_link: safeFbLink,
      summary,
      status: post.status,
    },
  ]);

  if (error) {
    console.error("Error adding news:", error);
    return false;
  }

  return true;
}

export async function updateNews(
  id: string,
  updates: Partial<Omit<NewsRecord, "id" | "slug" | "createdAt">>
): Promise<boolean> {
  const dbUpdates: any = {};
  if (updates.title !== undefined) dbUpdates.title = normalizeVietnameseText(updates.title);
  if (updates.content !== undefined) {
    const safeContent = normalizeVietnameseText(updates.content);
    dbUpdates.content = safeContent;
    dbUpdates.summary = generateSummary(safeContent);
  }
  if (updates.coverImage !== undefined) dbUpdates.cover_image = updates.coverImage;
  if (updates.fbLink !== undefined) dbUpdates.fb_link = (updates.fbLink || "").trim();
  if (updates.status !== undefined) dbUpdates.status = updates.status;

  if (updates.title) {
    const baseSlug = generateSlug(normalizeVietnameseText(updates.title));
    dbUpdates.slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;
  }

  const { error } = await supabase.from("news").update(dbUpdates).eq("id", id);

  if (error) {
    console.error("Error updating news:", error);
    return false;
  }

  return true;
}

export async function deleteNews(id: string): Promise<boolean> {
  const { error } = await supabase.from("news").delete().eq("id", id);

  if (error) {
    console.error("Error deleting news:", error);
    return false;
  }

  return true;
}

export const NEWS_EVENT = "haitienstay_news_changed";
export function getNewsEventName() {
  return NEWS_EVENT;
}
