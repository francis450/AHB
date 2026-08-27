// Real 2026 salon price list, transcribed from the client's printed price index.
// Update this file whenever the client shares a revised price list — it's the
// single source of truth for prices shown on the Services page and the homepage
// "Signature Services" teaser.
export interface PriceListItem {
  name: string;
  price: string;
}

export interface PriceListCategory {
  id: string;
  name: string;
  items: PriceListItem[];
}

export const priceListCategories: PriceListCategory[] = [
  {
    id: 'hair',
    name: 'Hair Services & Hair Products',
    items: [
      { name: 'Tonging', price: 'Ksh 800' },
      { name: 'Flat Ironing', price: 'Ksh 500' },
      { name: 'Wig Laundry & Tonging', price: 'Ksh 1,200' },
      { name: 'Wig Laundry & Flat Iron', price: 'Ksh 1,000' },
      { name: 'Wig Laundry Only', price: 'Ksh 800' },
      { name: 'Frontal Glueless Installation', price: 'Ksh 800' },
      { name: 'Frontal Glue Installation', price: 'Ksh 1,500' },
      { name: 'Closure Glueless Installation', price: 'Ksh 500' },
      { name: 'Closure Glue Installation', price: 'Ksh 1,000' },
      { name: 'Wash and Blowdry', price: 'Ksh 500' },
      { name: 'Wash and Cornrows', price: 'Ksh 800' },
      { name: 'Undoing', price: 'Ksh 500 – 1,500' },
      { name: 'Leave-in Treatment', price: 'Ksh 500' },
      { name: 'Deep Treatment', price: 'Ksh 1,000' },
      { name: 'Wig Styling', price: 'Ksh 1,000' },
      { name: 'Bridal Styling', price: 'Ksh 3,500' },
      { name: 'Wax Stick', price: 'Ksh 500' },
      { name: 'Wig Making', price: 'Ksh 2,000' },
      { name: 'Wig Removal / Cleaning', price: 'Ksh 500' },
      { name: 'Freezing Spray', price: 'Ksh 800' },
      { name: 'Big Melting Spray', price: 'Ksh 1,000' },
      { name: 'Small Melting Spray', price: 'Ksh 500' },
      { name: 'Hot Comb', price: 'Ksh 3,500' },
      { name: 'Blowdry', price: 'Ksh 2,500' },
      { name: 'Edge Flat Iron', price: 'Ksh 3,500' },
      { name: 'Wig Caps', price: 'Ksh 50' },
      { name: 'Hair Brush', price: 'Ksh 350' },
      { name: 'Full Makeup', price: 'Ksh 2,500' },
      { name: 'Simple Makeup', price: 'Ksh 1,500' },
      { name: 'Small Glue Remover', price: 'Ksh 350' },
      { name: 'Big Glue Remover', price: 'Ksh 650' },
      { name: 'Luodais Serum', price: 'Ksh 400' },
      { name: 'Luodais Spray', price: 'Ksh 400' },
      { name: 'Lace Glue (Big)', price: 'Ksh 1,500' },
      { name: 'Lace Glue (Small)', price: 'Ksh 800' },
      { name: 'Mousse', price: 'Ksh 650' },
      { name: 'Curl Keeper', price: 'Ksh 400' },
      { name: 'Hair Clip', price: 'Ksh 200' },
      { name: 'Lip Gloss', price: 'Ksh 150' },
      { name: 'Donut Bun', price: 'Ksh 500' },
      { name: 'Edge Brush', price: 'Ksh 120' },
      { name: 'Edge Band', price: 'Ksh 150' },
      { name: 'Wooden Brush', price: 'Ksh 500' },
      { name: 'Wide Comb', price: 'Ksh 200' },
      { name: 'Skin Protector', price: 'Ksh 1,000' },
      { name: 'Heat Protector', price: 'Ksh 500' },
      { name: 'Styling Jelly Comb', price: 'Ksh 100' },
      { name: 'Carbon Comb', price: 'Ksh 200' },
      { name: 'Stylist Gel', price: 'Ksh 600' },
      { name: 'Bonnets', price: 'Ksh 350' },
      { name: 'Lace Tint', price: 'Ksh 700' },
      { name: 'Tong (tool)', price: 'Ksh 2,800' },
      { name: 'Flat Iron (tool)', price: 'Ksh 2,800' },
    ],
  },
  {
    id: 'nails',
    name: 'Nails',
    items: [
      { name: 'Gel', price: 'Ksh 500' },
      { name: 'Stick-ons', price: 'Ksh 1,000' },
      { name: 'Tips Gel', price: 'Ksh 1,500' },
      { name: 'Gum Gel', price: 'Ksh 2,000' },
      { name: 'Overlay', price: 'Ksh 2,500' },
      { name: 'Pedicure + Gel', price: 'Ksh 1,500' },
      { name: 'Manicure + Gel', price: 'Ksh 1,000' },
      { name: 'Manicure (Gents)', price: 'Ksh 1,000' },
      { name: 'Pedicure (Gents)', price: 'Ksh 2,000' },
      { name: 'Soak Off', price: 'Ksh 300 – 500' },
      { name: 'Manicure (Plain)', price: 'Ksh 500' },
      { name: 'Acrylics', price: 'Ksh 3,000 – 3,500' },
      { name: 'Builder Gel', price: 'Ksh 1,500' },
      { name: 'Eyebrows (Razor)', price: 'Ksh 200' },
      { name: 'Henna Tinting', price: 'Ksh 500' },
      { name: 'Threading', price: 'Ksh 200' },
      { name: 'Tweezing', price: 'Ksh 200' },
      { name: 'Acrylics (Toes)', price: 'Ksh 1,500 – 2,000' },
    ],
  },
];
