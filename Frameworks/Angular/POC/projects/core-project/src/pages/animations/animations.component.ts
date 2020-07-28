import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        width: '400px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '250px',
        width: '450px',
        opacity: 0.9,
        backgroundColor: '#00e676'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),],
})
export class AnimationsComponent implements OnInit {
  isOpen = true;

  constructor() { }

  ngOnInit(): void {}

  onBtnToggleClicked(){
    this.isOpen = !this.isOpen;
  }

}
