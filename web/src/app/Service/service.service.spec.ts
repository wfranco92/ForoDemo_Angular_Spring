import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { ServiceService } from './service.service';

describe('ServiceService', () => {
  let service: ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
      ],
    });
    service = TestBed.inject(ServiceService);
  });

  /* Esta es una prueba que comprueba si se crea el servicio. */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
