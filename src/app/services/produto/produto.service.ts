import { Injectable } from '@angular/core';
import {environments} from "../../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {ProdutoResponse} from "../../../models/interfaces/produto/response/ProdutoResponse";
import {ProdutoRequest} from "../../../models/interfaces/produto/request/ProdutoRequest";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

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

  getAllProdutos(): Observable<Array<ProdutoResponse>> {
    return this.http.get<Array<ProdutoResponse>>(
      `${this.API_URL}/api/Produto/get-all-produtos`,
      this.httpOptions
    )
  }

  createProduto(empresaId: number, requestData : ProdutoRequest): Observable<Array<ProdutoResponse>> {
    console.log('Request:', requestData)
    return this.http.post<Array<ProdutoResponse>>(
      `${this.API_URL}/api/Produto/create-produto/${empresaId}`,
      requestData,
      this.httpOptions
    );
  }
  deleteProduto(produtoId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.API_URL}/api/Produto/delete-produto/${produtoId}`,
      this.httpOptions
    );
  }








}

