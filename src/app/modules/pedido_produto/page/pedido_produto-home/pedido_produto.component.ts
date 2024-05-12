import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ToastMessage} from "../../../../services/toast-message/toast-message";
import {ConfirmationModal} from "../../../../services/confirmation/confirmation-service.service";
import {LancarPedidoAction} from "../../../../../models/interfaces/pedido/PedidoAction";
import {PedidoService} from "../../../../services/pedido/pedido.service";
import {PedidoResponse} from "../../../../../models/interfaces/pedido/PedidoResponse";
import {PedidoProdutoFormComponent} from "../../pedido_produto-form/pedido_produto-form.component";


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
    private pedidoService: PedidoService,
    private dialogService: DialogService,
    private toastMessage: ToastMessage,
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
      this.ref = this.dialogService.open(PedidoProdutoFormComponent, {
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




  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

