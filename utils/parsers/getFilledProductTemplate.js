import getPriceThousands from './getPriceThousands'
import getPriceDecimals from './getPriceDecimals'
import getProductPicture from './getProductPicture'

const getFilledProductTemplate = (template, object, picture) => {
  template.id = object.id
  template.title = object.title
  template.price.currency = object.currency_id
  template.price.amount = getPriceThousands(object.price)
  template.price.decimals = getPriceDecimals(object.price)

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

export default getFilledProductTemplate;