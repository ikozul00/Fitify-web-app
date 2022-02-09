export const searchProducts = (query, products) => {
  return products.filter((product) => {
    if (query === "") {
      //if query is empty
      return product;
    } else if (product.title.toLowerCase().includes(query.toLowerCase())) {
      //returns filtered array
      return product;
    }
  });
};
