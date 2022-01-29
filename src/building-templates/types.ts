export enum TemplateType {
  "COMPONENT" = "component",
  "SERVICE" = "service",
  "PAGE" = "page"
}
export interface NameObj {
  fileName: string;
  className: string;
}
export interface WriteFile {
  path: string;
  content: string;
}
