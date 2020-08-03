import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task.model';
import { NavController } from '@ionic/angular';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {
  task: Task;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navCtrl: NavController,
              private taskService: TaskService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/tasks/task-list');
        return;
      }
      this.task = this.taskService.getTask(+paramMap.get('id'));
    });
  }

}
