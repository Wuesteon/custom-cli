import { NameObj, WriteFile } from "../types";

export class Service {
  public static Generate(
    path: string,
    name: Readonly<NameObj>
  ): readonly WriteFile[] {
    const service: Readonly<WriteFile> = {
      path: `${path}/${name.fileName}.service.ts`,
      content: Service.GenerateServiceTemplate(name)
    };
    const serviceSpec: Readonly<WriteFile> = {
      path: `${path}/${name.fileName}.service.spec.ts`,
      content: Service.GenerateServiceSpecTemplate(name)
    };

    const files: Readonly<WriteFile[]> = [service, serviceSpec];
    return files;
  }

  private static GenerateServiceSpecTemplate(
    name: Readonly<NameObj>
  ): Readonly<string> {
    return `
    import { HttpClient } from '@angular/common/http';
    import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
    import { TestBed } from '@angular/core/testing';
    import { ${name.className}Service } from './${name.fileName}.service';

    describe('${name.className}Service', () => {
        let service: ${name.className}Service;
        let httpClient: HttpClient, http: HttpTestingController;
      
        beforeEach(() => {
          TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
          });
      
          http = TestBed.inject(HttpTestingController);
          httpClient = TestBed.inject(HttpClient);
          service = new ${name.className}Service(httpClient);
        });
      
        afterEach(() => {
          http.verify();
        });
      })
        `;
  }

  private static GenerateServiceTemplate(
    name: Readonly<NameObj>
  ): Readonly<string> {
    return `
        import { HttpClient } from '@angular/common/http';
        import { Injectable } from '@angular/core';

        @Injectable({
            providedIn: 'root',
          })
          export class ${name.className}Service {
            public constructor(private readonly httpClient: HttpClient) {}
          }
        `;
  }
}
