import { getSetGuid } from "./../../utils/guid";
import { Blog } from "./../../models/blog.model";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
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

  @Output() updatePost = new EventEmitter<Blog>();
  @Output() addEmoji = new EventEmitter<any>();

  public actions = ACTIONS;
  public editing = false;
  public clickedEmoji = "";

  public trackByFn = (index, item) => {
    return item.key;
  };

  private toggleElements = (e: HTMLElement) =>
    (e.contentEditable = !JSON.parse(e.contentEditable) + "");

  public onEdit(elements: HTMLElement[]) {
    elements.map(this.toggleElements);

    this.editing = !this.editing;
    elements[2].focus(); // focus on body
  }

  public onCancelEdit(elements: HTMLElement[]) {
    elements.map(this.toggleElements);
    this.editing = !this.editing;
  }

  public addReaction(emojiKey: string, { target }: any) {
    target.classList.add("move");
    setTimeout(() => target.classList.remove("move"), 1000);
    this.clickedEmoji = emojiKey;

    this.addEmoji.emit({
      id: this.blog.id,
      emoji: true,
      emojiKey,
      guid: getSetGuid()
    } as any);
  }

  public onSave(body: HTMLParagraphElement, elements: HTMLElement[]) {
    elements.map(this.toggleElements);
    this.editing = !this.editing;
    this.updatePost.emit({
      ...this.blog,
      body: body.innerHTML,
      title: elements[0].innerHTML,
      date: elements[1].innerHTML
    });
  }
}
