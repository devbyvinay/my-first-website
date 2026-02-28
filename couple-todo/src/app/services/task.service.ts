import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  // Initialize with saved tasks from localStorage if they exist
  private tasks = new BehaviorSubject<any[]>(this.loadTasks());
  tasks$ = this.tasks.asObservable();
  private tasksUpdated = new BehaviorSubject<boolean>(false);
  tasksUpdated$ = this.tasksUpdated.asObservable();
  private calendarRefresh = new BehaviorSubject<void>(undefined);
  calendarRefresh$ = this.calendarRefresh.asObservable();
  private selectedDate = new BehaviorSubject<string>('');
  selectedDate$ = this.selectedDate.asObservable();

  // Load tasks from LocalStorage
  private loadTasks(): any[] {
    const saved = localStorage.getItem('couple-tasks');
    return saved ? JSON.parse(saved) : [];
  }

  private triggerRefresh() {
    this.calendarRefresh.next();
  }

  getTasksSnapshot(): any[] {
    return this.tasks.value;
  }

  // Save tasks to LocalStorage
  private saveTasks(tasks: any[]) {
    localStorage.setItem('couple-tasks', JSON.stringify(tasks));
  }

  addTask(task: any) {
    const newTasks = [...this.tasks.value, task];
    this.tasks.next(newTasks);
    this.saveTasks(newTasks);
    this.notifyChanges(); // Add this!
  }

  removeTask(id: number) {
    const newTasks = this.tasks.value.filter(t => t.id !== id);
    this.tasks.next(newTasks);
    this.saveTasks(newTasks);
    this.notifyChanges(); // Add this!
  }

  setSelectedDate(date: string) {
    this.selectedDate.next(date);
  }

  toggleTaskStatus(id: number) {
    const newTasks = this.tasks.value.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    this.tasks.next(newTasks);
    this.saveTasks(newTasks);
    this.notifyChanges(); // Add this!
  }

  getCategoryColor(category: string): string {
    switch (category) {
      case 'Work': return '#ff6b6b';
      case 'Urgent': return '#e63946';
      default: return '#4ecdc4'; // Personal/Default
    }
  }

  private notifyChanges() {
    this.tasksUpdated.next(true);
  }
}