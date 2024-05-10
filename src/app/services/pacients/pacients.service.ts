import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environments} from "../../../environments/environments";
import {Observable, tap} from "rxjs";
import {
  AddEmpresaRequest, EditEmpresaRequest,
  GetEmpresaResponse,
  GetPacientsResponse, SendMedicalSpecialityRequest,

} from "../../../models/interfaces/pacients/get-pacient-service.service";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PacientService {
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

  getProfissionalPacients(): Observable<Array<GetPacientsResponse>> {
    return this.http.get<Array<GetPacientsResponse>>(
      `${this.API_URL}/api/Pacient/get-profissional-pacient`,
      this.httpOptions
    )
  }

  getPacientById(pacientId: number): Observable<GetPacientsResponse> {
    return this.http.get<GetPacientsResponse>(
      `${this.API_URL}/api/Pacient/get-pacient/${pacientId}`
    );
  }

  sendMedicalSpeciality(pacientId: number, medicalSpeciality: string): Observable<SendMedicalSpecialityRequest> {
    const body = { medicalSpeciality };
    return this.http.post<SendMedicalSpecialityRequest>(
      `${this.API_URL}/api/Pacient/pacient-medical-speciality/${pacientId}`,
      body,
      this.httpOptions
    );
  }

  createEmpresa(userId: 1, requestData : AddEmpresaRequest): Observable<Array<GetEmpresaResponse>> {
      console.log('Request:', requestData)
    return this.http.post<Array<GetEmpresaResponse>>(
      `${this.API_URL}/api/Empresa/create-empresa/${userId}`,
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


  deletePacient(requestData: { pacient_id: number }): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/api/Pacient/remove-pacient/${requestData.pacient_id}`,
      this.httpOptions
    );
  }

  countAllPacients () : Observable<number>
  {
    return this.http.get<number>(`${this.API_URL}/api/Pacient/count-pacients`,
      this.httpOptions)
  }
  countProfissionalPacients () : Observable<number>
  {
    return this.http.get<number>(`${this.API_URL}/api/Pacient/count-profissional`,
      this.httpOptions)
  }
}
