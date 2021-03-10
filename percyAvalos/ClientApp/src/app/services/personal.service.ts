import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PersonalService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:4300/api/personal";
  }

  getAllPersonal(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`).pipe(
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

  addPersonal(payload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, payload).pipe(
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

  getPersonalByFilter(payload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/filter`, payload).pipe(
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

  updatePersonal(id: string, payload): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, payload).pipe(
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }
}
