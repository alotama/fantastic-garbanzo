// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ItemMock, ItemDescriptionMock } from '../../../../mocks'
import { cloneObject, getAsignedPropertyToProductTemplate, author, productTemplate } from '../../../../utils'

export default (req, res) => {
  const clonedProductTemplate = cloneObject(productTemplate);
  let clonedItem = cloneObject(ItemMock)
  let clonedItemDescription = cloneObject(ItemDescriptionMock)
  let asignedProductTemplate = getAsignedPropertyToProductTemplate(clonedProductTemplate, clonedItem, "productDetail")

  asignedProductTemplate.condition = clonedItem.condition
  asignedProductTemplate.sold_quantity = clonedItem.sold_quantity,
  asignedProductTemplate.description = clonedItemDescription.plain_text

  const finalItem = {
    author,
    "item": asignedProductTemplate
  }

  res.status(200).json(finalItem)
}