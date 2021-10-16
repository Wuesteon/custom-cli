import { outputFile } from "fs-extra";

export class FileGenerator {
  public static writeFile(className: string, content: string) {
    const path = "src/tmp/" + className + ".ts";
    outputFile(path, content, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("file " + className + " was created");
    });
  }
}
