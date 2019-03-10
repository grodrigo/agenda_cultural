describe('Agenda Cultural Tests', () => {
  //const baseURL = Cypress.env( "site" ).url;
//Cypress.config().baseUrl;

  beforeEach(() => {
    cy.exec('bash resetdb.sh');
    cy.fixture('user').as('user');
    cy.fixture("user2").as("user2");
    cy.fixture("events").as("events");
    cy.get('@user').then((user) => {
        cy.request('POST', Cypress.env('api_server')+'/customUsers', user ).its('body').as('currentUser')
        cy
          .visit("/login")
          .get('input[name="email"]').type(user.email)
          .get('input[name="password"]').type(user.password)
          .get("form").submit()
    })
    cy.get('@user2').then((user) => { cy.request('POST', Cypress.env('api_server')+'/customUsers', user ) })
  });

  describe ('First Test', () => {
    it ('Shows a placeholder', () => {
      cy.exec('bash resetdb.sh');
      cy
      .visit('/')
      .get('[data-cy=eventoList]')
      .should(($li) => {
        expect($li.first()).to.contain("No hay eventos")
      })
    })
    it ('Can register and login', () => {
      cy.exec('bash resetdb.sh');
      cy.get('@user').then((user) => {
        cy
          .visit("/register")
          .get('input[name="name"]').type(user.name)
          .get('input[name="email"]').type(user.email)
          .get('input[name="password"]').type(user.password)
          .get('input[name="password_confirm"]').type(user.password)
          .get("form").submit()
          .location("pathname").should("eq", "/login");
        cy
          .visit("/login")
          .get('input[name="email"]').type(user.email)
          .get('input[name="password"]').type(user.password)
          .get("form").submit()
          .location("pathname").should("eq", "/")
        cy
          .get('[data-cy=logoutLink]').click()
          .get('[data-cy=regitsterLink]')
          .should('exist')
      })
    })
    it ('User1 can post and edit', () => {
      cy.get('@events').then((events) => {
        cy
          .get('[data-cy=navbar] [data-cy=addLink]')
          .should('exist')
          .click()
          .get('input[name="title"]').type("An event")
          .should('have.attr', 'required')
          .get('input[name="description"]').type(events.description)
          .get('input[name="place"]').type(events.place)
          .get('input[name="date"]').type(events.date)
          .get('input[name="picture"]').type(events.picture)
          .get("form").submit()
          .location("pathname").should("eq", "/")
          .get('[data-cy=eventoList]')
          .should(($div) => {
            expect($div.first()).to.contain(events.place)
          })
          .get('[data-cy=detailsLink]')
          .click()
          .get('[data-cy=editLink]')
          .click()
          .get('h1')
          .should(($h1) => {
            expect($h1).to.contain("Editar Evento")
        })
      })
    })

    it ('User2 only can view', () => {
      cy.get('@events').then((events) => {
        cy
          .get('[data-cy=navbar] [data-cy=addLink]')
          .should('exist')
          .click()
          .get('input[name="title"]').type("An event")
          .should('have.attr', 'required')
          .get('input[name="description"]').type(events.description)
          .get('input[name="place"]').type(events.place)
          .get('input[name="date"]').type(events.date)
          .get('input[name="picture"]').type(events.picture)
          .get("form").submit()
          .get('[data-cy=logoutLink]').click();
        cy.get('@events').then((events) => {
          cy
            .get('[data-cy=detailsLink]')
            .click()
            .get('[data-cy=editLink]').should('not.exist');
        })
        cy.visit("/")
      })
    })
  })
})

