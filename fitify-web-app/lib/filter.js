export const filterProducts = (filters, products) => {
  const filteredProducts = products;
  // Filtrira se korak po korak, po svakom filtru
  // Ako je neki filter postavljen na all, preskače se
  if (filters.newCategory != "all")
    filteredProducts = filteredProducts.filter(
      (product) => product.category == filters.newCategory
    );
  if (filters.newBrand != "all")
    filteredProducts = filteredProducts.filter(
      (product) => product.brand == filters.newBrand
    );
  if (filters.newColor != "all")
    filteredProducts = filteredProducts.filter((product) =>
      product.color.includes(filters.newColor)
    );
  if (filters.newSize != "all")
    filteredProducts = filteredProducts.filter((product) =>
      product.sizes.includes(filters.newSize)
    );

  // Svakako se prikazuju unisex proizvodi
  if (filters.newGender != "all")
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.gender == filters.newGender || product.gender == "unisex"
    );

  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= filters.minimumPrice &&
      product.price <= filters.maximumPrice
  );

  return filteredProducts;
};
