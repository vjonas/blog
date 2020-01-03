import { HttpService } from "./services/http.service";
import { Component, HostListener } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { environment } from "src/environments/environment";

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

  constructor(private router: Router, private http: HttpService) {
    this.router.events.subscribe(event => {
      if (
        event instanceof NavigationEnd
        // && environment.production
      ) {
        this.http.send(`routed: ${event.urlAfterRedirects}`);
      }
    });
  }
}
