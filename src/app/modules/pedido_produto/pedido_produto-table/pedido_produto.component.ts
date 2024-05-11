import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetClienteResponse} from "../../../../models/interfaces/reports/response/GetAllProductsResponse";
import {EventAction} from "../../../../models/interfaces/reports/event/EventAction";
import {EditPedidoAction, LancarPedidoAction} from "../../../../models/interfaces/pedido/PedidoAction";
import {DeleteReportAction} from "../../../../models/interfaces/reports/event/DeleteProductAction";
import {PedidoEvent} from "../../../../models/interfaces/enums/pedido/PedidoEvent";
import {ReportsService} from "../../../services/reports/reports.service";
import {PedidoResponse} from "../../../../models/interfaces/pedido/PedidoResponse";
import {FormBuilder, Validators} from "@angular/forms";



@Component({
  selector: 'app-pedido-table',
  templateUrl: './pedido_produto.component.html',
  styleUrls: ['report-table.scss']
})
export class PedidoTableComponent implements OnInit{
  @Input() pedidos: Array<PedidoResponse> = [];
  @Output() clienteEvent = new EventEmitter<EventAction>()
  @Output() pedidoEvent = new EventEmitter<EditPedidoAction>()
  @Output() lancarPedidoEvent = new EventEmitter<LancarPedidoAction>()
  @Output() deleteClienteEvent = new EventEmitter<DeleteReportAction>()

  public lancarPedidoForm = this.formBuilder.group({

    quantidade: [0, Validators.required],
    produto: [0, Validators.required],


  })


  public addPedidoAction = PedidoEvent.ADD_PEDIDO_EVENT
  showProfissionalReports = false
  public selectedPedido!: GetClienteResponse;
  displayModal: boolean = false;

  constructor(private reportService: ReportsService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
        console.log("AQIO A RESPONDE", this.pedidos)
    }



  handleLancarPedido(pedidoId: number){
    console.log(pedidoId)
    if( pedidoId !== null){
      this.lancarPedidoEvent.emit({
        pedidoId,
      })
    }
  }


}
