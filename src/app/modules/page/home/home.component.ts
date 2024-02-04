import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetAllTaskResponse } from './interfaces/task/GetAllTaskResponse';
import { TaskService } from 'src/app/services/task/task.service';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { PostTaskResponse } from './interfaces/task/PostTaskResponse';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnDestroy, OnInit {
  isForm = false;
  public taskDatas: Array<GetAllTaskResponse> = []
  private destroy$ = new Subject<void>();

  constructor(private formBuild: FormBuilder, private taskService: TaskService, private messageService: MessageService){}

  ngOnInit(): void {
    this.showTasks();
  }


  addFormBuilder = this.formBuild.group({
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
    if (this.addFormBuilder.value && this.addFormBuilder.valid) {
      this.taskService.postTask(this.addFormBuilder.value as PostTaskResponse).pipe(
        takeUntil(this.destroy$)
      ).subscribe(response => {
        if (response) {
          this.showTasks();
          this.isForm = false;
          this.addFormBuilder.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Adicionada ',
            detail: `Tarefa ${response.name} adicionada com sucesso`,
            life: 3000
          })
        }
      })
    }
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
