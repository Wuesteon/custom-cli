import { NameObj, WriteFile } from "../types";

export class Component {
  public static Generate(
    path: string,
    name: Readonly<NameObj>
  ): Readonly<WriteFile[]> {
    const component: WriteFile = {
      path: `${path}/${name.fileName}.component.ts`,
      content: Component.GenerateComponentClass(name)
    };
    const componentSpec: WriteFile = {
      path: `${path}/${name.fileName}.component.spec.ts`,
      content: Component.GenerateComponentSpec(name)
    };

    const componentModule: WriteFile = {
      path: `${path}/${name.fileName}.module.ts`,
      content: Component.GenerateComponentModule(name)
    };

    const componentScss: WriteFile = {
      path: `${path}/${name.fileName}.component.scss`,
      content: Component.GenerateComponentScss()
    };

    const componentHtml: WriteFile = {
      path: `${path}/${name.fileName}.component.html`,
      content: Component.GenerateComponentHtml()
    };

    const files = [
      component,
      componentScss,
      componentSpec,
      componentModule,
      componentHtml
    ];
    return files;
  }

  private static GenerateComponentClass(name: Readonly<NameObj>): string {
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
        templateUrl: './${fileName}.component.html',
        styleUrls: ['./${fileName}.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        })
        export class ${className}Component implements OnInit {
        public constructor(private readonly cd: ChangeDetectorRef) {}
        
        public ngOnInit(): void {}
    }
    `;

    return componentTemplate;
  }

  private static GenerateComponentSpec(
    name: Readonly<NameObj>
  ): Readonly<string> {
    const { className, fileName } = name;

    const componentTemplate = `
    import { ComponentFixture, TestBed } from '@angular/core/testing';
    import { IonicModule } from '@ionic/angular';
    import { runOnPushChangeDetection } from 'app/testing/run-on-push-change-detection';
    import { ${className}Component } from './${fileName}.component';
    
    describe('${className}Component', () => {
      let component: ${className}Component;
      let fixture: ComponentFixture<${className}Component>;
      let store: Store;
    
      beforeEach(async () => {
        store = createStoreSpy();
    
        await TestBed.configureTestingModule({
          declarations: [${className}Component],
          imports: [IonicModule.forRoot()],
          providers: [],
        }).compileComponents();
    
        fixture = TestBed.createComponent(${className}Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    
      it('should create', () => {
        expect(component).toBeTruthy();
      });
    });
    `;

    return componentTemplate;
  }

  private static GenerateComponentModule(
    name: Readonly<NameObj>
  ): Readonly<string> {
    const { className, fileName } = name;
    const componentModuleTemplate = `
    import { CommonModule } from '@angular/common';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { IonicModule } from '@ionic/angular';
    import { ${className}Component } from './${fileName}.component';
    
    @NgModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
      ],
      declarations: [${className}Component],
      exports: [${className}Component],
    })
    export class ${className}ComponentModule {}
    `;

    return componentModuleTemplate;
  }

  private static GenerateComponentHtml(): Readonly<string> {
    return "<ion-content></ion-content>";
  }

  private static GenerateComponentScss(): Readonly<string> {
    return "";
  }
}
