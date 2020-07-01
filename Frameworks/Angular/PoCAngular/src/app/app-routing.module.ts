import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Defines} from './codes/defines';
import {LoginComponent} from './components/login/login.component';
import {UsersComponent} from './components/users/users.component';
import {SkillsComponent} from './components/skills/skills.component';
import {ChartComponent} from './components/chart/chart.component';


const routes: Routes = [
  {path: '', redirectTo: Defines.routeLogin, pathMatch: 'full'},
  {path: Defines.routeUsers, component: UsersComponent},
  {path: Defines.routeSkills, component: SkillsComponent},
  {path: Defines.routeChart, component: ChartComponent},
  {path: '**', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
