import axios from "axios";
import { Config } from "../../lib/Config";

const instance = axios.create({
  baseURL: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
});

const getNumberOfPostsQuery = `query{
    blogCollection{
      total
    }
  }`;

const getAllPostSlugsQuery = `{
  blogCollection {
    items {
      slug
    }
  }
}
`;

// Funkcija vraca ukupan broj postova bloga
export const getNumberOfPosts = async () => {
  const response = await instance
    .post(
      "",
      {
        query: getNumberOfPostsQuery,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
        },
      }
    )
    .catch((err) => 0);

  if (response == 0) return 0; // U slucaju greske, broj clanaka postavlja se na 0

  const data = response.data.data;
  return data.blogCollection.total;
};

// Funkcija vraca clanke bloga po stranicama
export const getPaginatedPosts = async (page) => {
  const skipMultiplier = page <= 0 ? 0 : page - 1;
  const skip = skipMultiplier * Config.pagination.pageSize;

  const query = `query{
        blogCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}, order: sys_publishedAt_DESC) {
          total
          items {
            title
            slug
            description
            thumbnailImage{
                url
                title
          }
          sys{
            publishedAt
          }
          }
        }
      }`;

  const response = await instance
    .post(
      "",
      {
        query: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
        },
      }
    )
    .catch((err) => ({
      data: { data: { blogCollection: { total: 0, items: [] } } },
    })); // U slucaju greske vrati duljinu 0 i praznu listu clanaka

  const data = response.data.data;
  return data.blogCollection;
};

// Funkcija dohvaca sve slugove
export const getAllPostSlugs = async () => {
  const response = await instance
    .post(
      "",
      {
        query: getAllPostSlugsQuery,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
        },
      }
    )
    .catch(() => null);

  // U slucaju greske, vraca se prazna lista
  if (!response) return [];

  const data = response.data.data;
  return data.blogCollection.items;
};

// Funkcija dohvaca tocno odredeni blog post
export const getPostBySlug = async (slug) => {
  const response = await instance.post(
    "",
    {
      query: `query{
        blogCollection(where: {
        slug: "${slug}"
      }){
        items{
          title
          description
          sys{
            id
            publishedAt
          }
          headerImage{
            url
            title
          }
          body
        }
      }
    }`,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    }
  );
  // Add error handling
  const data = response.data.data;
  return data.blogCollection.items[0];
};

// Funkcija dohvaca sve ID-ove
export const getAllProductIDs = async () => {
  const response = await instance
    .post(
      "",
      {
        query: `{
          productCollection {
            items {
              sys {
                id
              }
            }
          }
        }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
        },
      }
    )
    .catch(() => null);

  // U slucaju greske, vraca se prazna lista
  if (!response) return [];

  const data = response.data.data.productCollection.items;
  return data;
};

// Funkcija dohvaca tocno odredeni product
export const getProductByID = async (id) => {
  const response = await instance.post(
    "",
    {
      query: `{
        product(id: "${id}") {
          sys {
            id
          }
          title
          price
          oldPrice
          gender
          color
          brand
          sizes
          thumbnailImage {
            url
          }
          imagesCollection {
            items {
              url
            }
          }
          productDetails
          material
        }
      }`,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    }
  );
  // Add error handling
  const data = response.data.data.product;
  return data;
};

// Dohvatiti sve produkte za pocetnu stranicu shopa
export const getAllProducts = async () => {
  const response = await instance
    .post(
      "",
      {
        query: `{
        productCollection {
          total
          items {
            sys {
              id
              publishedAt
            }
            title
            brand
            gender
            color
            category
            sizes
            thumbnailImage {
              url
            }
            price
            oldPrice
          }
        }
      }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
        },
      }
    )
    .catch(() => null);

  // U slucaju greske, vraca se prazan objekt
  if (!response) return {};

  const data = response.data.data.productCollection;
  return data;
};

// export const CheckLoginData = async (name, password) => {
//   const response = await instance
//     .post(
//       "",
//       {
//         query: `query{
//         userCollection(where: {
//             username:"${name}",password:"${password}"
//           }){
//           items{
//             username
//           }
//         }
//       }`,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + CONTENTFUL_ACCESS_TOKEN,
//         },
//       }
//     )
//     .catch(() => null);
//   if (!response) {
//     return -1;
//   }
//   const data = response.data.data;
//   return data.userCollection.items;
// };

// export const GetUserData = async (user) => {
//   const response = await instance
//     .post(
//       "",
//       {
//         query: `query{
//         userCollection(where: {
//         username:"${user.name}"
//       }){
//         items{
//           name,
//           username,
//           email,
//           address,
//           city,
//           country,
//           phoneNumber,
//           surname
//         }
//         }
//       }`,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + CONTENTFUL_ACCESS_TOKEN,
//         },
//       }
//     )
//     .catch(() => null);
//   if (!response) {
//     return -1;
//   }
//   const data = response.data.data;
//   return data.userCollection.items;
// };

export const getNewestBlogArticles = async () => {
  const newestArticlesQuery = `{
    blogCollection(limit: ${Config.homepage.blogArticles}, order: sys_publishedAt_DESC) {
      items {
        title
        slug
        thumbnailImage {
          url
          title
        }
        sys{
          publishedAt
        }
      }
    }
  }`;

  const response = await instance
    .post(
      "",
      {
        query: newestArticlesQuery,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
        },
      }
    )
    .catch((err) => 0);

  if (response == 0) return [];

  const data = response.data.data;
  return data.blogCollection.items;
};

export const getNewestSaleProducts = async () => {
  const saleProductsQuery = `{
    productCollection(limit: ${Config.homepage.saleProducts}, where: {oldPrice_exists: true}) {
      items {
        title
        brand
        price
        oldPrice
        thumbnailImage {
          url
        }
        sys {
          id
        }
      }
    }
  }`;

  const response = await instance
    .post(
      "",
      {
        query: saleProductsQuery,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
        },
      }
    )
    .catch((err) => 0);

  if (response == 0) return [];

  const data = response.data.data;
  return data.productCollection.items;
};

export const getAssetById = async (assetId) => {
  const assetQuery = `{
  asset(id: "${assetId}") {
    title
    url
  }
}`;

  const response = await instance
    .post(
      "",
      {
        query: assetQuery,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
        },
      }
    )
    .catch((err) => null);

  if (response == null) return { url: "", title: "" };

  const data = response.data.data.asset;
  return data;
};

export const checkIfSlugExists = async (slug) => {
  const response = await instance
    .post(
      "",
      {
        query: `{
        blogCollection(where: {slug: "${slug}"}) {
          total
        }
      }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.CONTENTFUL_ACCESS_TOKEN,
        },
      }
    )
    .catch((err) => null);

  if (response == null) return 1;

  const data = response.data.data.blogCollection.total;
  return data;
};
