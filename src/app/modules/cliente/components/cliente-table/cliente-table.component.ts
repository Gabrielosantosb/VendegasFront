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


@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['report-table.scss']
})
export class ClienteTableComponent {
  @Input() clientes: Array<GetClienteResponse> = [];
  @Output() clienteEvent = new EventEmitter<EventAction>()
  @Output() deleteClienteEvent = new EventEmitter<DeleteReportAction>()

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

  handleReportEvent(action: string, id?: number): void {
    if (action && action !== '') this.clienteEvent.emit({action, id})
  }

  openReportDetails(report: GetClienteResponse) {
    this.selectedCliente = report;
    this.displayModal = true;
  }

  handleAddPedido(empresaId: number, clienteId: number, clienteName: string){
    if(empresaId !==null && clienteId !== null){
      console.log(empresaId, clienteId, clienteName)
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
