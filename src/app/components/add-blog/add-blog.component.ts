import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-blog",
  templateUrl: "./add-blog.component.html",
  styleUrls: ["./add-blog.component.scss"]
})
export class AddBlogComponent implements OnInit {
  public date = new Date().toISOString().split("T")[0];
  public title = "";

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddBlogComponent>
  ) {}

  ngOnInit() {}

  public submit(body: HTMLParagraphElement) {
    console.log("submit");
    console.log(body.innerHTML);
    this.dialogRef.close(
      this.http.post(`${environment.url}blogs/add`, {
        title: this.title,
        date: this.date,
        body: body.innerHTML
      })
    );
  }
}
