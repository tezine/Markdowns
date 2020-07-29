import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-view-child-content-child',
  templateUrl: './view-child-content-child.component.html',
  styleUrls: ['./view-child-content-child.component.scss']
})
export class ViewChildContentChildComponent implements OnInit {

  @ViewChild('viewChildDiv') viewChildDiv?: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  onBtnUpateChildClicked(){
    if(this.viewChildDiv) {
      this.viewChildDiv.nativeElement.style["backgroundColor"] = "red";
      //this.renderer.setStyle(this.viewChildDiv,"backgroundColor",'red');
    }
  }

}
