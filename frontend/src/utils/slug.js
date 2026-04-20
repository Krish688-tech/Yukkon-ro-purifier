export const createSlug = (text = "") => {
  return text.toLowerCase().replace(/\s+/g, "-");
};