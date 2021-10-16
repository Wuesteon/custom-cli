import { NameObj } from "../types";

export class Component {
  static generateComponentClass(name: Readonly<NameObj>): string {
    const { componentClassName, componentName } = name;

    const componentTemplate = `
    import {
        ChangeDetectionStrategy,
        ChangeDetectorRef,
        Component,
        OnInit,
      } from '@angular/core'

        @Component({
        selector: 'app-${componentName}',
        templateUrl: './${componentName}.component.html',
        styleUrls: ['./${componentName}.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        })
        export class ${componentClassName}Component implements OnInit {
        public constructor(private readonly cd: ChangeDetectorRef) {}
        
        public ngOnInit(): void {}
    }
    `;
    return componentTemplate;
  }

  generateComponentSpec(name: Readonly<NameObj>): string {
    const { componentClassName, componentName } = name;

    const componentTemplate = `
    import { ComponentFixture, TestBed } from '@angular/core/testing';
    import { IonicModule } from '@ionic/angular';
    import { runOnPushChangeDetection } from 'app/testing/run-on-push-change-detection';
    import { ${componentClassName} } from './${componentName}.component';
    
    describe('${componentClassName}', () => {
      let component: ${componentClassName};
      let fixture: ComponentFixture<${componentClassName}>;
      let store: Store;
    
      beforeEach(async () => {
        store = createStoreSpy();
    
        await TestBed.configureTestingModule({
          declarations: [${componentClassName}],
          imports: [IonicModule.forRoot()],
          providers: [],
        }).compileComponents();
    
        fixture = TestBed.createComponent(${componentClassName});
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

  generateComponentModule(name: Readonly<NameObj>): string {
    const { componentClassName, componentName } = name;

    const componentModuleTemplate = `
    import { CommonModule } from '@angular/common';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { IonicModule } from '@ionic/angular';
    import { ${componentClassName}Component } from './${componentName}.component';
    
    @NgModule({
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
      ],
      declarations: [${componentClassName}Component],
      exports: [${componentClassName}Component],
    })
    export class ${componentClassName}ComponentModule {}
    `;

    return componentModuleTemplate;
  }

  generateComponentHtml() {
    return "<ion-content></ion-content>";
  }
}
