import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnChanges,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { tap, filter, takeUntil } from 'rxjs/operators';

@Directive({ selector: '[key]' })
export class LetterBindingDirective implements OnChanges, OnDestroy {
  @Input() key: string;
  @Output() keyPressed = new EventEmitter<KeyboardEvent>();

  private componentDestroyed = new Subject();
  private keyElement: HTMLDivElement;

  private handleKeyboardEvent$ = new Subject<KeyboardEvent>();

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.elRef.nativeElement, 'position', 'relative'); // the letter directive needs this to position itself absolute
    this.renderer.setStyle(this.elRef.nativeElement, 'width', 'calc(100% - 4px)'); // fix scrolling issues, because the css right property is -4px

    this.initializeKeyElement();

    this.handleKeyboardEvent$
      .pipe(
        filter(
          event => event.key && event.key.toLocaleLowerCase() === this.key.toLocaleLowerCase(),
        ),

        tap(event => this.keyPressed.emit(event)),

        takeUntil(this.componentDestroyed),
      )
      .subscribe();
  }

  ngOnChanges(changes: any) {
    if (changes.key && this.key) {
      window.addEventListener('keypress', event => {
        this.handleKeyboardEvent$.next(event);
      });

      this.keyElement.innerHTML = this.key;
      this.keyElement.style.maxWidth = `${this.elRef.nativeElement.offsetWidth}px`;
      this.renderer.appendChild(this.elRef.nativeElement, this.keyElement);
    }
  }
  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  private initializeKeyElement() {
    this.keyElement = document.createElement('div');
    this.keyElement.classList.add('key-item');
  }
}
