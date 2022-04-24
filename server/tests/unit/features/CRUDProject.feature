@CRUD @Project

Feature: CRUD for Project

    Scenario Outline: Create an empty Project
        Given a <projectName> and <description>
        When a user want to create an empty Project
        Then the Project was created
        Examples:
            | projectName | description |
            | "fakeProjectName"      | "very fake description" |