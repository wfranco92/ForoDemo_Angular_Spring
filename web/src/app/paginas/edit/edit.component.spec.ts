import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { environment } from 'src/environments/environment';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      declarations: [ EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* Comprobación de que se crea el componente. */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Probando que el botón muestra el texto "Edit".*/
  it('should button show text Edit', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.authService.userData = {uid: '1',email: ''}
    fixture.detectChanges();
    expect(compiled.querySelector('button').textContent).toContain('Edit');
  });

});
