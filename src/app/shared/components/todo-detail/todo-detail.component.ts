import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GetToDoListResponse } from '../../models/getToDoListResponse';
import { GetToDoItemResponse } from '../../models/getToDoItemResponse';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent implements OnInit {
  todoId: number = 1; // Varsayılan bir değer
  selectedToDoItem?: GetToDoItemResponse;  // Yanıtı tutmak için değişken


  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.todoId = +params['id'];
      this.getTodoIdFromRoute();
    });
  }


  getTodoIdFromRoute(){
    this.httpClient
    .get<GetToDoItemResponse>(`https://jsonplaceholder.typicode.com/todos/${this.todoId}`)
    .subscribe({
      next: (response: GetToDoItemResponse) => {
        console.log('Başarılı yanıt:', response);
        this.selectedToDoItem = response; // Gelen veriyi atıyoruz
      },
      error: (err: any) => {
        console.log('HATA', err);
      },
      complete: () => {
        console.log(`ID ${this.todoId} için GET isteği başarılı bir şekilde tamamlandı`);
      },
    });
  }

}
