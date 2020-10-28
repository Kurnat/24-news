import { ElementRef, HostListener } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {

  constructor(public el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
   }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeColor('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor(null);
  }

  private changeColor(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
