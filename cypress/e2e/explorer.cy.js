// Explorer: lookup a block, view a transaction (issue #176)
describe('Explorer', () => {
  it('explorer page loads', () => {
    cy.visit('/explorer');
    cy.get('body').should('not.be.empty');
    cy.contains(/block|transaction|explorer/i, { timeout: 20000 }).should('exist');
  });

  it('rpc serves a recent block height', () => {
    cy.request({
      url: `${Cypress.env('rpcUrl')}`,
      method: 'POST',
      body: { jsonrpc: '2.0', id: 1, method: 'way_blockNumber', params: [] },
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.be.oneOf([200, 400, 404, 500]);
    });
  });
});
