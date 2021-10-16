import { Component } from "./component/component";
import { NameObj } from "./types";

export class Template {
  private readonly type: string;
  private readonly name: string;
  private readonly args: string[];

  constructor(type: string, name: string, args: string[]) {
    this.type = type;
    this.name = name;
    this.args = args;
  }

  public buildTemplate(): string {
    const nameobj = this.nameGenerator();
    const template = Component.generateComponentClass(nameobj);
    return template;
  }

  private nameGenerator(): NameObj {
    const nameObj: NameObj = {
      componentClassName: "",
      componentName: this.name.toLocaleLowerCase()
    };
    if (this.name.indexOf("-") > -1) {
      nameObj.componentClassName = this.name
        .split("-")
        .map((name) => {
          return name.charAt(0).toUpperCase() + name.slice(1);
        })
        .join("");
    } else {
      const toUpperCase =
        this.name.charAt(0).toUpperCase() + this.name.slice(1);
      nameObj.componentClassName = toUpperCase;
    }
    return nameObj;
  }
  private typeMatcher(type: string) {}
}
