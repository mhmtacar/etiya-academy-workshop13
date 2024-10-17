import { RouterModule, Routes } from '@angular/router';
import { TodoDetailComponent } from './shared/components/todo-detail/todo-detail.component';
import { NgModule } from '@angular/core';
import { TodoListComponent } from './shared/components/todo-list/todo-list.component';

export const routes: Routes = [
  { path: '', component: TodoListComponent},
  {path : 'todo-list', component: TodoListComponent},
  { path: 'todo-detail/:id', component: TodoDetailComponent}
  //{path:'/login',component:LoginComponent}
];

