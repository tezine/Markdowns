//region imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Defines} from './codes/defines';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {FormsComponent} from './pages/forms/forms.component';
import {AnimationsComponent} from './pages/animations/animations.component';
import {InputOutputComponent} from './pages/input-output/input-output.component';
import {ViewChildContentChildComponent} from './pages/view-child-content-child/view-child-content-child.component';
import {LazyComponentComponent} from './pages/lazy-component/lazy-component.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {TranslationsComponent} from './pages/translations/translations.component';
import {StylesComponent} from './pages/styles/styles.component';
import {HooksComponent} from './pages/hooks/hooks.component';
import {ServicesComponent} from './pages/services/services.component';
import {DirectivesComponent} from './pages/directives/directives.component';
import {PipesComponent} from './pages/pipes/pipes.component';
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
           // {path: 'users', loadChildren:  async () => (await import('../../users-lib/src/lib/users.module')).UsersModule,},
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
