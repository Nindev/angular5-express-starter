import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: UsersListComponent, pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
