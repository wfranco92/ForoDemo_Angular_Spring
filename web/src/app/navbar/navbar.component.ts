import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userLogged = this.authService.getUserLogged();
  disabled: boolean = false;
  emailCurrentUser: string = '';

  constructor(private authService: ServiceService, private route: Router) {}

  ngOnInit(): void {
    this.traerdatos();
  }

  traerdatos() {
    this.userLogged.subscribe((value) => {
      if (value?.email == undefined) {
        this.disabled = true;
      } else {
        this.disabled = false;
        this.emailCurrentUser = value.email;
      }
    });
  }

  login() {
    this.route.navigate(['login']);
  }

  SignOut() {
    return this.authService.SignOut();
  }
}
