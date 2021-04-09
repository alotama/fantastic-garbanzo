const getProductPicture = (object) => {
  let productPicture = ''
  if (object.pictures.length > 1) {
    productPicture = object.pictures[0].url
  }

  return productPicture
}

export default getProductPicture;