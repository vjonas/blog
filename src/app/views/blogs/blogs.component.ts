import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

import { Blog } from "./../../models/blog.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.scss"]
})
export class BlogsComponent {
  constructor(private http: HttpClient) {}
  public blogs$: Observable<Blog[]> = this.http.get<Blog[]>(
    "assets/blog-posts.json"
  );
}
