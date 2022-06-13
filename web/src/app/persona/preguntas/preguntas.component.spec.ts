import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PreguntasComponent } from './preguntas.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

describe('PreguntasComponent', () => {
  let component: PreguntasComponent;
  let fixture: ComponentFixture<PreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule
      ],
      declarations: [ PreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* Probar si se crea el componente. */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Probar si el componente muestra el número correcto de preguntas. */
  it('should show 5 questions', () => {
    component.totalQuestions = 5;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    let textTotal = compiled.getElementsByClassName("text-start fs-4 font2");
    expect(textTotal[0].textContent).toContain('5 Preguntas');
  });

  /* Comprobar si el componente muestra el número correcto de preguntas. */
  it('should show 2 questions', () => {
    component.questions = []
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    let totalElementsQuestions = compiled.getElementsByClassName("question");
    expect(totalElementsQuestions.length).toBe(0);
  });

});
