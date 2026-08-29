# Card payments (Pesapal) — setup

Card payment for the **product cart** goes through Pesapal's hosted checkout: the
customer is redirected to Pesapal's secure page to enter their card, then sent
back to `/(website)/shop/payment-return`. No card data touches this site or the
ERPNext server. Money settles to whatever bank account is on the Pesapal merchant
profile (e.g. KCB).

## How it works

1. Customer fills the checkout form → `alicia_reviews.pesapal.create_cart_payment`
   prices the cart **from ERPNext** (never trusting the browser), creates a
   **Website Order** (status *Pending Payment*), and returns a Pesapal redirect URL.
2. Customer pays on Pesapal.
3. Pesapal calls `…/api/method/alicia_reviews.pesapal.ipn`; we re-query Pesapal for
   the true status and set the Website Order to *Paid* / *Failed*.
4. The return page polls `…pesapal.payment_status` and shows the result; the cart
   is cleared only once *Paid*.
5. A scheduled job (`reconcile_pending_orders`, every 10 min) catches any missed
   IPN and expires orders left unpaid for 24h.

Paid orders are visible in ERPNext under **Website Order**. Tick
**Create Sales Order on payment** in Pesapal Settings to also raise a submitted
Sales Order per paid order.

## Prerequisites

### 1. Pesapal merchant account
- Sign up at https://www.pesapal.com → complete KYC → add the **settlement bank
  account** (KCB).
- Dashboard → **Account → API Keys**: copy the **Consumer Key** and
  **Consumer Secret**. There is a **sandbox** (demo) pair and a **live** pair —
  test with sandbox first.

### 2. Product prices in ERPNext
The cart can only sell items that have a price. For each product:
- It must be a **published Website Item**.
- It must have an **Item Price** (Selling) on the price list configured in
  Pesapal Settings (default: the site's default selling price list).
Items with no price are rejected at checkout with a clear message.

### 3. Configure ERPNext
**Desk → Pesapal Settings:**
| Field | Value |
|---|---|
| Environment | `Sandbox` to test, `Live` to go live |
| Consumer Key / Consumer Secret | from the Pesapal dashboard (match the environment) |
| Price List | the selling price list your product prices live on |
| Currency | `KES` |
| Website URL | the public site URL, e.g. `https://aliciahairline.co.ke` |
| IPN URL | auto-fills to `https://alicia.boraerp.co.ke/api/method/alicia_reviews.pesapal.ipn` — fix it if the auto value is wrong |

Then **Save**, click **Register IPN URL with Pesapal**, and finally tick
**Enabled**.

### 4. Test (sandbox)
Pesapal's public sandbox demo keys work for a first run:
`qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW` / `osGQ364R49cXKeOYSpaOnT++rHs=`
Use Pesapal's [test cards](https://developer.pesapal.com/) on the hosted page.
Then swap to the live keys, set Environment = `Live`, re-register the IPN, and do
one small real payment.

## Not included (yet)
- M-Pesa (Pesapal's page will still offer it if enabled on the merchant account,
  but nothing M-Pesa-specific is wired in our code).
- Paying for bookings — cart only.
