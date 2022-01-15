import axios from "axios";
import { Config } from "./Config";

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;

const instance = axios.create({
  baseURL: `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
});

const getNumberOfPostsQuery = `query{
    blogCollection{
      total
    }
  }`;

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
          Authorization: "Bearer " + CONTENTFUL_ACCESS_TOKEN,
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
        blogCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}, order: date_DESC) {
          total
          items {
            id
            title
            date
            slug
            description
            thumbnailImage{
                url
                title
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
          Authorization: "Bearer " + CONTENTFUL_ACCESS_TOKEN,
        },
      }
    )
    .catch((err) => ({
      data: { data: { blogCollection: { total: 0, items: [] } } },
    })); // U slucaju greske vrati duljinu 0 i praznu listu clanaka

  const data = response.data.data;
  return data.blogCollection;
};
