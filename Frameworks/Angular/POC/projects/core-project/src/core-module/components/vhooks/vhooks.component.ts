import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {LoggerService} from '../../services/logger.service';

@Component({
  selector: 'VHooks',
  templateUrl: './vhooks.component.html',
  styleUrls: ['./vhooks.component.scss']
})
export class VHooksComponent implements OnChanges, OnInit, DoCheck,AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() name: string='';
  outputList:string[]=[];

  constructor(private logger:LoggerService) { }

  ngOnChanges(){
    this.outputList.push('ngOnChanges');
  }

  ngOnInit(): void {
    this.outputList.push('ngOnInit');
  }

  ngDoCheck(){
    this.outputList.push('ngOnChanges');
  }

  ngAfterContentInit(){
    this.outputList.push('ngAfterContentInit');
  }

  ngAfterContentChecked(){
    this.outputList.push('ngAfterContentChecked');
  }

  ngAfterViewInit(){
    this.outputList.push('ngAfterViewInit');
  }

  ngAfterViewChecked(){
    this.outputList.push('ngAfterViewChecked');
  }

  ngOnDestroy(){
    this.outputList.push('ngOnDestroy');
  }
}
