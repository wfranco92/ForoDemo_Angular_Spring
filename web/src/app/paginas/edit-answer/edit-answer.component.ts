import { Component, Input, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from '../../Service/service.service';
import { QuestionService } from '../../Service/question.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';

import { AnswerI } from '../../models/answer-i';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css'],
  providers: [MessageService],
})
export class EditAnswerComponent implements OnInit {
  @Input() oldAnswer: any = '';

  answer: AnswerI = {
    id: '',
    userId: '',
    questionId: '',
    answer: '',
    position: 0,
    answeredAt: '',
  };

  constructor(
    private modalService: NgbModal,
    public authService: ServiceService,
    private services: QuestionService,
    private toastr: ToastrService,
    private route: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.answer = this.oldAnswer;
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  editAnswer(asnwerUpdated: AnswerI): void {
    this.services.editAnswer(asnwerUpdated).subscribe((v) => {});

    this.modalService.dismissAll();
    this.messageService.add({
      severity: 'success',
      summary: 'Se ha actualizado la respuesta',
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
