import { Component } from "./component/component";
import { Page } from "./page/page";
import { Service } from "./service/service";
import { NameObj, WriteFile } from "./types";

export class Template {
  public static BuildTemplate(
    type: string,
    name: string,
    args: string[]
  ): Readonly<WriteFile[]> {
    const nameobj = Template.GenerateName(name);
    let files: Readonly<WriteFile[]> = [];
    switch (true) {
      case type == "c" || type == "component":
        files = Component.Generate("", nameobj);
        break;
      case type == "p" || type == "page":
        files = Page.Generate("", nameobj);
        break;
      case type == "se" || type == "service":
        files = Service.Generate("", nameobj);
        break;
      case type == "st" || type == "state":
        files = Component.Generate("", nameobj);
        break;
    }
    return files;
  }

  private static GenerateName(name: string): Readonly<NameObj> {
    const nameObj: NameObj = {
      className: "",
      fileName: name.toLocaleLowerCase()
    };
    if (name.indexOf("-") > -1) {
      nameObj.className = name
        .split("-")
        .map((name) => {
          return name.charAt(0).toUpperCase() + name.slice(1);
        })
        .join("");
    } else {
      const toUpperCase = name.charAt(0).toUpperCase() + name.slice(1);
      nameObj.className = toUpperCase;
    }
    return nameObj;
  }
}
