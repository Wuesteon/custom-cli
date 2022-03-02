import { NameObj, WriteFile } from "../types";

export class Page {
  public static Generate(
    path: string,
    name: Readonly<NameObj>
  ): Readonly<WriteFile[]> {
    const page: WriteFile = {
      path: `${path}/${name.fileName}.page.ts`,
      content: Page.GeneratePageClass(name)
    };
    const componentSpec: WriteFile = {
      path: `${path}/${name.fileName}.page.spec.ts`,
      content: Page.GeneratePageSpec(name)
    };

    const componentModule: WriteFile = {
      path: `${path}/${name.fileName}.module.ts`,
      content: Page.GeneratePageModule(name)
    };

    const componentRoutingModule: WriteFile = {
      path: `${path}/${name.fileName}-routing.module.ts`,
      content: Page.GeneratePageRoutingModule(name)
    };

    const componentScss: WriteFile = {
      path: `${path}/${name.fileName}.page.scss`,
      content: Page.GeneratePageScss()
    };

    const componentHtml: WriteFile = {
      path: `${path}/${name.fileName}.page.html`,
      content: Page.GeneratePageHtml()
    };

    const files = [
      page,
      componentScss,
      componentSpec,
      componentModule,
      componentRoutingModule,
      componentHtml
    ];
    return files;
  }

  static GeneratePageRoutingModule(name: Readonly<NameObj>): Readonly<string> {
    const { className, fileName } = name;

    return `
    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    import { ${className}Page } from './${fileName}.page';

    const routes: Routes = [
    {
        path: '',
        component: ${className}Page,
    },
    ];

    @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    })
    export class ${className}PageRoutingModule {}
    `;
  }

  private static GeneratePageClass(name: Readonly<NameObj>): Readonly<string> {
    const { className, fileName } = name;

    const componentTemplate = `
    import {
        ChangeDetectionStrategy,
        ChangeDetectorRef,
        Component,
        OnInit,
      } from '@angular/core'

        @Component({
        selector: 'app-${fileName}',
        templateUrl: './${fileName}.page.html',
        styleUrls: ['./${fileName}.page.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        })
        export class ${className}Page implements OnInit {
        public constructor(private readonly cd: ChangeDetectorRef) {}
        
        public ngOnInit(): void {}
    }
    `;

    return componentTemplate;
  }

  private static GeneratePageSpec(name: Readonly<NameObj>): Readonly<string> {
    const { className, fileName } = name;

    const pageTemplate = `
    import { ComponentFixture, TestBed } from '@angular/core/testing';
    import { IonicModule } from '@ionic/angular';
    import { runOnPushChangeDetection } from 'app/testing/run-on-push-change-detection';
    import { ${className}Page } from './${fileName}.page';
    
    describe('${className}Page', () => {
      let page: ${className}Page;
      let fixture: ComponentFixture<${className}Page>;
      let store: Store;
    
      beforeEach(async () => {
        store = createStoreSpy();
    
        await TestBed.configureTestingModule({
          declarations: [${className}Page],
          imports: [IonicModule.forRoot()],
          providers: [],
        }).compileComponents();
    
        fixture = TestBed.createComponent(${className}Page);
        page = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(page).toBeTruthy();
      });
    });
    `;

    return pageTemplate;
  }

  private static GeneratePageModule(name: Readonly<NameObj>): Readonly<string> {
    const { className, fileName } = name;
    const pageModuleTemplate = `
    import { CommonModule } from '@angular/common';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { IonicModule } from '@ionic/angular';
    import { ${className}Page } from './${fileName}.page';
    import { ${className}PageRoutingModule } from './${fileName}-routing.module';
    
    @NgModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ${className}PageRoutingModule
      ],
      declarations: [${className}Page],
      exports: [${className}Page],
    })
    export class ${className}PageModule {}
    `;

    return pageModuleTemplate;
  }

  private static GeneratePageHtml(): Readonly<string> {
    return "<ion-content></ion-content>";
  }

  private static GeneratePageScss(): Readonly<string> {
    return "";
  }
}
