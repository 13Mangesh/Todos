import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
