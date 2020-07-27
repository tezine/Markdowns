import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UsersRoutingModule} from './users-routing.module';
import {CommonModule} from '@angular/common';
import {UsersEditComponent} from './components/users-edit/users-edit.component';
import {UsersComponent} from './components/users/users.component';
import {ApiModule, Configuration, ConfigurationParameters} from '../../../users-api';

export function apiConfigFactory(): Configuration {
    const params: ConfigurationParameters = {
        // set configuration parameters here.
    };
    return new Configuration(params);
}

@NgModule({
    declarations: [
        UsersEditComponent,
        UsersComponent
    ],
    imports: [
        ApiModule.forRoot(apiConfigFactory),
        CommonModule,
        UsersRoutingModule
    ],
    bootstrap: [],
    exports: [UsersComponent]
})
export class UsersModule {
}
