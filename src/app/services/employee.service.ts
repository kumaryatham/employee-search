import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iemployee } from '../interfaces/iemployee';
import { Observable, of } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _endPoint = 'http://localhost:8089/employees'
  constructor(private _http: HttpClient) {
  }

  register(employeeData): Observable<any>{
    console.log(`some mesag ${employeeData.name}`)
    return this._http.post<any>(this._endPoint,employeeData)
    .pipe(timeout(2000),           catchError(e => { return of('Error while fetching data from BE server')}));
  }

  getEmployees(): Observable<Iemployee[]>{
    return this._http.get<Iemployee[]>(this._endPoint)
      .pipe(timeout(2000),
        catchError(e=> {return of(null)}));
  }
 
}
