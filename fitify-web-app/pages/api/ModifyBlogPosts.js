const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: process.env.CONTENT_MANAGEMENT_API_KEY,
});

export const createNewBlogPost = async (newPost) => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");
};
