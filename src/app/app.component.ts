import { HttpClient } from "@angular/common/http";
import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  @HostListener("window:resize") resizing = () => this.resize();
  title = "blog";

  public blogs$ = this.http.get("assets/blog-posts.json");

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  private resize = () => {
    let vh = window.innerHeight * 0.01;
    document
      .querySelector(".background")[0]
      .style.setProperty("--vh", `${vh}px`);

    document.querySelector("app-blogs")[0].style.setProperty("--vh", `${vh}px`);
  };
}
