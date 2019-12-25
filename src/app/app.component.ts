import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  @HostListener("window:resize") resizing = () => this.resize();
  title = "blog";

  ngOnInit(): void {}

  private resize = () => {
    let vh = window.innerHeight;
    // * 0.01;
    (document.querySelector(".background") as HTMLDivElement).style.setProperty(
      "--vh",
      `${vh}px`
    );

    (document.querySelector("app-blogs") as HTMLElement).style.setProperty(
      "--vh",
      `${vh}px`
    );
  };
}
