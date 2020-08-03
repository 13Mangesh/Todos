import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  currentSegment = 'tasks';
  tasks: Task[] = [];
  finishedTasks: Task[] = [];
  subscription: Subscription;
  finishedSubscription: Subscription;
  @ViewChild('slidingList') slidingList;

  constructor(private taskService: TaskService,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.currentSegment = 'tasks';
    this.subscription = this.taskService.taskChanged.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
    this.finishedSubscription = this.taskService.finishedTaskChanged.subscribe(
      (finishedTasks: Task[]) => {
        this.finishedTasks = finishedTasks;
      }
    );
    this.tasks = this.taskService.tasks;
    this.finishedTasks = this.taskService.finishedTasks;
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    this.currentSegment = event.detail.value;
  }

  onTaskClick(id: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'tasks', 'task-detail', id]);
  }

  onFabClick() {
    this.slidingList.closeSlidingItems();
    this.router.navigate(['/', 'tasks', 'new']);
  }

  onFinish(index: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.taskService.onFinishTask(index);
  }

  onEdit(i: number, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/','tasks','edit',i]);
  }

  onFinishedDelete(index: number) {
    this.taskService.deleteFinishedTask(index);
  }

}
