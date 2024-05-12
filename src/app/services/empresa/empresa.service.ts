import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environments} from "../../../environments/environments";
import {Observable} from "rxjs";
import {
  AddEmpresaRequest, EditEmpresaRequest,
  GetEmpresaResponse,
} from "../../../models/interfaces/empresa/EmpresaModel";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private API_URL = environments.API_URL;
  private readonly USER_AUTH = environments.COOKIES_VALUE.user_auth
  private token = this.cookie.get(this.USER_AUTH)
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    })
  }

  constructor(private http: HttpClient, private cookie: CookieService) {}



  getAllEmpresas(): Observable<Array<GetEmpresaResponse>> {
    return this.http.get<Array<GetEmpresaResponse>>(
      `${this.API_URL}/api/Empresa/get-all-empresas`,
      this.httpOptions
    )
  }


  getEmpresaById(empresaId: number): Observable<GetEmpresaResponse> {
    return this.http.get<GetEmpresaResponse>(
      `${this.API_URL}/api/Empresa/get-empresa/${empresaId}`,
      this.httpOptions
    );
  }



  createEmpresa(requestData : AddEmpresaRequest): Observable<Array<GetEmpresaResponse>> {
      console.log('Request:', requestData)
    var userIDD = 1
    return this.http.post<Array<GetEmpresaResponse>>(
      `${this.API_URL}/api/Empresa/create-empresa`,
      requestData,
      this.httpOptions
    );
  }

  editEmpresa(requestData: EditEmpresaRequest): Observable<void> {
    console.log("AQUI O EDITEMPRESA", requestData)
    return this.http.put<void>(
      `${this.API_URL}/api/Empresa/update-empresa/${requestData.empresaId}`,
      requestData,
      this.httpOptions
    );
  }




}
