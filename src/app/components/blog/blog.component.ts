import { getSetGuid } from "./../../utils/guid";
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

  @Output() updatePost = new EventEmitter<Blog>();
  @Output() addEmoji = new EventEmitter<any>();

  public actions = ACTIONS;
  public editing = false;
  public clickedEmoji = "";

  public trackByFn = (index, item) => {
    return item.key;
  };

  public onEdit(body: HTMLParagraphElement) {
    body.contentEditable = !JSON.parse(body.contentEditable) + "";

    this.editing = !this.editing;
    body.focus();
  }

  public onSave(body: HTMLParagraphElement) {
    this.editing = !this.editing;
    this.updatePost.emit({
      ...this.blog,
      body: body.innerHTML
    });
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

    // this.addEmoji.emit({
    //   ...this.blog,
    //   votes: {
    //     ...this.blog.votes,
    //     [reactionKey]: Array.from(
    //       new Set([...this.blog.votes[reactionKey], getSetGuid()])
    //     )
    //   },
    // emoji: true
    // } as any);
  }
}
