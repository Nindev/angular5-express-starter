import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UsersService } from '../users.service';
import { User } from '../users.model';
import { SelectionModel } from '@angular/cdk/collections';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<User>();
  displayedColumns = ['select', 'email', 'name', 'sysAdmin', 'admin'];
  selection = new SelectionModel<User>(true, []);

  constructor(
    private users: UsersService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getUsers();
  }

  private getUsers() {
    this.selection.clear();
    this.users.find().subscribe(users => this.dataSource.data = users);
  }

  removeSelected() {
    const obs = [];
    this.selection.selected.forEach(user => {
      if (!user.sysAdmin) {
        obs.push(this.users.remove(user));
      }
    });

    combineLatest(obs).subscribe(() => {
      this.getUsers();
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.filter(u => !u.sysAdmin).length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(user => {
        if (!user.sysAdmin) {
          this.selection.select(user);
        }
      });
  }
}
