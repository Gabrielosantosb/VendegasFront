import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ClienteService} from "../../../../services/clientes/cliente.service";

import {EventAction} from "../../../../../models/interfaces/cliente/EventAction";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ClienteFormComponent} from "../../components/cliente-form/cliente-form.component";
import {ToastMessage} from "../../../../services/toast-message/toast-message";
import {ConfirmationModal} from "../../../../services/confirmation/confirmation-service.service";


import {EditPedidoAction} from "../../../../../models/interfaces/pedido/PedidoAction";
import {PedidoFormComponent} from "../../../pedido/pedido-form/pedido-form.component";
import {GetClienteResponse} from "../../../../../models/interfaces/cliente/response/Cliente";



@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: [],
  providers: [ToastMessage, ConfirmationModal]
})
export class ClienteHomeComponent implements OnDestroy, OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public clientesData : Array<GetClienteResponse> = []
  isLoading = false

  constructor(
    private reportService: ClienteService,
    private dialogService: DialogService,
    private toastMessage: ToastMessage,
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


  handleClienteAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(ClienteFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => console.log('aqui'),
      });
    }
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




  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

