export const sortProducts = (option, products) => {
  switch (option) {
    case "new":
      // Format datuma pogodan je za sortiranje kao dva stringa
      products.sort((a, b) =>
        a.sys.publishedAt > b.sys.publishedAt
          ? -1
          : b.sys.publishedAt > a.sys.publishedAt
          ? 1
          : 0
      );
      break;
    case "high":
      products.sort((a, b) => b.price - a.price);

      break;
    case "low":
      products.sort((a, b) => a.price - b.price);

      break;
  }
  return products;
};
