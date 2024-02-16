import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importe o HttpClientTestingModule

// Antes de cada teste, configure o TestBed
describe("TaskService", () => {
  let service: TaskService;

  beforeEach(() => {
    // Configurar o TestBed com o HttpClientTestingModule
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Adicione o HttpClientTestingModule aqui
    });
    service = TestBed.inject(TaskService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
