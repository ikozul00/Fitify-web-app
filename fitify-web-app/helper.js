import axios from "axios";

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;

const instance = axios.create({
  baseURL: `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/?access_token=${CONTENTFUL_ACCESS_TOKEN}`,
});

const getAllPostsQuery = `query{
    blogCollection{
      items{
        title
        date
        slug
        description
        image{
            url
            title
        }
      }
    }
  }`;

// Funkcija dohvaca sve blog postove
export const getPosts = async () => {
  const response = await instance.post(
    "",
    {
      query: getAllPostsQuery,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

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
          id
          title
          description
          date
          image{
            url
            title
          }
          body{
            json}
        }
      }
    }`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = response.data.data;
  return data.blogCollection.items[0];
};
