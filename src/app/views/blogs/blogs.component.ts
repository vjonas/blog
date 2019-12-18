import { Blog } from "./../../models/blog.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.scss"]
})
export class BlogsComponent implements OnInit {
  @Input() blogs: Blog[];

  constructor() {}

  ngOnInit() {}
}
