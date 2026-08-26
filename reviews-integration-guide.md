# Website reviews integration

## What the website now does

`/reviews` reads and posts public reviews through this ERPNext endpoint:

```text
https://alicia.boraerp.co.ke/api/method/alicia_reviews.api.website_reviews
```

- `GET` returns published reviews.
- `POST` accepts `{ "name", "rating", "comment" }`, saves a review, and returns it.

The QR code should point to `https://YOUR-DOMAIN/reviews`. It stays the same after Google Business Profile verification.

## ERPNext setup required

The endpoint is not yet installed on the ERPNext site. Add a small custom Frappe app named `alicia_reviews` and create a **Website Review** DocType with these fields:

| Fieldname | Type | Required |
| --- | --- | --- |
| `reviewer_name` | Data | Yes |
| `rating` | Int | Yes |
| `comment` | Small Text | Yes |
| `published` | Check | Yes, default `1` |

Create `alicia_reviews/api.py` in the app:

```python
import frappe


def validate_review(data):
    name = (data.get('name') or '').strip()
    comment = (data.get('comment') or '').strip()
    rating = int(data.get('rating') or 0)

    if not name or len(name) > 60:
        frappe.throw('Please provide a valid name.')
    if len(comment) < 5 or len(comment) > 500:
        frappe.throw('Please share a review between 5 and 500 characters.')
    if rating not in range(1, 6):
        frappe.throw('Please select a rating from 1 to 5.')
    return name, rating, comment


@frappe.whitelist(allow_guest=True)
def website_reviews():
    if frappe.request.method == 'GET':
        rows = frappe.get_all(
            'Website Review',
            filters={'published': 1},
            fields=['reviewer_name as name', 'rating', 'comment', 'creation as created_at'],
            order_by='creation desc',
            limit_page_length=200,
        )
        return rows

    data = frappe.request.get_json(silent=True) or {}
    name, rating, comment = validate_review(data)
    review = frappe.get_doc({
        'doctype': 'Website Review',
        'reviewer_name': name,
        'rating': rating,
        'comment': comment,
        'published': 1,
    })
    review.insert(ignore_permissions=True)
    return {
        'name': review.reviewer_name,
        'rating': review.rating,
        'comment': review.comment,
        'created_at': review.creation,
    }
```

Install the app on `alicia.boraerp.co.ke`, migrate it, and set the ERPNext CORS setting to allow the website domain. Before making the API public, add a rate limit and bot protection (for example, Cloudflare Turnstile) to prevent spam.

## Google Reviews later

Keep the on-site reviews. When Google verification is complete, add the Google review URL as a second button on `/reviews`; do not replace the QR destination.

## Standalone demo

`reviews-demo.html` is a visual-only demo. It uses browser `localStorage`, so reviews entered there are not shared publicly. The deployed React `/reviews` page uses the ERPNext endpoint above.
