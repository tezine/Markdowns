import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {VHooksComponent} from '../../components/vhooks/vhooks.component';

@Component({
  selector: 'app-hooks',
  templateUrl: './hooks.component.html',
  styleUrls: ['./hooks.component.scss']
})
export class HooksComponent implements  OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
