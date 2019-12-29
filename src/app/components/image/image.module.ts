import { LetterBindingModule } from "./../../directives/letter-binding.directive/letter-binding.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { ImageComponent } from "./image.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LetterBindingModule
  ],
  exports: [ImageComponent],
  declarations: [ImageComponent]
})
export class ImageModule {}
