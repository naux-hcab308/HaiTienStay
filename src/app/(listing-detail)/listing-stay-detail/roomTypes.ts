export interface RoomType {
  id: string;
  label: string;
  sucChua: string;
  giuong: string;
  tag: string;
  weekdayPriceLabel: string;
  weekendPriceLabel: string;
  priceFrom: string;
  roomNos: string[];
  isBestSeller: boolean;
}

export const ROOM_TYPES: RoomType[] = [
  {
    id: "room-2",
    label: "Phòng đôi (2 người)",
    sucChua: "2 người lớn",
    giuong: "1 giường 1m6",
    tag: "Couple",
    weekdayPriceLabel: "Giá từ thứ 2 đến thứ 5: 400.000 VND/phòng",
    weekendPriceLabel: "Thứ 6, thứ 7 và CN: 500.000 VND/phòng",
    priceFrom: "400.000đ/đêm",
    roomNos: ["P101", "P102", "P103", "P104"],
    isBestSeller: false,
  },
  {
    id: "room-3",
    label: "Phòng 3 người",
    sucChua: "3 người lớn",
    giuong: "1 giường đôi 1m6 và 1 giường 1m2",
    tag: "Family",
    weekdayPriceLabel: "Giá thuê: Từ CN đến thứ 2: 500.000 VND/phòng",
    weekendPriceLabel: "Thứ 6,7 và CN: 650.000 VND/phòng",
    priceFrom: "500.000đ/đêm",
    roomNos: [],
    isBestSeller: false,
  },
  {
    id: "room-4",
    label: "Phòng 4 người",
    sucChua: "4 người lớn",
    giuong: "2 giường đôi 1m6",
    tag: "Family",
    weekdayPriceLabel: "Giá thuê: Từ CN đến thứ 2: 550.000 VND/phòng",
    weekendPriceLabel: "Thứ 6,7 và CN: 700.000 VND/phòng",
    priceFrom: "550.000đ/đêm",
    roomNos: ["P107"],
    isBestSeller: false,
  },
  {
    id: "room-6",
    label: "Phòng 6 người",
    sucChua: "6 người lớn",
    giuong: "3 giường đôi 1m6",
    tag: "Group",
    weekdayPriceLabel: "Giá thuê: Từ CN đến thứ 2: 900.000 VND/phòng",
    weekendPriceLabel: "Thứ 6,7 và CN: 1.200.000 VND/phòng",
    priceFrom: "900.000đ/đêm",
    roomNos: ["P105"],
    isBestSeller: true,
  },
  {
    id: "room-8",
    label: "Phòng 8 người",
    sucChua: "8 người lớn",
    giuong: "4 giường đôi 1m6",
    tag: "Group",
    weekdayPriceLabel: "Giá thuê: Từ CN đến thứ 2: 900.000 VND/phòng",
    weekendPriceLabel: "Thứ 6,7 và CN: 1.200.000 VND/phòng",
    priceFrom: "900.000đ/đêm",
    roomNos: ["P106"],
    isBestSeller: false,
  },
];

export function getSelectedIndexByRoomNo(roomNo: string | null) {
  if (!roomNo) return 0;
  const normalized = roomNo.toUpperCase();
  const idx = ROOM_TYPES.findIndex((room) => room.roomNos.includes(normalized));
  return idx >= 0 ? idx : 0;
}
