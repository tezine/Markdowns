import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss']
})
export class PipesComponent implements OnInit {

  file = { name: 'logo.svg', size: 2120109, type: 'image/svg' };

  constructor() { }

  ngOnInit(): void {
  }

}
