// Declaration page: loads, shows live chain id from api.waychain.org (issue #175/#176)
describe('Declaration of Digital Independence', () => {
  it('loads and renders the live chain id', () => {
    cy.visit('/declaration');
    cy.contains('Declaration of').should('be.visible');
    cy.get('#chain-id-display').should('exist');
    cy.assertChainId();
  });

  it('footer shows the chain tagline', () => {
    cy.visit('/declaration');
    cy.get('.footer').should('contain', 'Actually Decentralized');
  });
});
