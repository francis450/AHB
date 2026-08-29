import { extractFrappeError } from './frappeError';

const baseUrl = (import.meta.env.VITE_ERPNEXT_URL || 'https://alicia.boraerp.co.ke').replace(/\/$/, '');
const endpoint = (method: string) => `${baseUrl}/api/method/alicia_reviews.pesapal.${method}`;

export interface CartPaymentLine {
  item_code: string;
  qty: number;
}

export interface CartPaymentRequest {
  customer: {
    name: string;
    email?: string;
    phone: string;
    address?: string;
    city?: string;
  };
  items: CartPaymentLine[];
  notes?: string;
}

export interface CartPaymentStart {
  order_id: string;
  redirect_url: string;
}

export type PaymentStatus = 'Pending Payment' | 'Paid' | 'Failed' | 'Cancelled' | 'Expired';

export interface PaymentStatusResult {
  order_id: string;
  status: PaymentStatus;
  currency: string;
  total_amount: number;
  payment_method?: string | null;
  confirmation_code?: string | null;
}

export const startCartPayment = async (payload: CartPaymentRequest): Promise<CartPaymentStart> => {
  const response = await fetch(endpoint('create_cart_payment'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(extractFrappeError(data, 'We could not start the payment. Please try again.'));
  }
  return data.message as CartPaymentStart;
};

export const getPaymentStatus = async (orderId: string): Promise<PaymentStatusResult> => {
  const url = `${endpoint('payment_status')}?order_id=${encodeURIComponent(orderId)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(extractFrappeError(data, 'Could not check the payment status.'));
  }
  return data.message as PaymentStatusResult;
};
