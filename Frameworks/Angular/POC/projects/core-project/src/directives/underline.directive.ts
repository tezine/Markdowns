import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appUnderline]'
})
export class UnderlineDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.textDecoration = 'underline';
  }

}
