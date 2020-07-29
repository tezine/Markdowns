import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.scss']
})
export class DirectivesComponent implements OnInit {

  condition=false;

  constructor() { }

  ngOnInit(): void {
  }

  onBtnToggleClicked(){
    this.condition=!this.condition;
  }
}
