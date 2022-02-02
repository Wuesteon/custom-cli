
    import { HttpClient } from '@angular/common/http';
    import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
    import { TestBed } from '@angular/core/testing';
    import { Supercard } from './supercard.service';

    describe('Supercard', () => {
        let service: Supercard;
        let httpClient: HttpClient, http: HttpTestingController;
      
        beforeEach(() => {
          TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
          });
      
          http = TestBed.inject(HttpTestingController);
          httpClient = TestBed.inject(HttpClient);
          service = new Supercard(httpClient);
        });
      
        afterEach(() => {
          http.verify();
        });
      })
        