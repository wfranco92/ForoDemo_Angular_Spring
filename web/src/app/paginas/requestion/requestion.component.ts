import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerI } from 'src/app/models/answer-i';
import { QuestionI } from 'src/app/models/question-i';
import { QuestionService } from 'src/app/Service/question.service';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requestion',
  templateUrl: './requestion.component.html',
  styleUrls: ['./requestion.component.css'],
})
export class RequestionComponent implements OnInit {
  userLogged = this.authService.getUserLogged();
  uid: any;

  question: QuestionI | undefined;
  answers: AnswerI[] | undefined;
  answersNew: AnswerI[] = [];
  answers2: AnswerI[] = [];
  currentAnswer: number = 0;

  questions: QuestionI[] | undefined;

  page: number = 0;
  contador: number = 3;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private service: QuestionService,
    public authService: ServiceService,
    private router: Router
  ) {}

  id: string | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getQuestions(`${id}`);
    this.get2();
  }

  get2() {
    let id = this.route.snapshot.paramMap.get('id');

    this.service.getAnswer(id).subscribe((data) => {
      this.answers = data.answers;
      this.answersNew = data.answers;
      this.carga();
    });
  }

  getQuestions(id: string): void {
    this.userLogged.subscribe((value) => {
      this.uid = value?.uid;
    });
    this.questionService.getQuestion(id).subscribe((data) => {
      this.question = data;
      this.answers = data.answers;
    });
  }

  AddAnwsers(index: number) {
    let last = this.currentAnswer + index;
    for (let i = this.currentAnswer; i < last; i++) {}
    this.currentAnswer += 10;
  }

  onScroll() {}

  onScrollDown(e: any) {
    this.carga();
  }
  onScrollUp(e: any) {}

  preguntasHome() {
    this.router.navigate(['preguntas']);
  }

  carga() {
    for (let i = this.page; i < this.contador; i++) {
      if (i >= this.answersNew.length) {
        break;
      }
      this.answers2.push(this.answersNew[i]);
    }
    this.contador += 3;
    this.page += 3;
  }
}
