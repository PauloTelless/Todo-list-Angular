import { GetAllTaskResponse } from '../../interfaces/task/GetAllTaskResponse';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Subject, takeUntil } from 'rxjs';

import { TaskService } from 'src/app/services/task/task.service';
import { PostTaskResponse } from 'src/app/modules/interfaces/task/PostTaskResponse';
import { PutTaskResponse } from '../../interfaces/task/PutTaskResponse';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnDestroy, OnInit {
  isForm = false;
  isCardView = true;
  public taskDatas: Array<GetAllTaskResponse> = [];
  public taskDatasCompleted: Array<PutTaskResponse> = [];
  private destroy$ = new Subject<void>();

  constructor(private formBuild: FormBuilder, private taskService: TaskService, private messageService: MessageService){}

  ngOnInit(): void {
    this.showTasks();
  }


  addTask = this.formBuild.group({
    name:['', Validators.required],
    discription:['', Validators.required]
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

  public submitForm(): void{
    if (this.addTask.value && this.addTask.valid) {
      this.taskService.postTask(this.addTask.value as PostTaskResponse).pipe(
        takeUntil(this.destroy$)
      ).subscribe(response => {
        if (response) {
          this.showTasks();
          this.isForm = false;
          this.addTask.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso ',
            detail: `Tarefa ${response.name} adicionada com sucesso`,
            life: 3000
          })
        }
      })
    }
  }

  public completedTask(id: number): void{
    this.taskService.completedTask(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) =>{
        if (response) {
          this.taskDatasCompleted.push(response);
          console.log(this.taskDatasCompleted);
          this.messageService.add({
            severity: 'success',
            summary: 'Concluída ',
            detail: `Tarefa ${response.name} concluída !`,
            life: 3000
          })
        }
      }
    })
  }

  public deleteTask(tarefaid: number): void{
    this.taskService.deleteTask(tarefaid).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response)
        this.showTasks()
        {
        this.messageService.add({
          severity: 'success',
          summary: 'Descartada ',
          detail: `Tarefa ${response.name} descartada com sucesso`,
          life: 3000
          })
        }
      },
      error: (err) =>{
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível descartar',
          life: 2500
        })
      }
    })
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
