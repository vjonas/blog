import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-blog",
  templateUrl: "./add-blog.component.html",
  styleUrls: ["./add-blog.component.scss"]
})
export class AddBlogComponent implements OnInit {
  public today = new Date().toISOString().split("T")[0];

  constructor() {}

  ngOnInit() {}
}
