import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig),RouterTestingModule],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* Comprobando si el componente está creado. */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Comprobando si el botón tiene el texto "Cerrar sesión" si el usuario está logueado. */
  it('should have a button with text "Logout" if the user is logged', () => {
    component.disabled = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Cerrar sesión');
  });

  /* Comprobando si el botón tiene el texto "Inicia sesión" si el usuario no está logueado. */
  it('should have a button with text "Login" if the user is not logged', () => {
    component.disabled = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Inicia sesión');
  });

});
