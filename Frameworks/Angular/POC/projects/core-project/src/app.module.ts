import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './pages/app/app.component';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule} from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
//import {BASE_PATH} from '../../cadastros-api';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {AboutComponent} from './pages/about/about.component';
import {FormsComponent} from './pages/forms/forms.component';
import {AnimationsComponent} from './pages/animations/animations.component';
import { InputOutputComponent } from './pages/input-output/input-output.component';
import { ViewChildContentChildComponent } from './pages/view-child-content-child/view-child-content-child.component';
import { LazyComponentComponent } from './pages/lazy-component/lazy-component.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { VHelloComponent } from './components/vhello/vhello.component';
import { VLazyComponent } from './components/vlazy/vlazy.component';
import { TranslationsComponent } from './pages/translations/translations.component';
import { VInputComponent } from './components/vinput/vinput.component';

export function getBasePath(): string {
    //if(!GlobalsService.isDevMode())return Constants.boschServerURL
    return 'http://localhost:5000';
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        AboutComponent,
        FormsComponent,
        InputOutputComponent,
        AnimationsComponent,
        InputOutputComponent,
        ViewChildContentChildComponent,
        LazyComponentComponent,
        DashboardComponent,
        VHelloComponent,
        VLazyComponent,
        TranslationsComponent,
        VInputComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        HttpClientModule,
        MatIconModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatListModule,
        MatTabsModule,
        MatToolbarModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        // [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
        // [{ provide: DEFAULT_TIMEOUT, useValue: 90000 }]
        //{provide: BASE_PATH, useValue: getBasePath()}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
