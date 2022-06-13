import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { PreguntasComponent } from 'src/app/persona/preguntas/preguntas.component';
import { environment } from 'src/environments/environment';

import { RequestionComponent } from './requestion.component';

describe('RequestionComponent', () => {
  let component: RequestionComponent;
  let fixture: ComponentFixture<RequestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
      ],
      declarations: [ RequestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* Comprobación de que se crea el componente. */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Probando mostrar el botón con elemento con la clase pi pi-user-edit. */
  it('should show button with tag i with class pi pi-user-edit', () => {
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    let btn = compiled.querySelector('button')?.querySelector('i')?.classList.toString();
    expect(btn).toEqual("pi pi-user-edit");
  });

});
