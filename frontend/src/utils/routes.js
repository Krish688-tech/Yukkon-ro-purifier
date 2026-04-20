import { createSlug } from "./slug";

export const getProductUrl = (product) =>
  `/product/${product.id}/${createSlug(product.name)}`;