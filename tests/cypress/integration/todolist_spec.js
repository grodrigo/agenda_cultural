describe('Evento tests', () => {
  const baseURL = Cypress.env( "site" ).url;

  beforeEach(() => {
    cy.exec('sh resetdb.sh')
  })

  describe ('Third Test', () => {
    it ('Accepts input', () => {
      cy.visit( baseURL + '/' );
      cy.wait( 1000 );
      const text = 'New Evento';
      cy.get ('nav > div > ul > li.new').find('a').then(($a) =>{
        expect($a).to.have.text('Agregar Evento');
      }).click();
      cy.get(':nth-child(1) > input').type( Cypress.env( "user" ) );
      cy.get(':nth-child(2) > input').type( Cypress.env( "pass" ) );
      cy
        .get('input[name="fecha"]')
        .type( "2019-01-01" ); 
      cy
        .get('input[name="lugar"]')
        .type( "N° 1 de Namidia" );
      cy
        .get('input[name="imagen"]')
        .type( "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Party_icon.svg/909px-Party_icon.svg.png" ); 
      cy.get('form > .btn').click();
    });
  });


})

  const baseURL = Cypress.env( "site" ).url;

describe('my form', function () {
  beforeEach(function () {
    cy.visit( baseURL + '/eventos/add')
    cy.get('input[name="titulo"]').type('Johnny')
    cy.get('input[name="descripcion"]').type('Appleseed')
    cy
      .get('input[name="fecha"]')
      .type( "2019-01-01" ); 
    cy
      .get('input[name="lugar"]')
      .type( "N° 1 de Namidia" );
    cy
      .get('input[name="imagen"]')
      .type( "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Party_icon.svg/909px-Party_icon.svg.png" ); 
  })

  it('displays form validation', function () {
    cy.get('input[name="titulo"]')
      .should('have.attr', 'data-validation', 'required')
      .clear() // clear out titulo
    cy.get('form').submit()
    cy.get('#errors').should('contain', 'Titulo is required')
  })

  it('can submit a valid form', function () {
    cy.get('form').submit()
  })
})