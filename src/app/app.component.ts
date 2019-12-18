import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "blog";

  public blogs = this.http.get("assets/blog-posts.json");

  constructor(private http: HttpClient) {}
}
