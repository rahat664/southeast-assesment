import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskPanelComponent} from './components/task-panel/task-panel';

@Component({
  selector: 'app-root',
  imports: [ TaskPanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'southeast-assesment';
}
