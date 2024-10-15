import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todoList: string[] = [];
  todoInput: string = '';

  isTodoExists(todo : string): boolean{
    return this.todoList.includes(todo)
  }

  deleteTodo(index : number): void{
    this.todoList.splice(index,1);
  }

  addTodo(): void {
    if (this.isTodoExists(this.todoInput)) {
      alert('This todo is already in the list!');
    } else {
      this.todoList.push(this.todoInput);
    }
    this.todoInput = "";
  }

}
