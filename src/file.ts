import { outputFile } from "fs-extra";

export class FileGenerator {
  public static writeFile(path: string, content: string) {
    path = "tmp/" + path;
    outputFile(path, content, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("file was created at: " + path);
    });
  }
}
