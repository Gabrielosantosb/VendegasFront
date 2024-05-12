import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environments} from "../../../environments/environments";
import {map, Observable, tap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {ClienteRequest, GetClienteResponse} from "../../../models/interfaces/cliente/response/Cliente";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private API_URL = environments.API_URL
  private token = this.cookie.get("USER_INFO")
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient, private cookie: CookieService) {
  }


  createReport(pacientId: number, requestData: ClienteRequest): Observable<Array<GetClienteResponse>> {
    return this.http.post<Array<GetClienteResponse>>(
      `${this.API_URL}/api/Report/create-report/${pacientId}`, requestData, this.httpOptions
    );
  }

  createCliente(empresaId: number, requestData: ClienteRequest): Observable<Array<GetClienteResponse>> {
    return this.http.post<Array<GetClienteResponse>>(
      `${this.API_URL}/api/Cliente/create-client/${empresaId}`,
      requestData,
      this.httpOptions
    );
  }
  getAllClientes(): Observable<Array<GetClienteResponse>> {
    return this.http.get<Array<GetClienteResponse>>(`${this.API_URL}/api/Cliente/get-all-clientes`, this.httpOptions)
  }




  getReportById(reportId: number, reportForm: FormGroup): Observable<GetClienteResponse> {
    return this.http.get<GetClienteResponse>(
      `${this.API_URL}/api/Report/get-report/${reportId}`,
      this.httpOptions
    )
  }
  getReportId(pacientId: number): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/api/Report/get-pacient-report/${pacientId}`, this.httpOptions)
  }


  deleteReport( reportId: number ): Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/api/Report/delete-report/${reportId}`,
      this.httpOptions)

  }



editReport(reportId: number, requestData: ClienteRequest): Observable<void>{
    return this.http.put<void>(`${this.API_URL}/api/Report/update-report/${reportId}`, requestData, this.httpOptions)
}



  countReport () : Observable<number>
  {
    return this.http.get<number>(`${this.API_URL}/api/Report/count-report`,
      this.httpOptions)
  }




}
