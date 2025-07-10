import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import {Task} from '../../models/task.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskFormComponent {
  @Input() editingTask?: Task;
  @Output() submitTask = new EventEmitter<Task>();
  today: string = new Date().toISOString().split('T')[0];

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      priority: ['Low'],
      status: ['To Do'],
      dueDate: ['', [Validators.required, this.futureDateValidator]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingTask'] && this.editingTask) {
      this.taskForm.patchValue({
        ...this.editingTask,
        dueDate: this.editingTask.dueDate.slice(0, 10),
      });
    } else {
      this.resetForm();
    }
  }

  get title() {
    return this.taskForm.get('title')!;
  }

  get description() {
    return this.taskForm.get('description')!;
  }

  get dueDate() {
    return this.taskForm.get('dueDate')!;
  }

  onSubmit() {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.value;

    const newTask: Task = {
      ...formValue,
      id: this.editingTask?.id || uuidv4(),
      createdAt: this.editingTask?.createdAt || new Date().toISOString(),
      dueDate: new Date(formValue.dueDate).toISOString(),
    };

    this.submitTask.emit(newTask);
    this.resetForm();
  }

  resetForm() {
    this.editingTask = undefined;
    this.taskForm.reset({
      title: '',
      description: '',
      priority: 'Low',
      status: 'To Do',
      dueDate: '',
    });
  }

  futureDateValidator(control: any) {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate > today ? null : { pastDate: true };
  }
}
