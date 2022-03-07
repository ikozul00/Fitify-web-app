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

export const updateBlogPost = async (post) => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");
  const entry = await environment.getEntry(post.id);

  if (entry.fields.title["en-US"] != post.title) {
    // Ako je naslov promijenjen, treba generirati i novi slug
    let newSlug = convertToSlug(post.title);
    let titleCheck = await checkIfSlugExists(newSlug);

    if (titleCheck)
      return {
        error: true,
        errorMsg:
          "Post with that title already exists! Please, change the title.",
      };

    entry.fields.title["en-US"] = post.title; // U slucaju da je novi title dobar
    entry.fields.slug["en-US"] = newSlug;
  }

  entry.fields.description["en-US"] = post.description;
  entry.fields.body["en-US"] = post.body;

  if (post.thumbnailImage.file) {
    // Ako je dodana nova slika
    let assetId = await createNewAsset(post.thumbnailImage.file);
    entry.fields.thumbnailImage["en-US"] = {
      sys: {
        id: assetId,
        linkType: "Asset",
        type: "Link",
      },
    };
  }

  if (post.headerImage.file) {
    // Ako je dodana nova slika
    let assetId = await createNewAsset(post.headerImage.file);
    entry.fields.headerImage["en-US"] = {
      sys: {
        id: assetId,
        linkType: "Asset",
        type: "Link",
      },
    };
  }

  entry = await entry.update();
  entry = await entry.publish();
  return { error: false };
};

export const deletePost = async (postId) => {
  let isDeleted = await client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment("master"))
    .then((environment) => environment.getEntry(postId))
    .then((entry) => entry.unpublish())
    //.then((entry) => entry.delete())
    .then(() => true)
    .catch(() => false);

  console.log("Is post deleted:", isDeleted);
  return isDeleted;
};
