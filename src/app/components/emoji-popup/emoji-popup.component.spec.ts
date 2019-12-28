import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiPopupComponent } from './emoji-popup.component';

describe('EmojiPopupComponent', () => {
  let component: EmojiPopupComponent;
  let fixture: ComponentFixture<EmojiPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmojiPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
