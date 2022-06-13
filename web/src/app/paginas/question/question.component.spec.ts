import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { ServiceService } from 'src/app/Service/service.service';
import { environment } from 'src/environments/environment';

import { QuestionComponent } from './question.component';

// describe('QuestionComponent', () => {
//   let component: QuestionComponent;
//   let fixture: ComponentFixture<QuestionComponent>;
//   let authService: ServiceService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         AngularFireModule.initializeApp(environment.firebaseConfig),
//         RouterTestingModule,
//         HttpClientTestingModule,
//         ToastrModule.forRoot(),
//       ],
//       declarations: [ QuestionComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(QuestionComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

// });
