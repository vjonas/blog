import { Component, HostListener } from "@angular/core";

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

  constructor() {}
}
