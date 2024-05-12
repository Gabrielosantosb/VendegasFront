import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environments} from "../../../environments/environments";
import {Observable} from "rxjs";
import {ClienteRequest, GetClienteResponse} from "../../../models/interfaces/cliente/response/Cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
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











}
