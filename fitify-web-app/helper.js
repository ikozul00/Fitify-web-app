import axios from "axios";

//const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;
const instance = axios.create({
  baseURL:
    "https://graphql.contentful.com/content/v1/spaces/nfg0mv1qhwou/?access_token=Px2I0bC6FlWQYBb2_8FhaCMK5A-CWUnbglZdgg2giP8",
});

const allPostsQuery = `query{
    blogCollection{
      items{
        title
        id
        date
        slug
        description
      }
    }
  }`;

// Funkcija dohvaca sve blog postove
export const getPosts = async () => {
  const response = await instance.post(
    "",
    {
      query: allPostsQuery,
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
