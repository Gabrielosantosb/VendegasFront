import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetClienteResponse} from "../../../../models/interfaces/reports/response/GetAllProductsResponse";
import {EventAction} from "../../../../models/interfaces/reports/event/EventAction";
import {EditPedidoAction, LancarPedidoAction} from "../../../../models/interfaces/pedido/PedidoAction";
import {DeleteReportAction} from "../../../../models/interfaces/reports/event/DeleteProductAction";
import {PedidoEvent} from "../../../../models/interfaces/enums/pedido/PedidoEvent";
import {ReportsService} from "../../../services/reports/reports.service";
import {PedidoResponse} from "../../../../models/interfaces/pedido/PedidoResponse";



@Component({
  selector: 'app-pedido-table',
  templateUrl: './pedido_produto.component.html',
  styleUrls: ['report-table.scss']
})
export class PedidoTableComponent implements OnInit{
  @Input() pedidos: Array<PedidoResponse> = [];
  @Output() clienteEvent = new EventEmitter<EventAction>()
  // @Output() pedidoEvent = new EventEmitter<EditPedidoAction>()
  @Output() lancarPedidoEvent = new EventEmitter<LancarPedidoAction>()
  @Output() deleteClienteEvent = new EventEmitter<DeleteReportAction>()




  public addPedidoAction = PedidoEvent.ADD_PEDIDO_EVENT
  showProfissionalReports = false
  public selectedPedido!: GetClienteResponse;
  displayModal: boolean = false;

  constructor(private reportService: ReportsService) {
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


  // handleAddPedido(action:string ,empresaId: number, clienteId: number, clienteNome: string){
  //   if(empresaId !==null && clienteId !== null){
  //     console.log(action, empresaId, clienteId, clienteNome)
  //     this.pedidoEvent.emit({
  //       action,
  //       clienteId,
  //       empresaId,
  //       clienteNome,
  //     })
  //   }
  // }



}
