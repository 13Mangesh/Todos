import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TasksPage } from './tasks.page';
import { TasksRooutingModule } from './tasks-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksRooutingModule
  ],
  declarations: [TasksPage]
})
export class TasksPageModule {}
