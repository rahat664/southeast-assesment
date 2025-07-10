import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class MockTaskService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Initial Mock Task',
      description: 'This is a mock task from the mock API.',
      priority: 'Medium',
      status: 'To Do',
      dueDate: '2025-08-01',
      createdAt: new Date().toISOString()
    }
  ];

  private tasks$ = new BehaviorSubject<Task[]>(this.tasks);

  constructor() {}

  getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable().pipe(delay(300)); // simulate latency
  }

  getTaskById(id: string): Observable<Task | undefined> {
    return this.tasks$.pipe(map(tasks => tasks.find(t => t.id === id)));
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    const newTask: Task = { id: Date.now().toString(), ...task };
    this.tasks = [...this.tasks, newTask]; // ✅ Immutable update
    this.tasks$.next(this.tasks);
    return of(newTask).pipe(delay(200));
  }

  updateTask(id: string, updated: Task): Observable<Task | undefined> {
    this.tasks = this.tasks.map(t => (t.id === id ? { ...updated, id } : t));
    this.tasks$.next(this.tasks);
    return of(this.tasks.find(t => t.id === id)).pipe(delay(200));
  }

  deleteTask(id: string): Observable<boolean> {
    const lengthBefore = this.tasks.length;
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasks$.next(this.tasks);
    return of(this.tasks.length < lengthBefore).pipe(delay(200));
  }
}
