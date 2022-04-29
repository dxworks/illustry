/// <reference types = "cypress" />


describe("Create project from Interface with one visualization", function() {
    it("Verify that Illustry opens up", function() {
        cy.visit(`http://localhost:4200/projects`)
    })
    it("Verify that the add section opends up and add an illustrations", function() {
        cy.visit(`http://localhost:4200/projects`)
        cy.get(".custom-button > .mat-icon").click()
        cy.location(`pathname`).should('eq', '/add')
        cy.get(':nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("project with cypress")
        cy.get('#projectDescription').type("Generated description with cypress")
        cy.get('ngx-dropzone').attachFile('wordcloud.json', { subjectType: 'drag-n-drop' })
        cy.get('.btn').click()
        cy.get('#mat-dialog-0')
        cy.get('.ng-star-inserted > [align="center"] > .centerButton').click()
    })
    it("Move to the projects to see the actual visualization", function() {
        cy.visit(`http://localhost:4200/projects`)
        cy.location('pathname').should('eq', '/projects')
        cy.get(".mat-select-arrow-wrapper").click()
        cy.contains("20").click()
        cy.contains('project with cypress').click()
        cy.location('pathname').should('eq', '/projects/project%20with%20cypress/illustrations')
        cy.wait(1000)
        cy.reload()
        cy.contains('wordcloud')
    })
    it("Deletes the project", function() {
        cy.origin('http://localhost:7000', () => {
            cy.visit('http://localhost:7000/api-docs')
            cy.get('#operations-Projects-delete_api_project__projectName_ > .opblock-summary > .opblock-summary-control > .arrow').click()
            cy.get('.btn').click()
            cy.get('.parameters-col_description > input').type('project with cypress')
            cy.get('.execute-wrapper > .btn').click()
        })
    })
})
describe("Create project from Interface with no description", function() {
    it("Verify that Illustry opens up", function() {
        cy.visit(`http://localhost:4200/projects`)
    })
    it("Verify that the add section opends up and add an illustrations", function() {
        cy.visit(`http://localhost:4200/projects`)
        cy.get(".custom-button > .mat-icon").click()
        cy.location(`pathname`).should('eq', '/add')
        cy.get(':nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("project with cypress")
        cy.get('#projectDescription').type("Generated description with cypress")
        cy.get('ngx-dropzone').attachFile('wordcloud.json', { subjectType: 'drag-n-drop' })
        cy.get('.btn').click()
        cy.get('#mat-dialog-0')
        cy.get('.ng-star-inserted > [align="center"] > .centerButton').click()
    })
    it("Move to the projects to check the project creation", function() {
        cy.visit(`http://localhost:4200/projects`)
        cy.location('pathname').should('eq', '/projects')
        cy.get(".mat-select-arrow-wrapper").click()
        cy.contains("20").click()
        cy.contains('project with cypress')
        cy.contains('project with cypress').click()
        cy.wait(1000)
        cy.reload()
        cy.location('pathname').should('eq', '/projects/project%20with%20cypress/illustrations')
    })
    it("Deletes the project", function() {
        cy.origin('http://localhost:7000', () => {
            cy.visit('http://localhost:7000/api-docs')
            cy.get('#operations-Projects-delete_api_project__projectName_ > .opblock-summary > .opblock-summary-control > .arrow').click()
            cy.get('.btn').click()
            cy.get('.parameters-col_description > input').type('project with cypress')
            cy.get('.execute-wrapper > .btn').click()
        })
    })
})
describe("Create project from Interface with no visualization", function() {
    it("Verify that Illustry opens up", function() {
        cy.visit(`http://localhost:4200/projects`)
    })
    it("Verify that the add section opends up and add an illustrations", function() {
        cy.visit(`http://localhost:4200/projects`)
        cy.get(".custom-button > .mat-icon").click()
        cy.location(`pathname`).should('eq', '/add')
        cy.get(':nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("project with cypress")
        cy.get('#projectDescription').type("Generated description with cypress")
        cy.get('.btn').click()
        cy.get('#mat-dialog-0')
        cy.get('.ng-star-inserted > [align="center"] > .centerButton').click()
    })
    it("Move to the projects to see the actual visualization", function() {
        cy.visit(`http://localhost:4200/projects`)
        cy.location('pathname').should('eq', '/projects')
        cy.get(".mat-select-arrow-wrapper").click()
        cy.contains("20").click()
        cy.contains('project with cypress').click()
        cy.location('pathname').should('eq', '/projects/project%20with%20cypress/illustrations')
        cy.wait(1000)
        cy.reload()
    })
    it("Deletes the project", function() {
        cy.origin('http://localhost:7000', () => {
            cy.visit('http://localhost:7000/api-docs')
            cy.get('#operations-Projects-delete_api_project__projectName_ > .opblock-summary > .opblock-summary-control > .arrow').click()
            cy.get('.btn').click()
            cy.get('.parameters-col_description > input').type('project with cypress')
            cy.get('.execute-wrapper > .btn').click()
        })
    })
})