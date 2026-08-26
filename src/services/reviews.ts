export interface WebsiteReview {
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const baseUrl = (import.meta.env.VITE_ERPNEXT_URL || 'https://alicia.boraerp.co.ke').replace(/\/$/, '');
const endpoint = `${baseUrl}/api/method/alicia_reviews.api.website_reviews`;

const responseData = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || data.exc || 'Unable to save your review.');
  return data.message;
};

export const getWebsiteReviews = async (): Promise<WebsiteReview[]> => {
  const response = await fetch(endpoint);
  const reviews = await responseData(response);
  return Array.isArray(reviews) ? reviews : [];
};

export const createWebsiteReview = async (review: Pick<WebsiteReview, 'name' | 'rating' | 'comment'>) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  return responseData(response) as Promise<WebsiteReview>;
};
