import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LetterBindingDirective } from "./letter-binding.directive";

@NgModule({
  imports: [CommonModule],
  exports: [LetterBindingDirective],
  declarations: [LetterBindingDirective]
})
export class LetterBindingModule {}
