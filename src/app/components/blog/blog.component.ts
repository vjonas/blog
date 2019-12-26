import { Blog } from "./../../models/blog.model";
import { Component, Input, Output, EventEmitter } from "@angular/core";

enum ACTIONS {
  "EDIT",
  "SAVE"
}

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"]
})
export class BlogComponent {
  @Input() blog: Blog;
  @Input() admin = false;

  @Output() updatePost = new EventEmitter<any>();

  public actions = ACTIONS;
  public editing = false;

  public onEdit(body: HTMLParagraphElement) {
    body.contentEditable = !JSON.parse(body.contentEditable) + "";

    this.editing = !this.editing;
    body.focus();
  }

  public onSave(body: HTMLParagraphElement) {
    this.editing = !this.editing;
    this.updatePost.emit({
      ...this.blog,
      body: body.textContent
    });
  }
}
