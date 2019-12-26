import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";

import { sha1 } from "object-hash";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @Output() password = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public emit(event, value) {
    event.preventDefault();

    localStorage.setItem("auth", sha1(value));
    this.password.emit();
  }
}
