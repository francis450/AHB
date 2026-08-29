import { extractFrappeError } from './frappeError';

export interface BookingRequest {
  name: string;
  phone: string;
  email?: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}

export interface WebsiteBooking {
  name: string;
  customer_name: string;
  phone: string;
  email?: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status: string;
  created_at: string;
}

import { extractFrappeError } from './frappeError';

const baseUrl = (import.meta.env.VITE_ERPNEXT_URL || 'https://alicia.boraerp.co.ke').replace(/\/$/, '');
const endpoint = `${baseUrl}/api/method/alicia_reviews.api.website_bookings`;

export const createBooking = async (booking: BookingRequest): Promise<WebsiteBooking> => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(extractFrappeError(data, 'Unable to submit your booking. Please try again.'));
  }
  return data.message as WebsiteBooking;
};
