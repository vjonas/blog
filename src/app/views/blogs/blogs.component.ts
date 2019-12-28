import { environment } from "./../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";

import { Blog } from "./../../models/blog.model";
import { Observable, of } from "rxjs";
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
    console.log(post);
    return this.http.post(`${environment.url}blogs`, post).subscribe();
  }

  public onSaveEmoji(emojiToAdd) {
    return this.http
      .post(`${environment.url}blogs/reaction`, emojiToAdd, {
        headers: new HttpHeaders({ emoji: "true" })
      })
      .subscribe();
  }

  public onShowAddBlog(blog: any) {
    this.showAddBlog = !this.showAddBlog;
  }
}
