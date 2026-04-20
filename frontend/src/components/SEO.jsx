import { Helmet } from "react-helmet-async";

const SEO = ({ product, url }) => {
  if (!product) return null;

  return (
    <Helmet>
      {/* BASIC */}
      <title>{product.name} | Your Store</title>

      <meta
        name="description"
        content={`Buy ${product.name} at best price. ${
          product.features?.slice(0, 2).join(", ")
        }`}
      />

      <link rel="canonical" href={url} />

      {/* OPEN GRAPH */}
      <meta property="og:title" content={product.name} />
      <meta
        property="og:description"
        content={product.features?.slice(0, 2).join(", ")}
      />
      <meta property="og:image" content={product.images[0]} />
      <meta property="og:url" content={url} />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={product.name} />
      <meta
        name="twitter:description"
        content={product.features?.slice(0, 2).join(", ")}
      />
      <meta name="twitter:image" content={product.images[0]} />

      {/* JSON-LD with Ratings */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.name,
          image: product.images,
          description: product.description,
          sku: product.id,
          brand: {
            "@type": "Brand",
            name: "Your Store",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating || 4.5,
            reviewCount: product.reviewsCount || 20,
          },
          review: [
            {
              "@type": "Review",
              author: "Customer",
              reviewRating: {
                "@type": "Rating",
                ratingValue: product.rating || 4,
              },
              reviewBody: "Great product, highly recommended!",
            },
          ],
          offers: {
            "@type": "Offer",
            url: url,
            priceCurrency: "INR",
            price: product.price,
            availability: "https://schema.org/InStock",
          },
        })}
      </script>
    </Helmet>
  );
};

export default SEO;