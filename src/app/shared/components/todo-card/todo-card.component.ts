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
  @Input() toDoFromOtherPage!: GetToDoListResponse;
  @Output() onRemoveClick: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router){}

  onRemove() {
    this.onRemoveClick.emit(this.toDoFromOtherPage?.id);
  }

  viewDetails(id:number) {
    if (this.toDoFromOtherPage) {
      this.router.navigate(['/todo-detail', id]);
    }
  }
}
