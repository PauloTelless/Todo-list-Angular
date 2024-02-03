import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetAllTaskResponse } from './interfaces/task/GetAllTaskResponse';
import { TaskService } from 'src/app/services/task/task.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnDestroy, OnInit {
  isForm = false;
  public taskDatas: Array<GetAllTaskResponse> = []
  private destroy$ = new Subject<void>();

  constructor(private formBuild: FormBuilder, private taskService: TaskService){}

  ngOnInit(): void {
    this.showTasks();
  }


  addFormBuilder = this.formBuild.group({
    name:['', Validators.required],
    description:['', Validators.required]
  })

  public showTasks(){
    this.taskService.getAllTaks().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
        next: (response) => {
          this.taskDatas = response;
        },
        error: (err) => {
          console.log(err)
        }
    })
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
