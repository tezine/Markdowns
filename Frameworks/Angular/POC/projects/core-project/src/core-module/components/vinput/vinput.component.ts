import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'VInput',
  templateUrl: './vinput.component.html',
  styleUrls: ['./vinput.component.scss']
})
export class VInputComponent implements OnInit {

  @Input() label:string='';
  @Input() placeholder:string='';
  @Output() textChanged: EventEmitter<string> = new EventEmitter();
  @Input() text:string='';

  constructor() { }

  ngOnInit(): void {
  }

  onModelChanged(txt:string){
    this.textChanged.emit(txt);
  }

  @HostListener('mouseenter') onMouseEnter() {
    console.log('mouse enter');
  }

}
