import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import{FormGroup} from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import{TodoService} from './todo.service';
import {Todo} from './todo';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
  
})
export class AppComponent {
  todos: Todo[] = []
  form1: FormGroup = new FormGroup({
    descricao : new FormControl('')
  })
  constructor(
    private service: TodoService
  ){}

  ngOnInit(){
    this.listarTodos()
  }

  listarTodos(){
    this.service.listar().subscribe(todoList => {
      console.log(todoList)
      this.todos = todoList
    })
  }

  submit(){
    const todo: Todo = { ...this.form1.value}
    this.service
        .salvar(todo)
        .subscribe(savedTodo => {
          this.todos.push(savedTodo)
          this.form1.reset()
        })
        
  }

  deleteId(todo:Todo){
    this.service.deletar(todo.id).subscribe({
      next: (response) => this.listarTodos()
    })
  }
}
