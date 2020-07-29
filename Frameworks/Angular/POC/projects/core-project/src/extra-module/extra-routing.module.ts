import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "users-lib/src/lib/pages/users/users.component";
import {UsersEditComponent} from "users-lib/src/lib/pages/users-edit/users-edit.component";
import {NgModule} from "@angular/core";
import {ExtraComponent} from "./pages/extra/extra.component";

const routes: Routes = [
    {
        path: '', component: ExtraComponent, children: [//route: /home/lazy-module
            // {path: 'clientes', component: UsersComponent,},
            // {path: 'clientes/edit', component: UsersEditComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExtraRoutingModule {
}
