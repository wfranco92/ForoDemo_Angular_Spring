import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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
