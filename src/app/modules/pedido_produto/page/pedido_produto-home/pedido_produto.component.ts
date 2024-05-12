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
import {EditPedidoAction, LancarPedidoAction} from "../../../../../models/interfaces/pedido/PedidoAction";
import {PedidoFormComponent} from "../../../pedido/pedido-form/pedido-form.component";
import {PedidoService} from "../../../../services/pedido/pedido.service";
import {PedidoResponse} from "../../../../../models/interfaces/pedido/PedidoResponse";


@Component({
  selector: 'app-cliente-home',
  templateUrl: './pedido_produto.component.html',
  styleUrls: [],
  providers: [ToastMessage, ConfirmationModal]
})
export class PedidoProdutoComponent implements OnDestroy, OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public pedidosData : Array<PedidoResponse> = []
  isLoading = false

  constructor(
    private reportService: ReportsService,
    private pedidoService: PedidoService,
    private dialogService: DialogService,
    private toastMessage: ToastMessage,
    private confirmationModal: ConfirmationModal
  ) {
  }

  ngOnInit(): void {
    this.getAllPedidos();
  }



  getAllPedidos(){
    this.isLoading = true
    this.pedidoService
      .getAllPedidoss()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) =>{
          if(response){
            this.pedidosData = response
            this.isLoading = false
            console.log(this.pedidosData)
          }
        },
        error:(err:Error) =>{
          console.log(err)
          this.toastMessage.ErrorMessage("Erro ao buscar pedidos")
        }
      })
  }


  handlePedidoAction(event :LancarPedidoAction): void{
    console.log('Evento bateu' , event)
    if (event) {
      this.ref = this.dialogService.open(PedidoFormComponent, {
        header: 'Lançar pedido',
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event:{
            pedidoId : event.pedidoId,

          }
        },
      });

      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAllPedidos(),
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
              this.getAllPedidos()
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

