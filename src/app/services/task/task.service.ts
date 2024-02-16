import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/app/environments/environments';
import { DeleteTaskComplete } from 'src/app/modules/interfaces/task/DeleteTaskComplete';
import { GetAllTaskCompleteResponse } from 'src/app/modules/interfaces/task/GetAllTaskCompleteResponse';
import { GetAllTaskResponse } from 'src/app/modules/interfaces/task/GetAllTaskResponse';
import { PostTaskCompleteResponse } from 'src/app/modules/interfaces/task/PostTaskCompleteResponse';
import { PostTaskResponse } from 'src/app/modules/interfaces/task/PostTaskResponse';
import { PutTaskResponse } from 'src/app/modules/interfaces/task/PutTaskResponse';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private API_URL = environment.API_URL;

  constructor(private httpClient: HttpClient) { }

  getAllTaks(): Observable<Array<GetAllTaskResponse>> {
    return this.httpClient.get<Array<GetAllTaskResponse>>(this.API_URL);
  }

  postTask(task: PostTaskResponse): Observable<PostTaskResponse>{
    return this.httpClient.post<PostTaskResponse>(this.API_URL, task);
  }

  completedTask(id: number): Observable<PutTaskResponse> {
    return this.httpClient.put<PutTaskResponse>(`${this.API_URL}/complete/${id}`, id);
  }

  getAllTasksComplete(): Observable<Array<PutTaskResponse>>{
    return this.httpClient.get<Array<PutTaskResponse>>(`${this.API_URL}/complete`)
  }

  completeTaskPost(task: PostTaskCompleteResponse): Observable<PostTaskCompleteResponse>{
    return this.httpClient.post<PostTaskCompleteResponse>(`${this.API_URL}/complete`, task);
  }

  deleteTask(id: number): Observable<GetAllTaskResponse>{
    return this.httpClient.delete<GetAllTaskResponse>(`${this.API_URL}/${id}`);
  }

  deleteTaskComplete(id: number):Observable<DeleteTaskComplete> {
    return this.httpClient.delete<DeleteTaskComplete>(`${this.API_URL}/complete/${id}`, )
  }
}
