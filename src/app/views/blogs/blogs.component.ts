import { AddBlogComponent } from "./../../components/add-blog/add-blog.component";
import { environment } from "./../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";

import { Blog } from "./../../models/blog.model";
import { Observable, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { tap, catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

const snackbarOptions = {
  duration: 2000,
  verticalPosition: "top"
} as any;

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

  public trackByFn = (index, item) => {
    return item.id;
  };

  constructor(
    private aR: ActivatedRoute,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.aR.data.subscribe(({ admin }) => (this.admin = admin));
  }

  public onSave(post: any) {
    console.log(post);
    return this.http
      .post(`${environment.url}blogs`, post)
      .pipe(
        tap(e => this.snackbar.open("post saved", "dismiss", snackbarOptions)),
        catchError(e =>
          of(
            this.snackbar.open("error saving post", "dismiss", snackbarOptions)
          )
        )
      )
      .subscribe();
  }

  public onSaveEmoji(emojiToAdd) {
    return this.http
      .post<Blog[]>(`${environment.url}blogs/reaction`, emojiToAdd, {
        headers: new HttpHeaders({ emoji: "true" })
      })
      .pipe(
        tap(blogs => console.log("no error", (this.blogs$ = of(blogs)))),
        catchError(e => {
          console.log("http-err0r", e);
          this.snackbar.open(
            "Something went wrong",
            "dismiss",
            snackbarOptions
          );
          return of(e);
        })
      )
      .subscribe();
  }

  public onShowAddBlog() {
    this.showAddBlog = !this.showAddBlog;
    this.dialog
      .open(AddBlogComponent, {
        autoFocus: true,
        height: "calc(100% - 1rem)",
        width: "100%",
        disableClose: true
      })
      .afterClosed()
      .subscribe((result: Observable<Blog[]>) =>
        result
          .pipe(
            tap(blogs => {
              this.snackbar.open("post added", "dismiss", snackbarOptions);
              this.blogs$ = of(blogs);
            }),
            catchError(e =>
              of(
                this.snackbar.open(
                  "Something went wrong",
                  "dismiss",
                  snackbarOptions
                )
              )
            )
          )
          .subscribe()
      );
  }
}
