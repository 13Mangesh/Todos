import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  { path: 'task-detail/:id', loadChildren: './task-detail/task-detail.module#TaskDetailPageModule' },
  { path: 'task-list', loadChildren: './task-list/task-list.module#TaskListPageModule' },
  { path: 'new', loadChildren: './new/new.module#NewPageModule' },
  { path: 'edit/:id', loadChildren: './edit/edit.module#EditPageModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TasksRooutingModule {}