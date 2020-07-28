import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Defines} from './codes/Defines';
import {UsersEditComponent} from './pages/users-edit/users-edit.component';
import {UsersComponent} from './pages/users/users.component';

const routes: Routes = [
    {
        path: '', component: UsersComponent, children: [//route: /home/users
            // {path: 'clientes', component: UsersComponent,},
            {path: 'clientes/edit', component: UsersEditComponent},//nao pode ser child root, pq não tem router-outlet no UsersComponent
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
