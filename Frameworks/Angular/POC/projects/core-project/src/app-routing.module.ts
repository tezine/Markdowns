import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Defines} from './codes/defines';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {FormsComponent} from './pages/forms/forms.component';
import {AnimationsComponent} from './pages/animations/animations.component';
import {InputOutputComponent} from './pages/input-output/input-output.component';
import {ViewChildContentChildComponent} from './pages/view-child-content-child/view-child-content-child.component';
import {LazyComponentComponent} from './pages/lazy-component/lazy-component.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {TranslationsComponent} from './pages/translations/translations.component';


const routes: Routes = [
   {path: '', redirectTo: Defines.routeLogin, pathMatch: 'full'},
  {path: Defines.routeLogin, component: LoginComponent},
  {path: 'home', component: HomeComponent, children:[
          {path: 'dashboard', component: DashboardComponent},
          {path: 'forms', component: FormsComponent},
          {path: 'animations', component: AnimationsComponent},
          {path: 'input-output', component: InputOutputComponent},
          {path: 'viewchild-contentchild', component: ViewChildContentChildComponent},
          {path: 'lazy-component', component: LazyComponentComponent},
          {path: 'translations', component: TranslationsComponent},
          {path: 'about', component: AboutComponent},
           {path: 'users', loadChildren:  async () => (await import('../../users-lib/src/lib/users.module')).UsersModule,},
          // {
          //     path: 'users',
          //     loadChildren: './codes/lazy-wrapper.module#UsersLibWrapperModule'
          // },
          // {
          //     path: 'users',
          //      loadChildren: () => import('@users-lib').then(m => m.UsersModule)
          // },
       //{path: 'cadastros', loadChildren: () => import('../../users-lib/src/lib/cadastros.module').then(m => m.UsersModule)},
          //{path: Defines.routeCadastros, loadChildren: () => import('../../../dist/bjdweb-core/cadastros-src-lib-cadastros-module-es5.js').then(m =>{console.log('carregou'); console.log(m);  /*m.UsersModule*/})},
    ]
  },

  // {path: '**', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
