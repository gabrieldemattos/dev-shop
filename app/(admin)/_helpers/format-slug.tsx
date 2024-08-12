export const formatSlug = (slug: string) => {
  if (!slug) return "";

  const formatted = slug.toLowerCase().replace(/\s+/g, "-");

  return formatted;
};
