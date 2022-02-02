import { NameObj, WriteFile } from "../types";

export class State {
  public static Generate(
    path: string,
    name: Readonly<NameObj>
  ): Readonly<WriteFile[]> {
    const state: WriteFile = {
      path: `${path}/${name.fileName}.state.ts`,
      content: State.GenerateState(name)
    };
    const stateActions: WriteFile = {
      path: `${path}/${name.fileName}.actions.ts`,
      content: State.GenerateStateActions(name)
    };

    const stateSelectors: WriteFile = {
      path: `${path}/${name.fileName}.selectors.ts`,
      content: State.GenerateStateSelectors(name)
    };

    const stateSpec: WriteFile = {
      path: `${path}/${name.fileName}.state.spec.ts`,
      content: State.GenerateStateSpec(name)
    };

    const files = [state, stateActions, stateSelectors, stateSpec];
    return files;
  }

  static GenerateStateSpec(name: Readonly<NameObj>): Readonly<string> {
    return `
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import {
  ${name.className}State,
  ${name.className}StateModel,
  STATE_DEFAULTS_${name.className.toUpperCase()},
  STATE_NAME_${name.className.toUpperCase()}
} from './${name.fileName}.state';

describe('${name.className}State', () => {
    let store: Store;
    let ctx: StateContextMock<${name.className}StateModel>;
  
    beforeEach(async () => {

      await TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([${
          name.className
        }State], { developmentMode: true })],
        providers: [],
      })
        .compileComponents()
        .catch(() => {});

      store = TestBed.inject(Store);
      store.reset({
        [STATE_NAME_${name.className.toUpperCase()}]: {
          ...STATE_DEFAULTS_${name.className.toUpperCase()},
        },
      });
  
      ctx = mockNGXSStateContext(${name.className}State);
    });
})
        `;
  }

  static GenerateStateSelectors(name: Readonly<NameObj>): Readonly<string> {
    return `
    export class ${name.className}StateSelectors {
    }
        `;
  }

  static GenerateStateActions(name: Readonly<NameObj>): Readonly<string> {
    return `
export namespace ${name.className}Actions {
}
        `;
  }

  static GenerateState(name: Readonly<NameObj>): Readonly<string> {
    return `
import { Injectable } from '@angular/core';
import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';

export class ${name.className}StateModel {}

const STATE_NAME_${name.className.toUpperCase()} = '${name.className.toLocaleLowerCase()}';
const STATE_DEFAULTS_${name.className.toUpperCase()} = {};

@State<${name.className}StateModel>({
  name: STATE_NAME_${name.className.toUpperCase()},
  defaults: STATE_DEFAULTS_${name.className.toUpperCase()}
})
@Injectable()
export class ${name.className}State {
  public constructor() {}
}
       `;
  }
}
