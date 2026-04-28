export interface BookingRecord {
  id: string;
  createdAt: string;
  status: "pending" | "accepted" | "cancelled";
  roomType: string;
  roomNo: string;
  customerName: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

const BOOKING_STORAGE_KEY = "yara_bookings";
const BOOKING_EVENT = "yara-bookings-changed";

export function getBookingEventName() {
  return BOOKING_EVENT;
}

export function getBookings(): BookingRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(BOOKING_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      ...item,
      status:
        item?.status === "accepted" || item?.status === "cancelled"
          ? item.status
          : "pending",
    }));
  } catch {
    return [];
  }
}

export function getBookingById(id: string) {
  return getBookings().find((booking) => booking.id === id) || null;
}

export function addBooking(
  payload: Omit<BookingRecord, "id" | "createdAt">
): BookingRecord {
  const booking: BookingRecord = {
    ...payload,
    id: `${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };

  if (typeof window === "undefined") return booking;
  const current = getBookings();
  const next = [booking, ...current];
  window.localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(BOOKING_EVENT));
  return booking;
}

export function updateBookingStatus(
  bookingId: string,
  status: BookingRecord["status"]
) {
  if (typeof window === "undefined") return;
  const current = getBookings();
  const next = current.map((booking) =>
    booking.id === bookingId ? { ...booking, status } : booking
  );
  window.localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(BOOKING_EVENT));
}

export function clearBookings() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(BOOKING_STORAGE_KEY);
  window.dispatchEvent(new Event(BOOKING_EVENT));
}
