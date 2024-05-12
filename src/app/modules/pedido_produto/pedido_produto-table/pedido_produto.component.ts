import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventAction} from "../../../../models/interfaces/cliente/EventAction";
import {LancarPedidoAction} from "../../../../models/interfaces/pedido/PedidoAction";
import {PedidoResponse} from "../../../../models/interfaces/pedido/PedidoResponse";
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
