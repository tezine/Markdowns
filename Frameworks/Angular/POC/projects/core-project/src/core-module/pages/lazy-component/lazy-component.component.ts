import {Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {VLazyComponent} from '../../components/vlazy/vlazy.component';

@Component({
  selector: 'app-lazy-component',
  templateUrl: './lazy-component.component.html',
  styleUrls: ['./lazy-component.component.scss']
})
export class LazyComponentComponent implements OnInit {

  @ViewChild('anchor', { read: ViewContainerRef }) anchor?: ViewContainerRef;
  lazy2?: Promise<Type<VLazyComponent>>;

  constructor(private factoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  async onBtnLoadClicked(){
    const{VLazyComponent} = await import( '../../components/vlazy/vlazy.component');
    const factory = this.factoryResolver.resolveComponentFactory(VLazyComponent);
    if(this.anchor) this.anchor.createComponent(factory);
  }

  async onBtnLoad2Clicked(){
    if (!this.lazy2) {
      console.log('lazy 2')
      // this.lazy2 =  () => (import('../../components/vlazy/vlazy.component')).VLazyComponent;
       this.lazy2 = import('../../components/vlazy/vlazy.component').then(({ VLazyComponent }) => VLazyComponent);
    }
  }

}
