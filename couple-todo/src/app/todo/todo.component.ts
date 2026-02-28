import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  // We define the observable here to be used with the 'async' pipe in HTML
  tasks$!: Observable<Todo[]>;
  currentDate: string = '';
  newTask: string = '';
  newPriority: 'High' | 'Medium' | 'Low' = 'Medium'; // Default value
  newCategory: 'Personal' | 'Work' | 'Urgent' = 'Personal';
  searchTerm: string = '';

get filteredTasks() {
  return this.taskService.getTasksSnapshot()
    .filter(t => t.date === this.currentDate && 
                 t.task.toLowerCase().includes(this.searchTerm.toLowerCase()));
}

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    // Connect to the stream from your service
    this.tasks$ = this.taskService.tasks$;

    // Subscribe to date changes so the sidebar knows which date is active
    this.taskService.selectedDate$.subscribe(date => {
      this.currentDate = date;
    });
  }

  calculateProgress(): number {
    // We need to filter tasks for the CURRENT date to calculate percentage
    const tasksForDate = this.taskService.getTasksSnapshot().filter(t => t.date === this.currentDate);
    if (tasksForDate.length === 0) return 0;
    
    const completed = tasksForDate.filter(t => t.completed).length;
    return (completed / tasksForDate.length) * 100;
  }

  addTask() {
    if (this.newTask.trim() && this.currentDate) {
      this.taskService.addTask({
        id: Date.now(),
        task: this.newTask,
        date: this.currentDate,
        completed: false,
        priority: this.newPriority, // Pass the priority!
        category: this.newCategory, // Pass the category
      });
      this.newTask = ''; // Clear input
    }
  }

  filteredTasksByPriority(priority: 'High' | 'Medium' | 'Low') {
    return this.filteredTasks.filter(t => t.priority === priority);
  }

  updateTask(todo: Todo) {
    // We tell the service to update this specific task in the shared list
    this.taskService.toggleTaskStatus(todo.id);
  }

  deleteTodo(id: number) {
    this.taskService.removeTask(id);
  }
}