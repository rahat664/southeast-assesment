import {Component, inject} from '@angular/core';
import {TaskService} from '../../services/task';
import {BehaviorSubject} from 'rxjs';
import {Task} from '../../models/task.model';
import {TaskFormComponent} from '../task-form/task-form';
import {TaskTableComponent} from '../task-table/task-table';
import {AsyncPipe} from '@angular/common';
import {MockTaskService} from '../../services/mock-task';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-panel',
  imports: [
    TaskFormComponent,
    TaskTableComponent,
    FormsModule,
  ],
  templateUrl: './task-panel.html',
  styleUrl: './task-panel.scss'
})
export class TaskPanelComponent {

  tasks$ = new BehaviorSubject<Task[]>([]);
  filteredTasks: Task[] = [];
  editingTask?: Task;

  filter = {
    status: '',
    priority: '',
    search: '',
  };

  constructor(private taskService: MockTaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    console.log('Loading tasks...');
    this.taskService.getTasks().subscribe((tasks) => {
      console.log('Tasks received:', tasks);
      this.tasks$.next(tasks);
      this.applyFilters();
    });
  }

  onTaskSubmit(task: Task) {
    if (this.editingTask) {
      this.taskService.updateTask(task.id, task).subscribe(() => {
        this.editingTask = undefined;
        this.loadTasks();
      });
    } else {
      this.taskService.createTask(task).subscribe(() => this.loadTasks());
    }
  }

  onEdit(task: Task) {
    if (task.status !== 'Completed') this.editingTask = task;
  }

  onDelete(id: string) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  applyFilters() {
    const { status, priority, search } = this.filter;
    const searchLower = search.toLowerCase();

    this.filteredTasks = this.tasks$.value.filter((task) => {
      const matchStatus = !status || task.status === status;
      const matchPriority = !priority || task.priority === priority;
      const matchSearch =
        !search ||
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower);

      return matchStatus && matchPriority && matchSearch;
    });
  }

  exportToCSV() {
    const headers = ['Title', 'Priority', 'Status', 'Due Date'];
    const rows = this.filteredTasks.map((t) => [
      t.title,
      t.priority,
      t.status,
      new Date(t.dueDate).toLocaleDateString(),
    ]);

    const csvContent =
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
