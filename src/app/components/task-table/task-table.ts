import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../models/task.model';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-task-table',
  imports: [
    NgClass,
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './task-table.html',
  styleUrl: './task-table.scss'
})
export class TaskTableComponent {
  @Input() tasks: Task[]  = [] ;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();
}
