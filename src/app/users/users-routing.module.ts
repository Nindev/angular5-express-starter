import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailResolver } from './user-detail-resolver.service';

const routes: Routes = [
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: UsersListComponent, pathMatch: 'full' },
            { path: 'new', component: UserDetailComponent, pathMatch: 'full' },
            {
                path: ':id',
                component: UserDetailComponent,
                pathMatch: 'full',
                resolve: {
                    user: UserDetailResolver
                }
            }
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
