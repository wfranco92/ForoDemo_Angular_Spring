import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { EditAnswerComponent } from './edit-answer.component';

describe('EditAnswerComponent', () => {
  let component: EditAnswerComponent;
  let fixture: ComponentFixture<EditAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      declarations: [ EditAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* Esta es una prueba que comprueba si se crea el componente. */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

/* Probando si el botón muestra el texto "Editar" */
  it('should button show text Editar', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.authService.userData = {uid: '1',email: ''}
    fixture.detectChanges();
    expect(compiled.querySelector('button').textContent).toContain('Editar');
  });

});
