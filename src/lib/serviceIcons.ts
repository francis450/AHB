import { Brush, Crown, Droplet, Flame, Gem, LucideIcon, Palette, Scissors, Sparkles, SprayCan, Wand2 } from 'lucide-react';

// Best-effort icon per service, matched by keywords in the name. With 70+ individual
// line items in the real price list, hand-picking one icon each isn't practical —
// this keeps things visually varied and semantically reasonable without that upkeep.
const rules: [RegExp, LucideIcon][] = [
  [/wig|frontal|closure|lace front|cap\b/i, Crown],
  [/makeup/i, Palette],
  [/nail|gel|stick-on|tips|overlay|manicure|pedicure|acrylic|builder/i, Gem],
  [/eyebrow|threading|tweez|henna/i, Wand2],
  [/spray/i, SprayCan],
  [/tong|flat iron|hot comb|blowdry/i, Flame],
  [/brush|comb/i, Brush],
  [/glue|serum|treatment|protector|mousse|curl keeper|tint|soak off/i, Droplet],
];

export const getServiceIcon = (name: string): LucideIcon => {
  const match = rules.find(([pattern]) => pattern.test(name));
  return match ? match[1] : Sparkles;
};

export const categoryIcons: Record<string, LucideIcon> = {
  hair: Scissors,
  nails: Gem,
};
