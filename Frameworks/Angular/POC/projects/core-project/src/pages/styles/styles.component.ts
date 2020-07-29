import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.scss']
})
export class StylesComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {}

  //==================STYLE BINDING BELOW==============
  divBackgroundColor='#00e676';
  divBorderRadius='20px';
  divWidth='400px';
  divHeight='300px';
  divMarginLeft='20px'

  //==================CLASS BINDING BELOW==============
  currentThemeClassName='lightTheme';
  onBtnToggleThemeClicked(){
    if(this.currentThemeClassName=='lightTheme')this.currentThemeClassName='darkTheme';
    else this.currentThemeClassName='lightTheme';
  }
}
