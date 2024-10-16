import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetToDoListResponse } from '../../models/getToDoListResponse';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() toDoFromOtherPage: GetToDoListResponse = {id:1,userId:1,title:'deneme',completed:false};
  @Output() onRemoveClick: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router){}

  onRemove(id:number) {
    this.onRemoveClick.emit(id);
  }

  showDetails(id: number): void {
    this.router.navigate([`/todo-detail/${id}`]);
  }
}
