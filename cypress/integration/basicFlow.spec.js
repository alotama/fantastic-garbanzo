const index = [0, 1, 2, 3]
const indexCluster = Math.floor(Math.random() * index.length);

const BasicFlowTest = () => {
  it('Should visit home page', () => {
    cy.visit('/')
  })
  describe('Home page', () => homeTest())
  describe('Search result page', () => SearchResultTest())
  describe('Product page', () => ProductPageTest())
}

const homeTest = () => (
  it('Should type in the search input and click in search button', () => {
    cy.get('[data-cy=integration-search-input]').type('telefono').click()
    cy.get('[data-cy=integration-search-button]').click()
  })
)
const SearchResultTest = () => (
  it('Should be able to click a product cluster', () => {
    cy.url().should('include', '/items?search=telefono')
    cy.get(`[data-cy=integration-productCluster-${indexCluster}]`).click()
  })
)
const ProductPageTest = () => (
  it('Should navigate from search result page to product page', () => {
    cy.url().should('include', '/items?search=telefono')
    cy.get(`[data-cy=integration-productCluster-${indexCluster}]`).should('have.attr', 'href').then((href) => {
      cy.visit(href)
      cy.url().should('include', href)
    })
    cy.get(`[data-cy=integration-product-buy-button]`).should('be.visible')
  })
)

describe('Basic flow', () => {
  // For desktop view
  context('macbook-13 resolution', () => {
    beforeEach(() => {
      /**
       * Run these tests as if in a desktop browser,
       * with a 720p monitor
       */
      cy.viewport('macbook-13')
    })
    BasicFlowTest()
  })
  context('iphone-5 resolution', () => {
      beforeEach(() => {
          /**
           * Run these tests as if in a desktop browser,
           * with a 720p monitor
           */
          cy.viewport('iphone-5')
      })
      BasicFlowTest()
  })
  context('iphone-x resolution', () => {
      beforeEach(() => {
          /**
           * Run these tests as if in a desktop browser,
           * with a 720p monitor
           */
          cy.viewport('iphone-x', 'landscape')
      })
      BasicFlowTest()
  })
})