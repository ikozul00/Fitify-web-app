const contentful = require("contentful-management");
import { checkIfSlugExists } from "./ContentfulAPI";
import { createNewAsset } from "./ModifyProducts";

const client = contentful.createClient({
  accessToken: process.env.CONTENT_MANAGEMENT_API_KEY,
});

function convertToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export const createNewBlogPost = async (newPost) => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");

  let newSlug = convertToSlug(newPost.title);
  let titleCheck = await checkIfSlugExists(newSlug);
  console.log(titleCheck);
  if (titleCheck)
    return {
      error: true,
      errorMsg:
        "Post with that title already exists! Please, change the title.",
    };

  let entry = await environment.createEntry("blog", {
    fields: {
      title: {
        "en-US": newPost.title,
      },
      description: {
        "en-US": newPost.description,
      },
      body: {
        "en-US": newPost.body,
      },
      thumbnailImage: {
        "en-US": null,
      },
      headerImage: {
        "en-US": null,
      },
      slug: {
        "en-US": newSlug,
      },
    },
  });

  if (newPost.thumbnailImage) {
    let assetId = await createNewAsset(newPost.thumbnailImage);
    //Update entry with new asset
    entry.fields.thumbnailImage["en-US"] = {
      sys: {
        id: assetId,
        linkType: "Asset",
        type: "Link",
      },
    };
    entry = await entry.update();
  }
  if (newPost.headerImage) {
    let assetId = await createNewAsset(newPost.headerImage);
    //Update entry with new asset
    entry.fields.headerImage["en-US"] = {
      sys: {
        id: assetId,
        linkType: "Asset",
        type: "Link",
      },
    };
    entry = await entry.update();
  }

  entry = await entry.publish();
  return { error: false };
};
