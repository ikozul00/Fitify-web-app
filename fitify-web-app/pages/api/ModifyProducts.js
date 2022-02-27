const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: process.env.CONTENT_MANAGEMENT_API_KEY,
});

const createNewAsset = async (image) => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");

  let asset = await environment.createAssetFromFiles({
    fields: {
      title: {
        "en-US": image.name,
      },
      file: {
        "en-US": {
          contentType: image.type,
          fileName: image.name,
          file: image,
        },
      },
    },
  });
  // reassign `asset` to have the latest version number
  asset = await asset.processForAllLocales();
  asset = await asset.publish();

  return asset.sys.id;
};

export const createNewProduct = async (newProduct) => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");

  const imageData = [];
  for (let i = 0; i < newProduct.images.length; i++) {
    let assetId = await createNewAsset(newProduct.images[i]).then(
      (value) => value
    );
    imageData.push({
      sys: {
        id: assetId,
        linkType: "Asset",
        type: "Link",
      },
    });
  }

  let entry = await environment.createEntry("product", {
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
      color: {
        "en-US": [newProduct.color],
      },
      sizes: {
        "en-US": [newProduct.sizes],
      },
      material: {
        "en-US": newProduct.material,
      },
      productDetails: {
        "en-US": newProduct.productDetails,
      },
      thumbnailImage: {
        "en-US": null,
      },
      images: {
        "en-US": imageData,
      },
    },
  });

  if (newProduct.thumbnailImage) {
    let asset = await environment.createAssetFromFiles({
      fields: {
        title: {
          "en-US": newProduct.thumbnailImage.name,
        },
        file: {
          "en-US": {
            contentType: newProduct.thumbnailImage.type,
            fileName: newProduct.thumbnailImage.name,
            file: newProduct.thumbnailImage,
          },
        },
      },
    });
    // reassign `asset` to have the latest version number
    asset = await asset.processForAllLocales();
    asset = await asset.publish();

    /**
     * Update entry with new asset
     */
    entry.fields.thumbnailImage["en-US"] = {
      sys: {
        id: asset.sys.id,
        linkType: "Asset",
        type: "Link",
      },
    };
    entry = await entry.update();
  }

  // const imageData = [];
  // for (let i = 0; i < newProduct.images.length; i++) {
  //   let assetId = await createNewAsset(newProduct.images[i]).then(
  //     (value) => value
  //   );
  //   imageData.push({
  //     sys: {
  //       id: assetId,
  //       linkType: "Asset",
  //       type: "Link",
  //     },
  //   });
  // }
  // console.log("Image data:", imageData);
  // entry.fields.images["en-US"] = { ...imageData };
  // entry = await entry.update();

  entry = await entry.publish();
};

// export const fetchEntry = async () => {
//   client
//     .getSpace(process.env.CONTENTFUL_SPACE_ID)
//     .then((space) => space.getEnvironment("master"))
//     .then((environment) => environment.getEntry("33Zc88vISN3UZHbHM3WGKT"))
//     .then((entry) => console.log(entry))
//     .catch(console.error);
//   return 0;
// };
