// Cypress support file — shared setup for all e2e specs.

// Don't hard-fail the whole run on a single uncaught page error (analytics/fonts).
Cypress.on('uncaught:exception', () => {
  return false;
});

// Helper: assert a page has a chain-id element that is populated.
// If api.waychain.org is reachable we check the live value; otherwise the
// placeholder text (e.g. "10008") is acceptable — the fetch degrades gracefully.
Cypress.Commands.add('assertChainId', () => {
  cy.get('#chain-id-display').should('exist').and('not.be.empty');
  // Best-effort live check; never hard-fails the run if the external API is down.
  cy.request({ url: `${Cypress.env('rpcUrl')}`, failOnStatusCode: false, timeout: 8000 })
    .then((resp) => {
      if (resp.status === 200 && resp.body && resp.body.chain_id) {
        cy.get('#chain-id-display').should('contain.text', String(resp.body.chain_id));
      }
    });
});
