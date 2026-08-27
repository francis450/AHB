export const getReviewUrl = () => {
  const configuredUrl = import.meta.env.VITE_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return `${configuredUrl || window.location.origin}/reviews/leave`;
};
