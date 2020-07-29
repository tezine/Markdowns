//region imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Defines} from './core-module/codes/defines';
import {LoginComponent} from './core-module/pages/login/login.component';
import {HomeComponent} from './core-module/pages/home/home.component';
import {FormsComponent} from './core-module/pages/forms/forms.component';
import {AnimationsComponent} from './core-module/pages/animations/animations.component';
import {InputOutputComponent} from './core-module/pages/input-output/input-output.component';
import {ViewChildContentChildComponent} from './core-module/pages/view-child-content-child/view-child-content-child.component';
import {LazyComponentComponent} from './core-module/pages/lazy-component/lazy-component.component';
import {DashboardComponent} from './core-module/pages/dashboard/dashboard.component';
import {TranslationsComponent} from './core-module/pages/translations/translations.component';
import {StylesComponent} from './core-module/pages/styles/styles.component';
import {HooksComponent} from './core-module/pages/hooks/hooks.component';
import {ServicesComponent} from './core-module/pages/services/services.component';
import {DirectivesComponent} from './core-module/pages/directives/directives.component';
import {PipesComponent} from './core-module/pages/pipes/pipes.component';
//endregion


const routes: Routes = [
   {path: '', redirectTo: Defines.routeLogin, pathMatch: 'full'},
  {path: Defines.routeLogin, component: LoginComponent},
  {path: 'home', component: HomeComponent, children:[
          {path: 'dashboard', component: DashboardComponent},
          {path: 'forms', component: FormsComponent},
          {path: 'animations', component: AnimationsComponent},
          {path: 'hooks', component: HooksComponent},
          {path: 'input-output', component: InputOutputComponent},
          {path: 'viewchild-contentchild', component: ViewChildContentChildComponent},
          {path: 'lazy-component', component: LazyComponentComponent},
          {path: 'translations', component: TranslationsComponent},
          {path: 'services', component: ServicesComponent},
          {path: 'pipes', component: PipesComponent},
          {path: 'directives', component: DirectivesComponent},
          {path: 'styles', component: StylesComponent},
          {path: 'lazy-module', loadChildren:  async () => (await import('../src/extra-module/extra.module')).ExtraModule},
          {path: 'users', loadChildren: () => import('@myLib').then(m => m.UsersModule)},
    ]
  },

  // {path: '**', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
