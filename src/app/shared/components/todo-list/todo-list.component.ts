import { HttpClient } from '@angular/common/http';
import { TodoCardComponent } from './../todo-card/todo-card.component';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetToDoListResponse } from '../../models/getToDoListResponse';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todoList: string[] = [];
  newTodo: string = '';
  toDoListFromBackend: GetToDoListResponse[] = [];
  toDoItem: GetToDoListResponse  = {} as GetToDoListResponse;
  // Dependency Injection
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchTodos();
  }

  onSubmit() {
    this.toDoItem.id = this.toDoListFromBackend.length + 1;
    this.httpClient
      .post<any>('https://jsonplaceholder.typicode.com/todos', this.toDoItem)
      .subscribe({
        next: (response) => {
          this.toDoListFromBackend.push(this.toDoItem)
          console.log('Başarılı yanıt:', response);
        },
        error: (err: any) => {
          console.log('HATA', err);
        },
        complete: () => {
          console.log('POST isteği başarılı bir şekilde tamamlandı');
        },
      });
  }

  remove(id: number) {
    this.httpClient
    .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .subscribe({
      next: () => {
        console.log(`Todo with id ${id} deleted successfully`);
        // Silinen todo'yu listeden çıkarmak için
        this.toDoListFromBackend = this.toDoListFromBackend.filter(todo => todo.id !== id);
      },
      error: (err: any) => {
        console.log('HATA', err);
      },
      complete: () => {
        console.log('Delete request completed');
      },
    });
  }


  fetchTodos() {
    // Async, Observable, Subscribe
    this.httpClient
      .get<GetToDoListResponse[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (response: GetToDoListResponse[]) => {
          this.toDoListFromBackend = response;
        },
        error: (err: any) => {
          console.log('HATA', err);
        },
        complete: () => {
          console.log('istek başarılı bitti');
        },
      });
    // RxJs observable
  }
}
