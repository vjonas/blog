import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-emoji-popup",
  templateUrl: "./emoji-popup.component.html",
  styleUrls: ["./emoji-popup.component.scss"]
})
export class EmojiPopupComponent implements OnChanges {
  @Input() emoji: string;
  @ViewChild("emojiEl") emojiEl: ElementRef;

  ngOnChanges(changes) {
    if (changes.emoji && this.emojiEl) {
      this.emojiEl.nativeElement.style.top = window.innerHeight / 2 + "px";
      this.emojiEl.nativeElement.style.left = window.innerWidth / 2 + "px";
      this.emojiEl.nativeElement.classList.add("show");
      setTimeout(
        () => this.emojiEl.nativeElement.classList.remove("show"),
        1000
      );
    }
  }
}
