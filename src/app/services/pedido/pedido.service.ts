import { Injectable } from '@angular/core';
import {environments} from "../../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {ProdutoResponse} from "../../../models/interfaces/produto/response/ProdutoResponse";
import {ProdutoRequest} from "../../../models/interfaces/produto/request/ProdutoRequest";
import {PedidoResponse} from "../../../models/interfaces/pedido/PedidoResponse";
import {PedidoRequest} from "../../../models/interfaces/pedido/PedidoRequest";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

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

  getAllPedidoss(): Observable<Array<PedidoResponse>> {
    return this.http.get<Array<PedidoResponse>>(
      `${this.API_URL}/api/Pedido/get-all-pedidos`,
      this.httpOptions
    )
  }

  createPedido(empresaId: number, observacao: string, cliente: string): Observable<Array<PedidoResponse>> {
    var requestData = {empresaId, observacao, cliente}
    console.log('Request:', requestData)
    return this.http.post<Array<PedidoResponse>>(
      `${this.API_URL}/api/Pedido/create-pedido/${requestData.empresaId}`,
      requestData,
      this.httpOptions
    );
  }

  lancarPedido(pedidoId: number, produtoId: number, quantidade: number){
    var requestData = {quantidade}
    console.log('Request:', requestData)
    return this.http.post(
      `${this.API_URL}/api/PedidoProduto/create-produto-pedido/${pedidoId}/${produtoId}`,
      requestData,
      this.httpOptions
    )

  }
  verificarPedidoExistente(pedidoId: number): Observable<boolean> {
    const requestData = { pedidoId };
    return this.http.post<boolean>(
      `${this.API_URL}/api/Pedido/create-pedido/${requestData.pedidoId}`,
      requestData,
      this.httpOptions
    );
  }




}

