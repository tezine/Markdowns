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
    this.menuItems.push(<EMenuItem>{title:'Animations',route:'animations',iconName:'speed'});
    this.menuItems.push(<EMenuItem>{title:'Directives',route:'directives',iconName:'wifi'});
    this.menuItems.push(<EMenuItem>{title:'Forms',route:'forms',iconName:'aspect_ratio'});
    this.menuItems.push(<EMenuItem>{title:'Hooks',route:'hooks',iconName:'wifi'});
    this.menuItems.push(<EMenuItem>{title:'Input/Output',route:'input-output',iconName:'repeat'});
    this.menuItems.push(<EMenuItem>{title:'Lazy component',route:'lazy-component',iconName:'redo'});
    this.menuItems.push(<EMenuItem>{title:'Lazy lib',route:'users',iconName:'redo'});
    this.menuItems.push(<EMenuItem>{title:'Lazy module',route:'lazy-module',iconName:'redo'});
    this.menuItems.push(<EMenuItem>{title:'Pipes',route:'pipes',iconName:'wifi'});
    this.menuItems.push(<EMenuItem>{title:'Services',route:'services',iconName:'wifi'});
    this.menuItems.push(<EMenuItem>{title:'Styles',route:'styles',iconName:'border_style'});
    this.menuItems.push(<EMenuItem>{title:'Translations',route:'translations',iconName:'language'});
    this.menuItems.push(<EMenuItem>{title:'ViewChild/ContentChild',route:'viewchild-contentchild',iconName:'picture_in_picture'});
    this.menuItems.push(<EMenuItem>{title:'Logout',route:'/login',iconName:'logout'});
  }

  ngOnInit(): void {
  }

  async onMenuItemClicked(eMenuItem:EMenuItem){
    if(eMenuItem.route.indexOf('/')>=0)await this.router.navigate([eMenuItem.route]);//do not prepend /home into the route
    else await this.router.navigate([eMenuItem.route],{relativeTo: this.route});
  }
}
