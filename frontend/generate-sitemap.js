import fs from "fs";
import products from "./src/data/products.js";

const baseUrl = "https://yourdomain.com";

const createSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const urls = products.map(
  (p) =>
    `<url>
      <loc>${baseUrl}/product/${p.id}/${createSlug(p.name)}</loc>
    </url>`
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.join("\n")}

</urlset>`;

fs.writeFileSync("./public/sitemap.xml", sitemap);

console.log("✅ Sitemap generated successfully!");