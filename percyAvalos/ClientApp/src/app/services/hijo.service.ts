import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HijoService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:14509/api/hijo";
  }

  getHijoByPersonal(IdPersonal): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/byPersonal/${IdPersonal}`).pipe(
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

  addHijo(payload): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, payload).pipe(
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }

  deleteHijo(IdDerhab): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${IdDerhab}`).pipe(
      catchError((error) => {
        return throwError(error.error);
      })
    );
  }
}
