
        import { HttpClient } from '@angular/common/http';
        import { Injectable } from '@angular/core';

        @Injectable({
            providedIn: 'root',
          })
          export class SupercardService {
            public constructor(private readonly httpClient: HttpClient) {}
          }
        