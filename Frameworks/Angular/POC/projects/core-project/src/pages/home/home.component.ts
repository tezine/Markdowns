import { Component, OnInit } from '@angular/core';
import {Defines} from '../../codes/defines';
import {ActivatedRoute, Router} from '@angular/router';
import {EMenuItem} from '../../entities/EMenuItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menuItems:EMenuItem[]=[];

  constructor(protected router: Router, private route: ActivatedRoute) {
    this.menuItems.push(<EMenuItem>{title:'Dashboard',route:'dashboard',iconName:'dashboard'});
    this.menuItems.push(<EMenuItem>{title:'Animations',route:'animations',iconName:'home'});
    this.menuItems.push(<EMenuItem>{title:'Input/Output',route:'input-output',iconName:'home'});
    this.menuItems.push(<EMenuItem>{title:'Forms',route:'forms',iconName:'home'});
    this.menuItems.push(<EMenuItem>{title:'Users',route:'users',iconName:'home'});
    this.menuItems.push(<EMenuItem>{title:'Translations',route:'translations',iconName:'home'});
    this.menuItems.push(<EMenuItem>{title:'ViewChild/ContentChild',route:'viewchild-contentchild',iconName:'home'});
    this.menuItems.push(<EMenuItem>{title:'Lazy component',route:'lazy-component',iconName:'home'});
    this.menuItems.push(<EMenuItem>{title:'About',route:'about',iconName:'home'});
  }

  ngOnInit(): void {
  }

  async onMenuItemClicked(eMenuItem:EMenuItem){
    // if(eMenuItem.route=='home')await this.router.navigate([eMenuItem.route]);//do not prepend /home into the route
    await this.router.navigate([eMenuItem.route],{relativeTo: this.route});
  }
}
