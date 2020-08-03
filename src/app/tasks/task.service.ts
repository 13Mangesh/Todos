import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public taskChanged = new Subject<Task[]>();
  public finishedTaskChanged = new Subject<Task[]>();

  private _finishedTasks: Task[] = [];
  private _tasks: Task[] = [
    new Task(
      'first task',
      new Date(),
      'some Details'
    ),
    new Task(
      'Second task',
      new Date(),
      'other Details'
    ),
    new Task(
      'third task',
      new Date(),
      'some Details'
    ),
    new Task(
      'fourth task',
      new Date(),
      'other Details'
    ),
    new Task(
      'fifth task',
      new Date(),
      'some Details'
    ),
    new Task(
      'sixth task',
      new Date(),
      'other Details'
    ),
  ];


  constructor() { }

  get tasks() {
    return [...this._tasks];
  }

  get finishedTasks() {
    return [...this._finishedTasks];
  }

  getTask(id: number) {
    return {...this.tasks[id]};
  }

  addTask(task: Task) {
    this._tasks.push(task);
    this.taskChanged.next([...this._tasks]);
  }

  deleteTask(index: number) {
    this._tasks.splice(index, 1);
    this.taskChanged.next([...this._tasks]);
  }

  onFinishTask(index: number) {
    this._finishedTasks.push(this._tasks[index]);
    this.finishedTaskChanged.next([...this._finishedTasks]);
    this.deleteTask(index);
  }

  deleteFinishedTask(index: number) {
    this._finishedTasks.splice(index, 1);
    this.finishedTaskChanged.next([...this._finishedTasks]);
  }

  updateTask(index: number, task: Task) {
    console.log(this._tasks[index]);
    
    const newTask: Task = new Task(task.title, task.date, task.details);
    this._tasks[index] = newTask;
    console.log(this._tasks[index]);
    this.taskChanged.next([...this._tasks]); 
  }
}
