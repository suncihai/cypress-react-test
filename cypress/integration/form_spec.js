describe('Use cypress react selector to test the form', () => {
  const EMAILADDRESS = 'bugs.bunny@test.com';
  const PASSWORD = 'SUPER SECRET STUFFZ';

  before(() => {
    cy.visit('/');
    cy.waitForReact();
  });

  it('log email field properties', () => {
    cy.react('MyTextInput', { props: { field: { name: 'email' } } }).should(
      ($input) => {
        cy.log('react() is', $input);
        expect($input).to.have.length(1);

        let x = $input[0];
        cy.log('x is', x);
        cy.log('x.name is', x.name);
        cy.log('x.placeholder is', x.placeholder);
      }
    );
  });

  it('enter data into the fields', () => {
    cy.react('MyTextInput', { props: { field: { name: 'email' } } }).type(
      EMAILADDRESS
    );
    cy.react('MyTextInput', { props: { field: { name: 'password' } } }).type(
      PASSWORD
    );
  });

  it('validate email value prop runtime', () => {
    cy.getReact('MyTextInput', { props: { field: { name: 'email' } } })
      .getProps('field.value')
      .should('eq', EMAILADDRESS);
  });

  it('submit the form', () => {
    cy.get('.submit-btn').click();
  });

  it('validate the results', () => {
    let regexp = new RegExp(
      `^{[^"]+"email": "${EMAILADDRESS}",[^"]*"password": "${PASSWORD}"[^}]*\\}`,
      'm'
    );
    cy.get('.result-field').contains(regexp);
  });

  it('WatchList should have two symbols when rendered', () => {
    cy.getReact('ShowList').getProps('lists').should('have.length', 2);
  });

  it('enter new symbol into the add watch list field', () => {
    cy.get('[data-testid=cypress-react-test-input]').as('input').type('ETH');
  });

  it('click on the add symbol button', () => {
    cy.get('[data-testid=cypress-react-test-add]').as('button').click();
  });

  it('WatchList was updated', () => {
    cy.fixture('watchlist.json').then((watchlist) => {
      cy.getReact('ShowList').getProps('lists').should('have.length', 3);
    });
  });
});
