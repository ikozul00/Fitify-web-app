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
  if (query.size && filters.sizes.items.includes(query.size))
    newFilters.newSize = query.size;
  if (query.gender && filters.gender.items.includes(query.gender))
    newFilters.newGender = query.gender;

  if (query.minPrice) newFilters.minimumPrice = query.minPrice;
  if (query.maxPrice) newFilters.maximumPrice = query.maxPrice;
  if (query.sale && query.sale == "true") newFilters.newSale = "sale";
  else if (query.sale && query.sale == "false") newFilters.newSale = "new";

  return newFilters;
};

export const createQuery = (queryFilters, searchQuery) => {
  let query = searchQuery != "" ? `?search=${searchQuery}` : "?";

  //Ako je query duzi od 1, znaci da je vec dodano nesto pa treba staviti izmedu znak &
  if (queryFilters.newCategory != "all") {
    if (query.length > 1) query += "&";
    query += `category=${queryFilters.newCategory}`;
  }
  if (queryFilters.newBrand != "all") {
    if (query.length > 1) query += "&";
    query += `brand=${queryFilters.newBrand}`;
  }
  if (queryFilters.newColor != "all") {
    if (query.length > 1) query += "&";
    query += `color=${queryFilters.newColor}`;
  }
  if (queryFilters.newSize != "all") {
    if (query.length > 1) query += "&";
    query += `size=${queryFilters.newSize}`;
  }
  if (queryFilters.newGender != "all") {
    if (query.length > 1) query += "&";
    query += `gender=${queryFilters.newGender}`;
  }
  if (queryFilters.newSale != "all") {
    if (query.length > 1) query += "&";
    if (queryFilters.newSale == "new") query += "sale=false";
    else query += "sale=true";
  }

  if (queryFilters.minimumPrice != 0) {
    if (query.length > 1) query += "&";
    query += `minPrice=${queryFilters.minimumPrice}`;
  }
  if (queryFilters.maximumPrice != 200) {
    if (query.length > 1) query += "&";
    query += `maxPrice=${queryFilters.maximumPrice}`;
  }

  return query;
};
