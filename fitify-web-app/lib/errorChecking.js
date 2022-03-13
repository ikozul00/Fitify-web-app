export const checkProduct = (product) => {
  if (!product.title || !product.price || !product.thumbnailImage)
    return {
      error: true,
      errorMsg: "Please, fill out all of the required fields.",
    };

  if (product.sizes.length == 0)
    return {
      error: true,
      errorMsg: "Please, select at least one available size.",
    };

  if (product.color.length == 0)
    return {
      error: true,
      errorMsg: "Please, select at least one color.",
    };

  if (isNaN(product.price) || isNaN(product.oldPrice))
    return {
      error: true,
      errorMsg: "Price should be a number.",
    };

  if (product.price < 0)
    return {
      error: true,
      errorMsg: "Price should be a positive number.",
    };

  if (product.oldPrice && Number(product.price) > Number(product.oldPrice))
    return {
      error: true,
      errorMsg: "Old price cannot be lower than current price.",
    };

  if (
    product.thumbnailImage.file &&
    !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
      product.thumbnailImage.file.type
    )
  )
    //Ako je dodan novi file, provjerava se je li ok tip
    return {
      error: true,
      errorMsg: "Thumbnail image format is not accepted.",
    };

  for (let i = 0; i < product.images.length; i++)
    if (
      product.images[i].file &&
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        product.images[i].file.type
      )
    )
      return {
        error: true,
        errorMsg: "Image format is not accepted.",
      };

  return {
    error: false,
    errorMsg:
      "Product successfully modified. Change will be visible after several minutes.",
  };
};

export const checkPost = (post) => {
  if (
    !post.title ||
    !post.body ||
    !post.description ||
    !post.thumbnailImage ||
    !post.headerImage
  )
    return {
      error: true,
      errorMsg: "Please, fill out all of the fields.",
    };
  if (
    post.thumbnailImage.file &&
    !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
      post.thumbnailImage.file.type
    )
  )
    //Ako je dodan novi file, provjerava se je li ok tip
    return {
      error: true,
      errorMsg: "Thumbnail image format is not accepted.",
    };
  if (
    post.headerImage.file &&
    !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
      post.headerImage.file.type
    )
  )
    //Ako je dodan novi file, provjerava se je li ok tip
    return {
      error: true,
      errorMsg: "Header image format is not accepted.",
    };

  return {
    error: false,
    errorMsg:
      "Post successfully modified. Change will be visible after several minutes.",
  };
};
