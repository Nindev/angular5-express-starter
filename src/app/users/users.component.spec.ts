import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});