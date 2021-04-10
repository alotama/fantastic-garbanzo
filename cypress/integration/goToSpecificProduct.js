const productsID = ['MLA897952360', 'MLA913436416', 'MLA873139514', 'MLA884006626']
const indexCluster = Math.floor(Math.random() * productsID.length);

const GoToSpecificProduct = () => {
  it('Should visit specific product page', () => {
    cy.visit(`/items/${productsID[indexCluster]}`)
    it('Should have buy button visible', () => {
      cy.url().should('include', `/items/${productsID[indexCluster]}`)
      cy.get(`[data-cy=integration-product-buy-button]`).should('be.visible')
    })
  })
}

describe('Go to Specific Product Page', () => {
  // For desktop view
  context('macbook-13 resolution', () => {
    beforeEach(() => {
      /**
       * Run these tests as if in a desktop browser,
       * with a 720p monitor
       */
      cy.viewport('macbook-13')
    })
    GoToSpecificProduct()
  })
  context('iphone-5 resolution', () => {
      beforeEach(() => {
          /**
           * Run these tests as if in a desktop browser,
           * with a 720p monitor
           */
          cy.viewport('iphone-5')
      })
      GoToSpecificProduct()
  })
  context('iphone-x resolution', () => {
      beforeEach(() => {
          /**
           * Run these tests as if in a desktop browser,
           * with a 720p monitor
           */
          cy.viewport('iphone-x', 'landscape')
      })
      GoToSpecificProduct()
  })
})