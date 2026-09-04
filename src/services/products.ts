import { extractFrappeError } from './frappeError';

const baseUrl = (import.meta.env.VITE_ERPNEXT_URL || 'https://alicia.boraerp.co.ke').replace(/\/$/, '');
const endpoint = `${baseUrl}/api/method/alicia_reviews.api.website_products`;

export interface WebsiteProduct {
  item_code: string;
  name: string;
  price: number;
  image: string | null;
  category: string;
  description: string;
  route?: string;
  in_stock: boolean;
}

export const getWebsiteProducts = async (): Promise<WebsiteProduct[]> => {
  const response = await fetch(endpoint);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(extractFrappeError(data, 'Unable to load products right now.'));
  }
  const rows: WebsiteProduct[] = Array.isArray(data.message) ? data.message : [];
  return rows.map((row) => ({
    ...row,
    image: row.image && !row.image.startsWith('http') ? `${baseUrl}${row.image}` : row.image,
  }));
};
