export const cloneObject = (object) => {
  return JSON.parse(JSON.stringify(object));
}

export const getPriceDecimals = (amountPrince) => {
  let decimals = (amountPrince % 1).toFixed(2).substring(2)
  return decimals;
}

export const author = {
  "name": "Sebastián",
  "lastname": "Tamashiro"
}

export const getPriceThousands = (num) => {
  return parseInt(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const getAsignedPropertyToProductTemplate = (template, object, picture) => {
  template.id = object.id
  template.title = object.title
  template.price.currency = object.currency_id
  template.price.amount = getPriceThousands(object.price)
  template.price.decimals = getPriceDecimals(object.price)
  template.free_shipping = object.shipping.free_shipping

  switch (picture) {
    case "productDetail":
      template.picture = getProductPicture(object)
      break;
    default:
      template.picture = object.thumbnail;
      break;
  }

  return template
}

export const getProductPicture = (object) => {
  let productPicture = ''
  if (object.pictures.length > 1) {
    productPicture = object.pictures[0].url
  }

  return productPicture
}

export const productTemplate = {
  "id": "",
  "title": "",
  "price": {
    "currency": "",
    "amount": "",
    "decimals": ""
  },
  "free_shipping": "",
  "picture": "",
}

export const capitalizeFirstLetter = (string) => {
  return string.replace(/^\w/, (c) => c.toUpperCase())
}