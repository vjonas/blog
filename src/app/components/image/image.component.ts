import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  AfterViewInit,
  Renderer2,
  ElementRef
} from "@angular/core";

const ANIMATION_DELAY_MS = 300;
@Component({
  selector: "image",
  templateUrl: "image.component.html",
  styleUrls: ["image.component.scss"]
})
export class ImageComponent implements OnChanges, AfterViewInit {
  @Input() src: string;
  @Input() title = "image-title";
  @Input() fadeImage = true;
  @Input() ratio = "1:1";
  @Input() maxWidth = "200px";
  @Input() spinnerDiameter = 35;
  @Input() keyBinding: string;

  public paddingTop = `100%`;
  public onError = false;
  public isLoading = false;

  private imageDownloader: any = new Image();

  @Output() error = new EventEmitter<Event>();
  @Output() loaded = new EventEmitter<Event>();
  @Output() keyPressed = new EventEmitter<KeyboardEvent>();

  @ViewChild("imageWrapper", { static: true }) public imageWrapper: ElementRef<
    HTMLDivElement
  >;

  constructor(private renderer: Renderer2) {
    this.loaded.subscribe(() => {
      this.onError = false;
    });
    this.error.subscribe(() => {
      this.isLoading = false;
      this.onError = true;
    });
  }

  ngAfterViewInit() {
    this.applyImageEvents(this.imageDownloader);
  }

  ngOnChanges(changes: any) {
    if (changes.ratio) {
      const [left, right] = this.ratio.split(":");
      this.paddingTop = `${(+right / +left) * 100}%`;
    }

    if (changes.src) {
      this.removeOldImgElements();
      this.loadImage(this.src);
    }
  }

  private applyImageEvents(imageDownloader: any) {
    imageDownloader.onload = (event: any) => {
      const loadedImage = event.path ? event.path[0] : event.srcElement;

      if (this.fadeImage) {
        loadedImage.classList.add("op-0");
      }

      this.addImageToDom(loadedImage);

      setTimeout(() => {
        loadedImage.classList.add("op-1");
      }, ANIMATION_DELAY_MS);

      this.loaded.emit(event);
    };

    imageDownloader.onerror = (errorEvent: Event) =>
      this.error.emit(errorEvent);
  }

  private loadImage(src: string) {
    this.isLoading = true;
    this.onError = false;
    this.imageDownloader.src = src;
  }

  private addImageToDom(elementToAdd: HTMLImageElement) {
    this.renderer.appendChild(this.imageWrapper.nativeElement, elementToAdd);
  }

  private removeOldImgElements() {
    if (this.imageWrapper.nativeElement.querySelector("img")) {
      this.imageWrapper.nativeElement
        .querySelectorAll("img")
        .forEach(imgElement =>
          this.renderer.removeChild(this.imageWrapper.nativeElement, imgElement)
        );
    }
  }
}
