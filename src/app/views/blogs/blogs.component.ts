import { environment } from "./../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

import { Blog } from "./../../models/blog.model";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.scss"]
})
export class BlogsComponent {
  public blogs$: Observable<Blog[]> = this.http.get<Blog[]>(
    `${environment.url}blogs`
  );

  public showLogin = false;
  public showAddBlog = false;
  public admin = false;

  constructor(private aR: ActivatedRoute, private http: HttpClient) {
    this.aR.data.subscribe(({ admin }) => (this.admin = admin));
  }

  public onSave(post: any) {
    return this.http.post(`${environment.url}blogs`, post).subscribe();
  }
}
