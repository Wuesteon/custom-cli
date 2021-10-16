import { Template } from "./building-templates/template";
import { FileGenerator } from "./file";
var myArgs = process.argv.slice(2);
console.log("myArgs: ", myArgs);

switch (myArgs[0]) {
  case "g":
    const type = myArgs[1];
    const name = myArgs[2];
    const template = new Template(type, name, []);
    const templateC = template.buildTemplate();
    FileGenerator.writeFile("test", templateC);
    break;
  default:
    console.log("Sorry, that is not something I know how to do.");
}
