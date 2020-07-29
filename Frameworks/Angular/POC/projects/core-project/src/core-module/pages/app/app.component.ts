import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bjdweb-core';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('pt-br');
    let browserLang=translate.getBrowserCultureLang();
    console.log('browserlang:',browserLang);
    // if(browserLang && browserLang.indexOf('es')>-1){
    //   console.log('changing to spanish...');
    //   translate.use('es');
    // }
  }
}
