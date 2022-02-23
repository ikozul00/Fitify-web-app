const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: process.env.CONTENT_MANAGEMENT_API_KEY,
});

export const createNewProduct = (newProduct) => {
  client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment("master"))
    .then((environment) =>
      environment.createEntry("product", {
        fields: {
          title: {
            "en-US": newProduct.title,
          },
          price: {
            "en-US": Number(newProduct.price),
          },
          oldPrice: {
            "en-US": Number(newProduct.oldPrice),
          },
          category: {
            "en-US": newProduct.category,
          },
          gender: {
            "en-US": newProduct.gender,
          },
          brand: {
            "en-US": newProduct.brand,
          },
        },
      })
    )
    .then((entry) => console.log(entry))
    .catch(console.error);
};
