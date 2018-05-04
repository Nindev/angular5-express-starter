import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './users.service';
import { AppMaterialModule } from '../app-material.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';
import { UserDetailResolver } from './user-detail-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    AppMaterialModule
  ],
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserDetailComponent
  ],
  providers: [
    UsersService,
    UserDetailResolver
  ]
})
export class UsersModule { }
