import { NgModule } from "@angular/core";

import { LightboxComponent } from "./lightbox.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import {
  MatCommonModule,
  MatIconModule,
  MatButtonModule
} from "@angular/material";
import { ImageModule } from "../image/image.module";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MatCommonModule,
    MatIconModule,
    MatButtonModule,
    ImageModule
  ],
  exports: [LightboxComponent],
  declarations: [LightboxComponent]
})
export class LightboxModule {}
