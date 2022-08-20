import { Given, When, Then } from "@cucumber/cucumber";
import { Factory } from "../../../src/lib/factory";
import { config } from "../../../src/config";
const axios = require("axios").default;

Given(
  "a {string} and {string}",
  function (projectName: string, projectDescription: string) {
    const self = this;
    self.projectName = projectName;
    self.projectDescription = projectDescription;
  }
);
When("a user want to create an empty Project", function () {
  const self = this;

  //  return Factory.getInstance()
  //     .projectBzl.queryAllProjects()
  //     .then((val: any) => {
  //       self.val = val
  //     });

});

Then("the Project was created", function (done: Function) {
  const self = this;
  done()
});
