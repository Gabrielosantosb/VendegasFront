import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {EventAction} from "../../../../models/interfaces/cliente/EventAction";
import {EditPedidoAction, LancarPedidoAction} from "../../../../models/interfaces/pedido/PedidoAction";
import {PedidoEvent} from "../../../../models/interfaces/enums/pedido/PedidoEvent";
import {ReportsService} from "../../../services/reports/reports.service";
import {PedidoResponse} from "../../../../models/interfaces/pedido/PedidoResponse";
import {PedidoService} from "../../../services/pedido/pedido.service";
import {GetClienteResponse} from "../../../../models/interfaces/cliente/response/Cliente";



@Component({
  selector: 'app-pedido-table',
  templateUrl: './pedido_produto.component.html',
  styleUrls: ['report-table.scss']
})
export class PedidoTableComponent implements OnInit{
  @Input() pedidos: Array<PedidoResponse> = [];
  @Output() clienteEvent = new EventEmitter<EventAction>()

  @Output() lancarPedidoEvent = new EventEmitter<LancarPedidoAction>()


  public selectedPedido!: GetClienteResponse;

  constructor(private pedidoService: PedidoService) {
  }

  ngOnInit(): void {
        console.log("AQIO A RESPONDE", this.pedidos)
    }



  handleLancarPedido(pedidoId: number){
    console.log('Emitiu id', pedidoId)
    if( pedidoId !== null){
      this.lancarPedidoEvent.emit({
        pedidoId,
      })
    }
  }






}
