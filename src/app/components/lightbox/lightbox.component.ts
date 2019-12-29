import {
  Component,
  OnInit,
  Input,
  HostListener,
  SimpleChanges,
  OnChanges,
  Renderer2,
  ElementRef
} from "@angular/core";

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27
}

export interface LightboxImage {
  src: string;
  id: number;
  name: string;
  isMain: boolean;
}

@Component({
  selector: "lightbox",
  templateUrl: "./lightbox.component.html",
  styleUrls: ["./lightbox.component.scss"]
})
export class LightboxComponent implements OnChanges {
  @Input() public srcs: string[];
  @Input() public ratio = "1:1";
  @Input() public maxWidth = "100%";

  public showLightbox = false;
  public chevronFlag = false; // Hide the chevron behind a flag for now, needs to be revised
  public lightbox: LightboxImage;
  public mainImage: LightboxImage;
  public internalSrcs: LightboxImage[];
  public trackBy = (index: number, image: LightboxImage) => image.id;

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (this.showLightbox) {
      event.keyCode === KEY_CODE.LEFT_ARROW && this.cyclePrevious();
      event.keyCode === KEY_CODE.RIGHT_ARROW && this.cycleNext();
      event.keyCode === KEY_CODE.ESCAPE && this.close();
    }
  }

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

  ngOnInit(): void {
    if (this.srcs) {
      this.populateLightbox();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.srcs && this.srcs) {
      this.populateLightbox();
    }
    if (changes.maxWidth) {
      this.renderer.setStyle(
        this.hostElement.nativeElement,
        "max-width",
        this.maxWidth
      );
    }
  }

  private populateLightbox(): void {
    this.internalSrcs = this.mapInternalSrcs(this.srcs);
    this.internalSrcs[0].isMain = true;
    this.mainImage = this.getMainImage(this.internalSrcs);
  }

  private getMainImage = (arr: any[]): LightboxImage =>
    arr.find(img => img.isMain);

  private getNameFromSrc = (src: string): string => src.split("/").pop();

  private mapInternalSrcs(srcs: string[]): LightboxImage[] {
    if (!srcs) {
      console.warn(`There are no sources added to the Lightbox component.`);
      return [];
    }
    return srcs.map((src, id) => ({
      src,
      id,
      name: this.getNameFromSrc(src),
      isMain: false
    }));
  }

  private getImageById = (arr: any[], id: number): LightboxImage =>
    arr.find(src => src.id === id);

  public thumbnailClick(id: number): void {
    this.internalSrcs.forEach(src => (src.isMain = false));
    this.getImageById(this.internalSrcs, id).isMain = true;
    this.mainImage = this.getMainImage(this.internalSrcs);
  }

  public mainImageClick(): void {
    this.lightbox = this.getMainImage(this.internalSrcs);
    this.showLightbox = true;
  }

  public cyclePrevious(): void {
    const id = this.lightbox.id - 1 <= 0 ? 0 : this.lightbox.id - 1;
    this.lightbox = this.getImageById(this.internalSrcs, id);
  }

  public cycleNext(): void {
    const id =
      this.lightbox.id + 1 >= this.srcs.length
        ? this.srcs.length - 1
        : this.lightbox.id + 1;
    this.lightbox = this.getImageById(this.internalSrcs, id);
  }

  public close = () => (this.showLightbox = false);

  public launch = () => window.open(this.lightbox.src, "_blank");
}
