export const checkProduct = (product) => {
  if (
    product.title == "" ||
    product.price == "" ||
    product.thumbnailImage == ""
  )
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

  if (product.oldPrice && product.price > product.oldPrice)
    return {
      error: true,
      errorMsg: "Old price cannot be lower than current price.",
    };

  if (
    !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
      product.thumbnailImage.type
    )
  )
    return {
      error: true,
      errorMsg: "Thumbnail image format is not accepted.",
    };

  for (let i = 0; i < product.images.length; i++)
    if (
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        product.images[i].type
      )
    )
      return {
        error: true,
        errorMsg: "Image format is not accepted.",
      };

  return {
    error: false,
  };
};
