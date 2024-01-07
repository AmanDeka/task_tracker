// cypress/integration/dailyTasks.spec.js

describe('Daily Tasks Page', () => {
  it('should add a card with a normal task and a counting task', () => {
    // Visit the daily tasks page
    cy.visit('localhost:3000');

    // Add a card
    cy.contains('Add Card').click();

    // Wait for the card title input to be visible
    cy.get('.card-title', { timeout: 10000 }).should('be.visible');

    // Type a title for the card
    cy.get("div[class='card-title']").within(() => {
      cy.get("div").click();
   })

   cy.get("div[class='card-title']").within(() => {
    cy.get("input").type("Hello");
 })

    // Add a normal task
    cy.get('.add-task input').type('Normal Task');
    cy.get('.add-task button').click();

    // Add a counting task
    cy.get('.add-task .add-task-dropdown button').contains('Add Counting Task').click();
    
    // Wait for the input field in the counting task to be visible
    cy.get('.add-task input', { timeout: 10000 }).should('be.visible');
    
    cy.get('.add-task input').type('Counting Task');
    cy.get('.add-task-dropdown button').contains('Add Counting Task').click();

    // Verify that the tasks are added
    cy.get('.task-list .task').should('have.length', 2);

    // Verify the normal task
    cy.contains('.task', 'Normal Task').within(() => {
      // Perform assertions for the normal task
      // Example: cy.get('.done-checkbox').should('not.be.checked');
    });

    // Verify the counting task
    cy.contains('.task', 'Counting Task').within(() => {
      // Perform assertions for the counting task
      // Example: cy.get('.done-checkbox').should('not.be.checked');
    });
  });
});
