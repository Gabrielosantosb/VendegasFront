import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environments} from "../../../environments/environments";
import {map, Observable, tap} from "rxjs";
import {
  GetClienteResponse, ClienteRequest
} from "../../../models/interfaces/reports/response/GetAllProductsResponse";
import {DeleteProductResponse} from "../../../models/interfaces/reports/response/DeleteProductResponse";
import {FormGroup} from "@angular/forms";

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


  getAllReports(): Observable<Array<GetClienteResponse>> {
    return this.http.get<Array<GetClienteResponse>>(`${this.API_URL}/api/Report/get-reports`, this.httpOptions)
  }

  // getReportByPacientId(pacientId: number, reportForm: FormGroup): Observable<GetClienteResponse> {
  //   return this.http.get<GetClienteResponse>(`${this.API_URL}/api/Report/get-pacient-report/${pacientId}`, this.httpOptions).pipe(
  //     tap((reportData: GetClienteResponse) =>{
  //         reportForm.patchValue({
  //           medicalHistory: reportData.medicalHistory || '',
  //           currentMedications: reportData.currentMedications || '',
  //           cardiovascularIssues: reportData.cardiovascularIssues || false,
  //           diabetes: reportData.diabetes || false,
  //           familyHistoryCardiovascularIssues: reportData.familyHistoryCardiovascularIssues || false,
  //           familyHistoryDiabetes: reportData.familyHistoryDiabetes || false,
  //           physicalActivity: reportData.physicalActivity || '',
  //           smoker: reportData.smoker || false,
  //           alcoholConsumption: reportData.alcoholConsumption || 0,
  //           emergencyContactName: reportData.emergencyContactName || '',
  //           emergencyContactPhone: reportData.emergencyContactPhone || '',
  //           observations: reportData.observations || ''
  //         })
  //     })
  //   )
  // }

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
