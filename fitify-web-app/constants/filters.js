const gender = { title: "Gender", items: ["male", "female", "unisex"] };
const brand = {
  title: "Brand",
  items: [
    "Adidas",
    "Athleta",
    "Bala",
    "Champion",
    "Ellesse",
    "Kappa",
    "Manduka",
    "New Balance",
    "Nike",
  ],
};

const color = {
  title: "Colors",
  items: [
    "beige",
    "black",
    "blue",
    "brown",
    "gold",
    "gray",
    "green",
    "multi",
    "orange",
    "pink",
    "red",
    "silver",
    "teal",
    "violet",
    "white",
    "yellow",
  ],
};
const sizes = {
  title: "Sizes",
  items: [
    "XXS",
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "One Size",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
  ],
};
const category = {
  title: "Category",
  items: ["Clothes", "Shoes", "Equipment"],
};
export const filters = {
  category: category,
  gender: gender,
  brand: brand,
  color: color,
  sizes: sizes,
};

export const sortingOptions = [
  { id: "new", title: "Newest products" },
  { id: "high", title: "Price High to Low" },
  { id: "low", title: "Price Low to High" },
];
