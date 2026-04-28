export type GuestPostStatus = "pending" | "approved" | "rejected";

export interface GuestPostRecord {
  id: string;
  slug: string;
  authorName: string;
  title: string;
  content: string;
  summary: string;
  createdAt: string;
  status: GuestPostStatus;
}

const GUEST_POSTS_STORAGE_KEY = "yara_guest_posts";
const GUEST_POSTS_EVENT = "yara-guest-posts-changed";

export const DEMO_GUEST_POSTS: GuestPostRecord[] = [
  {
    id: "seed_binh-minh-hai-tien",
    slug: "binh-minh-hai-tien",
    authorName: "Lan Anh",
    title: "Bình minh ở biển Hải Tiến và ly cafe đầu ngày",
    content:
      "Mình ở Hải Tiến Stay 2 ngày 1 đêm. Điều thích nhất là sân vườn mở và góc cafe nhìn ra biển, sáng sớm cực kỳ yên bình. Phòng sạch, gọn gàng, vừa đủ tiện nghi cho gia đình nhỏ.",
    summary:
      "Mình dậy sớm để ngắm mặt trời lên, gió biển mát và không gian chung của homestay cực kỳ chill.",
    createdAt: "2026-04-26T07:00:00.000Z",
    status: "approved",
  },
  {
    id: "seed_cuoi-tuan-cung-gia-dinh",
    slug: "cuoi-tuan-cung-gia-dinh",
    authorName: "Minh Quân",
    title: "Cuối tuần nhẹ nhàng cùng gia đình 5 người",
    content:
      "Gia đình mình đặt 2 phòng trong 8 phòng của homestay. Các phòng giống nhau nên rất dễ chọn. Buổi tối cả nhà dùng bếp chung và ngồi ngoài trời trò chuyện rất thoải mái.",
    summary:
      "Phòng nhỏ gọn nhưng sạch sẽ, khu bếp chung rất tiện để cả nhà nấu ăn buổi tối.",
    createdAt: "2026-04-24T07:00:00.000Z",
    status: "approved",
  },
  {
    id: "seed_dem-bbq-ben-gio-bien",
    slug: "dem-bbq-ben-gio-bien",
    authorName: "Thu Hà",
    title: "Đêm BBQ bên gió biển",
    content:
      "Khu BBQ ở không gian mở là điểm cộng lớn. Nhóm mình tự chuẩn bị đồ ăn, bật nhạc nhẹ và có một buổi tối rất đáng nhớ. Chủ nhà hỗ trợ nhiệt tình và phản hồi nhanh.",
    summary:
      "Điểm mình thích nhất là sân vườn mở và khu BBQ, lên đèn buổi tối rất đẹp để chụp ảnh.",
    createdAt: "2026-04-20T07:00:00.000Z",
    status: "approved",
  },
];

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toSummary(content: string, max = 140) {
  const cleaned = content.trim().replace(/\s+/g, " ");
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max).trimEnd()}...`;
}

export function getGuestPostEventName() {
  return GUEST_POSTS_EVENT;
}

export function getStoredGuestPosts(): GuestPostRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(GUEST_POSTS_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item === "object")
      .map((item) => ({
        id: String(item.id || ""),
        slug: String(item.slug || ""),
        authorName: String(item.authorName || "Khách"),
        title: String(item.title || ""),
        content: String(item.content || ""),
        summary: String(item.summary || ""),
        createdAt: String(item.createdAt || new Date().toISOString()),
        status:
          item.status === "approved" || item.status === "rejected"
            ? item.status
            : "pending",
      }))
      .filter((item) => item.id && item.slug && item.title && item.content);
  } catch {
    return [];
  }
}

export function getAllGuestPosts() {
  const stored = getStoredGuestPosts();
  return [...stored, ...DEMO_GUEST_POSTS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPublishedGuestPosts() {
  return getAllGuestPosts().filter((post) => post.status === "approved");
}

export function getGuestPostBySlug(slug: string) {
  return getAllGuestPosts().find((post) => post.slug === slug) || null;
}

export function addGuestPost(payload: {
  authorName: string;
  title: string;
  content: string;
}) {
  const title = payload.title.trim();
  const content = payload.content.trim();
  const authorName = payload.authorName.trim() || "Khách";
  const baseSlug = slugify(title) || "bai-viet-trai-nghiem";
  const post: GuestPostRecord = {
    id: `${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    slug: `${baseSlug}-${Date.now().toString().slice(-5)}`,
    authorName,
    title,
    content,
    summary: toSummary(content),
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  if (typeof window === "undefined") return post;
  const current = getStoredGuestPosts();
  const next = [post, ...current];
  window.localStorage.setItem(GUEST_POSTS_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(GUEST_POSTS_EVENT));
  return post;
}

export function updateGuestPostStatus(postId: string, status: GuestPostStatus) {
  if (typeof window === "undefined") return;
  const current = getStoredGuestPosts();
  const next = current.map((post) =>
    post.id === postId ? { ...post, status } : post
  );
  window.localStorage.setItem(GUEST_POSTS_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(GUEST_POSTS_EVENT));
}
