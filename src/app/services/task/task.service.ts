import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/app/environments/environments';
import { GetAllTaskResponse } from 'src/app/modules/interfaces/task/GetAllTaskResponse';
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

  deleteTask(id: number): Observable<GetAllTaskResponse>{
    return this.httpClient.delete<GetAllTaskResponse>(`${this.API_URL}/${id}`);
  }
}
