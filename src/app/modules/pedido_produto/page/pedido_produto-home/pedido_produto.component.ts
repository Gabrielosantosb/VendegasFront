import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ReportsService} from "../../../../services/reports/reports.service";
import {ReportsDataTransferService} from "../../../../shared/reports/reports-data-transfer.service";
import {Router} from "@angular/router";
import {
  GetAllProductsResponse, GetClienteResponse,
} from "../../../../../models/interfaces/reports/response/GetAllProductsResponse";
import {ConfirmationService} from "primeng/api";
import {EventAction} from "../../../../../models/interfaces/reports/event/EventAction";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ToastMessage} from "../../../../services/toast-message/toast-message";
import {ConfirmationModal} from "../../../../services/confirmation/confirmation-service.service";
import {DeleteReportAction} from "../../../../../models/interfaces/reports/event/DeleteProductAction";
import {ProdutoFormComponent} from "../../../produto/produto-form/produto-form.component";
import {EditPedidoAction} from "../../../../../models/interfaces/pedido/PedidoAction";
import {PedidoFormComponent} from "../../../pedido/pedido-form/pedido-form.component";


@Component({
  selector: 'app-cliente-home',
  templateUrl: './pedido_produto.component.html',
  styleUrls: [],
  providers: [ToastMessage, ConfirmationModal]
})
export class PedidoProdutoComponent implements OnDestroy, OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public clientesData : Array<GetClienteResponse> = []
  isLoading = false

  constructor(
    private reportService: ReportsService,
    private dialogService: DialogService,
    private toastMessage: ToastMessage,
    private confirmationModal: ConfirmationModal
  ) {
  }

  ngOnInit(): void {
    this.getAllClientes();
  }



  getAllClientes(){
    this.isLoading = true
    this.reportService
      .getAllClientes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetClienteResponse[]) =>{
          if(response){
            this.clientesData = response
            this.isLoading = false
          }
        },
        error:(err:Error) =>{
          console.log(err)
          this.toastMessage.ErrorMessage("Erro ao buscar clientes")
        }
      })
  }


  handlePedidoAction(event :EditPedidoAction): void{
    console.log('Evento bateu' , event)
    if (event) {
      this.ref = this.dialogService.open(PedidoFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event:{
            action : event.action,
            empresaId: event.empresaId,
            clienteId: event.clienteId,
            clienteNome: event.clienteNome

          }
        },
      });

      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAllClientes(),
      });
    }
  }

  handleDeleteClienteAction(event: DeleteReportAction): void {
    console.log('ReportId', event?.reportId);
    if (event) {
      this.confirmationModal.confirmDelete(`Confirma a exclusão ?`, () => {
        this.deleteCliente(event?.reportId);
      });
    } else {
      this.toastMessage.ErrorMessage(`Não é possível excluir a ficha.`);

    }
  }
  deleteCliente(reportId: number) {
    console.log(reportId)
    if (reportId) {
      this.reportService
        .deleteReport(reportId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
              this.getAllClientes()
              this.toastMessage.SuccessMessage('Cliente removido com sucesso!')
          },
          error: (err) => {
            console.log(err);
            this.toastMessage.ErrorMessage('Erro ao remover cliente!')
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

