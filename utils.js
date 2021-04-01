export const cloneObject = (object) => {
  return JSON.parse(JSON.stringify(object));
}

export const getPriceDecimals = (amountPrince) => {
  let decimals = (amountPrince % 1).toFixed(2).substring(2) * 10

  return decimals;
}

export const author = {
  "name": "Sebastián",
  "lastname": "Tamashiro"
}

export const CONDITION = {
  NEW: "new",
  USED: "used"
}

export const getAsignedPropertyToProductTemplate = (template, object, picture) => {
  template.id = object.id
  template.title = object.title
  template.price.currency = object.currency_id,
  template.price.amount = object.price,
  template.price.decimals = getPriceDecimals(object.price)
  template.free_shipping = object.shipping.free_shipping

  switch (picture) {
    case "productDetail":
      template.picture = getProductPicture(object)
      break;
    default:
      template.picture = object.picture
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
  "condition": "",
  "picture": "",
}