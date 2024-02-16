import { GetAllTaskResponse } from 'src/app/modules/interfaces/task/GetAllTaskResponse';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Subject, takeUntil } from 'rxjs';

import { TaskService } from 'src/app/services/task/task.service';
import { PostTaskResponse } from 'src/app/modules/interfaces/task/PostTaskResponse';
import { PutTaskResponse } from '../../interfaces/task/PutTaskResponse';
import { PostTaskCompleteResponse } from '../../interfaces/task/PostTaskCompleteResponse';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnDestroy, OnInit {
  isForm = false;
  isCardView = true;
  isCardViewCompleted = false
  public taskDatas: Array<GetAllTaskResponse> = [];
  public taskDatasCompleted: Array<PutTaskResponse> = [];
  private destroy$ = new Subject<void>();

  constructor(private formBuild: FormBuilder, private taskService: TaskService, private messageService: MessageService){}

  ngOnInit(): void {
    this.showTasks();
    this.getAllTaskComplete();
  }

  update(): void{
    this.getAllTaskComplete();
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
          this.taskDatas = response.filter((x) => x.tarefaId).sort((a, b) => a.tarefaId - b.tarefaId);
        },
        error: (err) => {
          console.log(err)
        }
    })
  }

  public submitForm(): void{
    this.isCardView = true
    if (this.addTask.value && this.addTask.valid) {
      this.taskService.postTask(this.addTask.value as PostTaskResponse).pipe(
        takeUntil(this.destroy$)
      ).subscribe(response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Adicionada',
          detail:`Tarefa ${response.name} adicionada com sucesso !`,
          life: 3000
        })
        if (response) {
          this.showTasks();
          this.isForm = false;
          this.addTask.reset();
        }
      })
    }
  }

  public getAllTaskComplete(){
    this.taskService.getAllTasksComplete().pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.taskDatasCompleted = response
      }
    })
  }

  public completedTask(id: number): void{
    this.showTasks()
    this.taskService.completedTask(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) =>{
        this.deleteTask(id)
        if (this.taskDatas.length == 0) {
          this.isCardView = false
        }
        if (response) {
          this.taskDatasCompleted.push(response);
          this.taskService.completeTaskPost(response as PostTaskCompleteResponse).pipe(
            takeUntil(
              this.destroy$
            )
          ).subscribe()
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
        if (response){
        this.showTasks()
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

  public deleteTaskComplete(tarefaId: number) {
    this.taskService.deleteTaskComplete(tarefaId).pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) =>{
        this.messageService.add({
          severity: 'success',
          summary: 'Removida',
          detail: `Tarefa completa removida !`,
          life: 3000
        })
        if (response) {
          this.getAllTaskComplete();
        }
      }
    })
}

  public mostrarConcluidas(){
    if (this.taskDatasCompleted.length == 0) {
      this.isCardView = false;
      this.update();
    }
    else if(this.taskDatas.length == 0 && this.taskDatasCompleted.length >= 1){
      this.isCardViewCompleted = true;
      this.update();
    }
    else if(this.taskDatas.length > 0 && this.taskDatasCompleted.length > 0){
      this.isCardView = false;
      this.isCardViewCompleted = true
      this.update();
    }
  }

  public mostrarEmAndamento(){
    if (this.taskDatasCompleted.length == 0 && this.isCardView == false) {
      this.isCardView = true;

    }
    else if(this.taskDatas.length == 0 && this.taskDatasCompleted.length > 0){
      this.isCardViewCompleted = false;
    }
    else if(this.taskDatas.length > 0 && this.taskDatasCompleted.length > 0){
      this.isCardView = true;
      this.isCardViewCompleted = false
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
