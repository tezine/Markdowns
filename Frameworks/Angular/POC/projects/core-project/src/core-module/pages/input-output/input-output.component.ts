import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-output',
  templateUrl: './input-output.component.html',
  styleUrls: ['./input-output.component.scss']
})
export class InputOutputComponent implements OnInit {

  nameTxt:string='';
  phoneTxt:string='';

  constructor() { }

  ngOnInit(): void {
  }

  onTxtNameChanged(txt:string){
    this.nameTxt=txt;
  }

}
