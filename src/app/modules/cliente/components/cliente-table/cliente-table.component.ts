import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  GetAllProductsResponse,
  GetClienteResponse
} from "../../../../../models/interfaces/reports/response/GetAllProductsResponse";
import {EventAction} from "../../../../../models/interfaces/reports/event/EventAction";
import {
  DeleteReportAction
} from "../../../../../models/interfaces/reports/event/DeleteProductAction";
import {ReportsService} from "../../../../services/reports/reports.service";
import {EditPedidoAction} from "../../../../../models/interfaces/pedido/PedidoAction";
import {ClienteEvent} from "../../../../../models/interfaces/enums/cliente/ClienteEvent";
import {ProdutoEvent} from "../../../../../models/interfaces/enums/produto/ProdutoEvent";
import {PedidoEvent} from "../../../../../models/interfaces/enums/pedido/PedidoEvent";


@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['report-table.scss']
})
export class ClienteTableComponent {
  @Input() clientes: Array<GetClienteResponse> = [];
  @Output() clienteEvent = new EventEmitter<EventAction>()
  @Output() pedidoEvent = new EventEmitter<EditPedidoAction>()
  @Output() deleteClienteEvent = new EventEmitter<DeleteReportAction>()




  public addPedidoAction = PedidoEvent.ADD_PEDIDO_EVENT
  showProfissionalReports = false
  public selectedCliente!: GetClienteResponse;
  displayModal: boolean = false;

  constructor(private reportService: ReportsService) {
  }


  handleShowAllReports(): void {
    this.reportService.getAllClientes().subscribe({
      next: (allReportData) => {
        this.showProfissionalReports = false
        this.clientes = allReportData;
      },
      error: (error) => {
        console.error('Erro ao obter fichas do usuário:', error);
      }
    });
  }



  openReportDetails(report: GetClienteResponse) {
    this.selectedCliente = report;
    this.displayModal = true;
  }

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

  handleDeleteCliente(reportId: number, pacientName: string): void {
    if(reportId !== null && pacientName !== "")
    {
      this.deleteClienteEvent.emit({
        reportId,
        pacientName,
      })
    }
  }

}
