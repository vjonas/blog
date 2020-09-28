import { getSetGuid } from './../../utils/guid';
import { Blog } from './../../models/blog.model';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

enum ACTIONS {
  'EDIT',
  'SAVE',
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  @Input() blog: Blog;
  @Input() admin = false;

  @Output() updatePost = new EventEmitter<Blog>();
  @Output() addEmoji = new EventEmitter<any>();

  @ViewChild('textareaBody') public textArea: ElementRef<HTMLTextAreaElement>;

  public actions = ACTIONS;
  public editing = false;
  public clickedEmoji = '';
  public contentEditable = 'false';

  public trackByFn = (index, item) => {
    return item.key;
  };

  public onEdit() {
    this.contentEditable = !JSON.parse(this.contentEditable) + '';
    this.editing = !this.editing;
    setTimeout(() => this.textArea.nativeElement.focus()); // focus on textArea
  }

  public onCancelEdit() {
    this.contentEditable = !JSON.parse(this.contentEditable) + '';
    this.editing = !this.editing;
  }

  public addReaction(emojiKey: string, { target }: any) {
    target.classList.add('move');
    setTimeout(() => target.classList.remove('move'), 1000);
    this.clickedEmoji = emojiKey;

    this.addEmoji.emit({
      id: this.blog.id,
      emoji: true,
      emojiKey,
      guid: getSetGuid(),
    } as any);
  }

  public changedImgSrc({ previousSrc, currentSrc }: { previousSrc: string; currentSrc: string }) {
    this.blog = {
      ...this.blog,
      srcs: this.blog.srcs.map(src => (src === previousSrc ? currentSrc : src)),
    };
  }

  public addImageSrc(srcToAdd: string) {
    this.blog.srcs = [...this.blog.srcs, srcToAdd];
  }

  public removeImageSrc(srcToRemove: string) {
    this.blog = {
      ...this.blog,
      srcs: this.blog.srcs.filter(src => src !== srcToRemove),
    };
  }

  public onSave(body: HTMLTextAreaElement, elements: HTMLElement[]) {
    this.contentEditable = !JSON.parse(this.contentEditable) + '';
    this.editing = !this.editing;

    this.updatePost.emit({
      ...this.blog,
      body: body.value,
      title: elements[0].innerHTML,
      date: elements[1].innerHTML,
    });
  }
}
