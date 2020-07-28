import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UsersRoutingModule} from './users-routing.module';
import {CommonModule} from '@angular/common';
import {UsersEditComponent} from './pages/users-edit/users-edit.component';
import {UsersComponent} from './pages/users/users.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// export function apiConfigFactory(): Configuration {
//     const params: ConfigurationParameters = {
//         // set configuration parameters here.
//     };
//     return new Configuration(params);
// }

@NgModule({
    declarations: [
        UsersEditComponent,
        UsersComponent
    ],
    imports: [
        //ApiModule.forRoot(apiConfigFactory),
        CommonModule,
        UsersRoutingModule,
        MatTableModule,
        MatToolbarModule,
        MatProgressBarModule
    ],
    bootstrap: [],
    exports: [UsersComponent]
})
export class UsersModule {
}
