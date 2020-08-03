import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  task: Task;
  index: number;
  minDate: Date = new Date();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navCtrl: NavController,
              private taskService: TaskService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.minDate = new Date();
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('id')) {
        this.navCtrl.navigateBack('/tasks/task-list');
        return;
      }
      this.index = +paramMap.get('id');
      this.task = this.taskService.getTask(+paramMap.get('id'));
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    if (!value.details) {
      value.details = '';
    }
    console.log(this.task.title);
    this.task.date = value['endDate'];
    this.taskService.updateTask(this.index, this.task);
    form.reset();
    this.presentToast();
    this.router.navigate(['/', 'tasks', 'task-list']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
    message: 'Task edited successfully!',
    duration: 2000
    });
    toast.present();
  }

}
