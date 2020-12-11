import { Injectable } from '@angular/core';
import { Worker } from '../models/Worker';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private conn: HttpClient) { }

  private API = 'http://100.25.182.40/api/v1';

  GET(): Observable<Worker[]> {
    return this.conn.get<Worker[]>('http://100.25.182.40/api/v1/Workers/');
  }

  POST(worker:Worker): Observable<Worker> {
    return this.conn.post<Worker>('http://100.25.182.40/api/v1/Workers/',worker);
  }

  PUT(worker:Worker,id): Observable<Worker>{
    return this.conn.put<Worker>(`${this.API}/Workers/${id}/`,worker);
  }

  DELETE(id): Observable<{}>{
    return this.conn.delete(`http://100.25.182.40/api/v1/Workers/${id}/`);
  }

}
