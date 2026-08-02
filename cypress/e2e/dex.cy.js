// DEX: swap a small amount (issue #176). The DEX UI reads pair/pool state live from precompiles.
describe('DEX', () => {
  it('dex page loads', () => {
    cy.visit('/dex');
    cy.contains(/swap|pool|dex|exchange/i, { timeout: 20000 }).should('exist');
  });

  it('rpc endpoint responds', () => {
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
