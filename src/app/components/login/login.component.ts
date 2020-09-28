import { Component, Output, EventEmitter } from '@angular/core';

import { sha1 } from 'object-hash';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() password = new EventEmitter();

  public emit(event, value) {
    event.preventDefault();

    localStorage.setItem('auth', sha1(value));
    this.password.emit();
  }
}
