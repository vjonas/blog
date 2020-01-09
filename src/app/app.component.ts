import { HttpService } from "./services/http.service";
import { Component, HostListener } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { environment } from "src/environments/environment";
import { NgcCookieConsentService } from "ngx-cookieconsent";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @HostListener("window:resize") resizing = () => this.resize();

  private resize = () => {
    let vh = window.innerHeight;
    (document.querySelector(".background") as HTMLDivElement).style.setProperty(
      "--vh",
      `${vh}px`
    );

    (document.querySelector("app-blogs") as HTMLElement).style.setProperty(
      "--vh",
      `${vh}px`
    );
  };

  constructor(
    private router: Router,
    private http: HttpService,
    private ccService: NgcCookieConsentService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && environment.production) {
        this.http.send(`routed: ${event.urlAfterRedirects}`);
      }
    });

    this.ccService.initialize$.subscribe(i => console.log("initialize", i));
    this.ccService.popupOpen$.subscribe(p => console.log("opened popup", p));
    this.ccService.statusChange$.subscribe(p =>
      console.log("status changed", p)
    );
  }
}
