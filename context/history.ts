import { SoldItem } from "../context/SoldItemsContext";

// ---------- Helper to filter items by a date range ----------
const filterByDateRange = (soldItems: SoldItem[], start: Date, end: Date) => {
  return soldItems.filter(item => {
    const itemDate = new Date(item.time);
    return itemDate >= start && itemDate <= end;
  });
};

// ---------- Summarize data: total sold, revenue, top products, out-of-stock ----------
const summarizeData = (data: SoldItem[]) => {
  // Total sold
  const totalSold = data.reduce((acc, item) => acc + item.qty, 0);

  // Total revenue
  const revenue = data.reduce((acc, item) => acc + item.qty * item.price, 0);

  // Top products
  const topMap: Record<string, { id: string; name: string; sold: number; image: string | null }> = {};
  data.forEach(item => {
    if (topMap[item.id]) {
      topMap[item.id].sold += item.qty;
    } else {
      topMap[item.id] = { id: item.id, name: item.name, sold: item.qty, image: item.imageUri };
    }
  });
  const topProducts = Object.values(topMap).sort((a, b) => b.sold - a.sold);

  // Out of stock (example: sold qty === 0)
  const outOfStock = topProducts.filter(p => p.sold === 0);

  return { totalSold, revenue, topProducts, outOfStock };
};

// ---------- Get Today Data ----------
export const getTodayData = (soldItems: SoldItem[]) => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  const data = filterByDateRange(soldItems, start, end);
  return summarizeData(data);
};

// ---------- Get This Week Data ----------
export const getWeekData = (soldItems: SoldItem[]) => {
  const now = new Date();
  const start = new Date(now);
  const day = now.getDay(); // 0 = Sunday
  start.setDate(now.getDate() - day); // start of week
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  const data = filterByDateRange(soldItems, start, end);
  return summarizeData(data);
};

// ---------- Get This Month Data ----------
export const getMonthData = (soldItems: SoldItem[]) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1); // first day of month
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0); // last day of month
  end.setHours(23, 59, 59, 999);

  const data = filterByDateRange(soldItems, start, end);
  return summarizeData(data);
};

// ---------- Get Custom Range Data ----------
export const getCustomData = (soldItems: SoldItem[], start: Date, end: Date) => {
  const endDate = new Date(end);
  endDate.setHours(23, 59, 59, 999);

  const data = filterByDateRange(soldItems, start, endDate);
  return summarizeData(data);
};
