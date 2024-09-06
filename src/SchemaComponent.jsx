import React from "react";
// import { Helmet } from "react-helmet-async";

const SchemaComponent = ({ product }) => {
  const schemaData = {
    "@context": "http://schema.org/",
    "@type": "Product",
    name: product.partModel,
    // image: product.image,
    description: product.productDescription,
    sku: product.partModel,
    brand: {
      "@type": "Brand",
      name: product.mfg,
    },
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "USD",
      price: product.price,
      itemCondition: "http://schema.org/NewCondition",
      availability: "http://schema.org/InStock",
    },
  };

  return (
    // <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    // </Helmet>
  );
};

export default SchemaComponent;
