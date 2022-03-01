const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: process.env.CONTENT_MANAGEMENT_API_KEY,
});

export const createNewAsset = async (image) => {
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

  // Unos novih asseta za svaku sliku
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
        "en-US": newProduct.oldPrice ? Number(newProduct.price) : null,
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
        "en-US": newProduct.color,
      },
      sizes: {
        "en-US": newProduct.sizes,
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

    //Update entry with new asset
    entry.fields.thumbnailImage["en-US"] = {
      sys: {
        id: asset.sys.id,
        linkType: "Asset",
        type: "Link",
      },
    };
    entry = await entry.update();
  }

  entry = await entry.publish();
};

export const fetchEntryById = async (entryId) => {
  return client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment("master"))
    .then((environment) => environment.getEntry(entryId))
    .then((entry) => entry)
    .catch((error) => error);
};

export const updateProduct = async (product) => {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment("master");
  const entry = await environment.getEntry(product.id);

  entry.fields.title["en-US"] = product.title;
  entry.fields.price["en-US"] = Number(product.price);

  if (!entry.fields.oldPrice)
    entry.fields.oldPrice = { "en-US": Number(product.oldPrice) };
  // Ako ne postoji vec polje oldPrice, treba ga dodati
  else entry.fields.oldPrice["en-US"] = Number(product.oldPrice); // Ako postoji, samo se postavi
  if (entry.fields.oldPrice["en-US"] == 0)
    entry.fields.oldPrice["en-US"] = null; //Ako je stara cijena 0, postavi na null ovo polje

  entry.fields.title["en-US"] = product.title;
  entry.fields.category["en-US"] = product.category;
  entry.fields.gender["en-US"] = product.gender;
  entry.fields.brand["en-US"] = product.brand;
  entry.fields.sizes["en-US"] = [...product.sizes];
  entry.fields.color["en-US"] = [...product.color];
  entry.fields.productDetails["en-US"] = product.productDetails;

  if (!entry.fields.material)
    entry.fields.material = { "en-US": product.material };
  else entry.fields.material["en-US"] = product.material;

  entry = await entry.update();

  entry = await entry.publish();
};
