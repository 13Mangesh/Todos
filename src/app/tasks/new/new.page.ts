import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  minDate: Date = new Date();
  constructor(private router: Router,
              private taskService: TaskService,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.minDate = new Date();
  }

  onSubmit(form: NgForm) {
    console.log("onSubmit");
    const value = form.value;
    if (!value.details) {
      value.details = '';
    }
    const task: Task = new Task(value.name, new Date(value.endDate), value.details);
    this.taskService.addTask(task);
    this.presentToast();
    form.reset();
  }

  onClosePress(form: NgForm) {
    form.reset();
    this.router.navigate(['/', 'tasks', 'task-list']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
    message: 'Task saved successfully!',
    duration: 2000
    });
    toast.present();
  }

}
