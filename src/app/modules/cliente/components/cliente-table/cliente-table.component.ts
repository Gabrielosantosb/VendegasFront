import {Component, EventEmitter, Input, Output} from '@angular/core';


import {ReportsService} from "../../../../services/reports/reports.service";
import {EditPedidoAction} from "../../../../../models/interfaces/pedido/PedidoAction";
import {ClienteEvent} from "../../../../../models/interfaces/enums/cliente/ClienteEvent";
import {ProdutoEvent} from "../../../../../models/interfaces/enums/produto/ProdutoEvent";
import {PedidoEvent} from "../../../../../models/interfaces/enums/pedido/PedidoEvent";
import {EditClienteAction} from "../../../../../models/interfaces/cliente/EditClienteAction";
import {GetClienteResponse} from "../../../../../models/interfaces/cliente/response/Cliente";


@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['report-table.scss']
})
export class ClienteTableComponent {
  @Input() clientes: Array<GetClienteResponse> = [];
  @Output() clienteEvent = new EventEmitter<EditClienteAction>()
  @Output() pedidoEvent = new EventEmitter<EditPedidoAction>()





  public addPedidoAction = PedidoEvent.ADD_PEDIDO_EVENT
  public selectedCliente!: GetClienteResponse;


  handleAddPedido(action:string ,empresaId: number, clienteId: number, clienteNome: string){
    if(empresaId !==null && clienteId !== null){
      console.log(action, empresaId, clienteId, clienteNome)
      this.pedidoEvent.emit({
        action,
        clienteId,
        empresaId,
        clienteNome,
      })
    }
  }

  handleEditCliente(action:string ,id: number,): void {
    if(id !== null && action !== "")
    {
      this.clienteEvent.emit({
        action,
        id,
      })
    }
  }

}
