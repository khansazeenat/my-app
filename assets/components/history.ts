// /utils/historyUtils.ts

export interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  image?: string; // Optional image
}

export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  date: string; // ISO string
}

// This defines the shape of the data your HistoryPage expects
export interface HistoryData {
  totalSold: number;
  revenue: number;
  topProducts: { id: string; name: string; sold: number; image?: string }[];
  outOfStock: Product[];
}

// ---------------- Example products ----------------
export const products: Product[] = [
  { id: "1", name: "Water Bottle", stock: 0, price: 5, image: "https://via.placeholder.com/50" },
  { id: "2", name: "Notebook", stock: 10, price: 2, image: "https://via.placeholder.com/50" },
  { id: "3", name: "Pen", stock: 5, price: 1, image: "https://via.placeholder.com/50" },
];

// ---------------- Example sales ----------------
export const sales: Sale[] = [
  { id: "s1", productId: "1", quantity: 3, totalPrice: 15, date: "2025-10-26T10:00:00Z" },
  { id: "s2", productId: "2", quantity: 5, totalPrice: 10, date: "2025-10-25T15:00:00Z" },
  { id: "s3", productId: "3", quantity: 2, totalPrice: 2, date: "2025-10-26T12:00:00Z" },
  { id: "s4", productId: "1", quantity: 2, totalPrice: 10, date: "2025-10-20T12:00:00Z" },
];

// ---------------- Utils ----------------

// Filter sales between start & end date
export function filterSalesByDate(start: Date, end: Date, allSales: Sale[]): Sale[] {
  return allSales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate >= start && saleDate <= end;
  });
}

// Calculate total sold & revenue
export function getTotals(filteredSales: Sale[]) {
  const totalSold = filteredSales.reduce((sum, sale) => sum + sale.quantity, 0);
  const revenue = filteredSales.reduce((sum, sale) => sum + sale.totalPrice, 0);
  return { totalSold, revenue };
}

// Get top sold products including image, default top 3
export function getTopProducts(filteredSales: Sale[], productsList: Product[], topN = 3) {
  const productMap: Record<string, number> = {};
  filteredSales.forEach(sale => {
    if (!productMap[sale.productId]) productMap[sale.productId] = 0;
    productMap[sale.productId] += sale.quantity;
  });

  const topProducts = Object.entries(productMap)
    .map(([productId, quantity]) => {
      const product = productsList.find(p => p.id === productId);
      return product
        ? { id: productId, name: product.name, sold: quantity, image: product.image }
        : null;
    })
    .filter(Boolean) as { id: string; name: string; sold: number; image?: string }[];

  topProducts.sort((a, b) => b.sold - a.sold);
  return topProducts.slice(0, topN);
}

// Get products out of stock
export function getOutOfStock(productsList: Product[]) {
  return productsList.filter(p => p.stock === 0);
}

// ---------------- Tab-specific functions ----------------

// Today
export function getTodayData(): HistoryData {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const filteredSales = filterSalesByDate(today, tomorrow, sales);
  return {
    ...getTotals(filteredSales),
    topProducts: getTopProducts(filteredSales, products),
    outOfStock: getOutOfStock(products),
  };
}

// This week (Monday -> Sunday)
export function getWeekData(): HistoryData {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const diffToMonday = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const filteredSales = filterSalesByDate(monday, sunday, sales);
  return {
    ...getTotals(filteredSales),
    topProducts: getTopProducts(filteredSales, products),
    outOfStock: getOutOfStock(products),
  };
}

// Current month
export function getMonthData(): HistoryData {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const filteredSales = filterSalesByDate(firstDay, lastDay, sales);
  return {
    ...getTotals(filteredSales),
    topProducts: getTopProducts(filteredSales, products),
    outOfStock: getOutOfStock(products),
  };
}

// Custom date range
export function getCustomData(startDate: Date, endDate: Date): HistoryData {
  const filteredSales = filterSalesByDate(startDate, endDate, sales);
  return {
    ...getTotals(filteredSales),
    topProducts: getTopProducts(filteredSales, products),
    outOfStock: getOutOfStock(products),
  };
}
