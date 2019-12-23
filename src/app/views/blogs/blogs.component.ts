import { Blog } from "./../../models/blog.model";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.scss"]
})
export class BlogsComponent {
  @Input() blogs: Blog[];
}
