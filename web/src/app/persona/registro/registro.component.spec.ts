import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { environment } from 'src/environments/environment';

import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        PrimeNGModule
      ],
      declarations: [ RegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* Comprobando si el componente está creado. */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Comprobando si el formulario está creado. */
  it('should have a form', () => {
    expect(component.form).toBeTruthy();
  });

  /* Comprobando si el formulario tiene un campo de correo electrónico. */
  it('should have a email field', () => {
    expect(component.form.controls['email']).toBeTruthy();
  });

  /* Comprobando si el formulario tiene un campo de contraseña. */
  it('should have a password field', () => {
    expect(component.form.controls['password']).toBeTruthy();
  });

});
