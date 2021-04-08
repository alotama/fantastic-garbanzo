import getFilledProductTemplate from './getFilledProductTemplate';
import { cloneObject } from '@utils/helpers'
import { productTemplate } from '@utils/template'

const getBasicItemFormat = (object) => {
  const clonedProductTemplate = cloneObject(productTemplate);
  return object.reduce((acc, element) => {
    let asignedProductTemplate = getFilledProductTemplate(clonedProductTemplate, element)
    asignedProductTemplate.location = element.address.state_name
    asignedProductTemplate.free_shipping = element.shipping.free_shipping
    return [
      ...acc,
      cloneObject(asignedProductTemplate)
    ]
  }, [])
}

export default getBasicItemFormat;