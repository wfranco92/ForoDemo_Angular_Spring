import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionI } from '../models/question-i';
import { AnswerI } from '../models/answer-i';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  push(arg0: string) {
    throw new Error('Method not implemented.');
  }

  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<QuestionI[]> {
    let direction = this.url + 'getAll';
    return this.http.get<QuestionI[]>(direction);
  }

  getPage(page: number): Observable<QuestionI[]> {
    let direction = this.url + 'pagination/' + page;
    return this.http.get<QuestionI[]>(direction);
  }

  getAnswer(id: any): Observable<QuestionI> {
    let direction = this.url + 'get/' + id;
    return this.http.get<QuestionI>(direction);
  }

  getQuestion(id: string): Observable<QuestionI> {
    let direction = this.url + 'get/' + id;
    return this.http.get<QuestionI>(direction);
  }

  getTotalPages(): Observable<number> {
    let direction = this.url + 'getTotalPages';
    return this.http.get<number>(direction);
  }

  getCountQuestions(): Observable<number> {
    let direction = this.url + 'countQuestions';
    return this.http.get<number>(direction);
  }

  saveQuestion(question: QuestionI): Observable<any> {
    let direction = this.url + 'create';
    return this.http.post<any>(direction, question, {
      responseType: 'text' as 'json',
    });
  }

  saveAnswer(answer: AnswerI): Observable<any> {
    let direction = this.url + 'add';
    return this.http.post<any>(direction, answer);
  }

  editQuestion(question: QuestionI): Observable<any> {
    let direction = this.url + 'update';
    return this.http.put<any>(direction, question);
  }

  editAnswer(answer: AnswerI): Observable<any> {
    let direction = this.url + 'updateAnswer';
    return this.http.put<any>(direction, answer);
  }
}
