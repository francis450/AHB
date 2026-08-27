import { getReviewUrl } from '../lib/reviewUrl';

type ReviewQrCodeProps = {
  size?: number;
  className?: string;
};

const LOGO_URL = 'https://alicia.boraerp.co.ke/files/logo.png';

const ReviewQrCode = ({ size = 260, className = '' }: ReviewQrCodeProps) => {
  const reviewUrl = getReviewUrl();
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=640x640&margin=16&ecc=H&format=svg&data=${encodeURIComponent(reviewUrl)}`;
  const logoSize = Math.round(size * 0.21);

  return (
    <div className={`relative inline-flex rounded-3xl border-8 border-yellow-100 bg-white p-3 ${className}`}>
      <img src={qrUrl} width={size} height={size} alt="QR code linking to Alicia Hairline and Beauty reviews" />
      <div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-yellow-100 bg-white p-1.5 shadow-md"
        style={{ width: logoSize, height: logoSize }}
      >
        <img src={LOGO_URL} alt="" className="h-full w-full rounded-full object-cover" />
      </div>
    </div>
  );
};

export default ReviewQrCode;
