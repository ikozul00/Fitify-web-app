import { filters } from "@/constants/filters";

export const setFilters = (query) => {
  const newFilters = {
    newCategory: "all",
    newBrand: "all",
    newColor: "all",
    newSize: "all",
    newGender: "all",
    newSale: "all",
    minimumPrice: 0,
    maximumPrice: 200,
  };

  // Ukoliko je neki filter dodan u query URL i ako je njegova vrijednost u skupu dozvoljenih, namjesta se filter
  if (query.category && filters.category.items.includes(query.category))
    newFilters.newCategory = query.category;
  if (query.brand && filters.brand.items.includes(query.brand))
    newFilters.newBrand = query.brand;
  if (query.color && filters.color.items.includes(query.color))
    newFilters.newColor = query.color;
  if (query.size && filters.size.items.includes(query.size))
    newFilters.newSize = query.size;
  if (query.gender && filters.gender.items.includes(query.gender))
    newFilters.newGender = query.gender;

  if (query.minPrice) newFilters.minimumPrice = query.minPrice;
  if (query.maxPrice) newFilters.maximumPrice = query.maxPrice;
  if (query.sale && query.sale == "true") newFilters.newSale = "sale";
  else if (query.sale && query.sale == "false") newFilters.newSale = "new";

  return newFilters;
};
