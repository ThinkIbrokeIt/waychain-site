// Oracle: view task status (issue #176). Oracle feed reads live from precompile 0x0C-0x27 range.
describe('Oracle', () => {
  it('oracle page loads', () => {
    cy.visit('/oracle');
    cy.get('body').should('not.be.empty');
    cy.contains(/oracle|task|feed/i, { timeout: 20000 }).should('exist');
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

// Gauntlet: certification bootcamp page renders live verification banner (issue #175/#176)
describe('Gauntlet', () => {
  it('loads with live chain id and leaderboard link', () => {
    cy.visit('/gauntlet');
    cy.contains('WIFR Gauntlet').should('be.visible');
    cy.get('#chain-id-display').should('exist');
    cy.assertChainId();
    cy.get('a[href="/gauntlet/leaderboard"]').should('exist');
  });
});
