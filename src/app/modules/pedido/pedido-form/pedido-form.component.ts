import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";

import { FormBuilder, Validators} from "@angular/forms";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

import {ProgressBarModule} from "primeng/progressbar";


import {CookieService} from "ngx-cookie-service";
import {ClipboardService} from "ngx-clipboard";
import {ToastMessage} from "../../../services/toast-message/toast-message";
import {PedidoEvent} from "../../../../models/interfaces/enums/pedido/PedidoEvent";
import {EditClienteAction} from "../../../../models/interfaces/reports/event/EditClienteAction";
import {environments} from "../../../../environments/environments";
import {ConfirmationModal} from "../../../services/confirmation/confirmation-service.service";
import {PedidoRequest} from "../../../../models/interfaces/pedido/PedidoResponse";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: [],
  providers: [ToastMessage]
})
export class PedidoFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  isLoading = false
  loadingMode: ProgressBarModule = 'indeterminate';

  public addClienteAction = PedidoEvent.ADD_PEDIDO_EVENT
  public editClientAction = PedidoEvent.EDIT_PEDIDO_EVENT;
  public clienteAction !: { event: EditClienteAction }
  private readonly USER_AUTH = environments.COOKIES_VALUE.user_auth
  reportId = 0;
  pacientId = 0
  public pedidoForm = this.formBuilder.group({
    observacao: ['', Validators.required],
  })
  private token = this.cookie.get(this.USER_AUTH)



  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,


    private confirmationModal: ConfirmationModal,
    private toastMessage: ToastMessage,
    private cookie: CookieService,
    private clipboardService: ClipboardService,
  ) {
  }

  ngOnInit(): void {
    this.clienteAction = this.ref.data;
    if(this.clienteAction.event.id  && this.clienteAction.event.action == this.addClienteAction)
    {
      this.pacientId = this.clienteAction.event.id
    }

    if(this.clienteAction.event.action == this.editClientAction && this.clienteAction.event.id)
    {
      // this.loadReportData(this.clienteAction.event.id)

    }

  }
  handleSubmitReportAction(): void {
    if (this.clienteAction?.event?.action === this.editClientAction) this.handleSubmitEditCliente()
    if (this.clienteAction?.event?.action === this.addClienteAction) this.handleSubmitAddCliente()
  }


  handleSubmitEditCliente(): void {
    if (this.reportId <= 0) {
      console.error('ID do relatório inválido');
      return;
    }
    const requestUpdateForm = this.pedidoForm.value as PedidoRequest;
    console.log('Editar relatório:', requestUpdateForm);

    // this.clienteService.editReport(this.reportId, requestUpdateForm)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: () => {
    //       this.clienteForm.reset();
    //       this.toastMessage.SuccessMessage('Ficha editada com sucesso!');
    //     },
    //     error: (err) => {
    //       console.error(err);
    //       this.clienteForm.reset();
    //       this.toastMessage.ErrorMessage('Erro ao editar ficha');
    //     }
    //   });
  }

  handleSubmitAddCliente(): void {
    var empresaId  = this.clienteAction?.event?.id
    if (this.pedidoForm?.value && this.pedidoForm?.valid && empresaId) {
      const requestCreateForm = this.pedidoForm.value as  PedidoRequest
      console.log('Adicionar relatório:', requestCreateForm)
      // this.clienteService.createCliente(empresaId, requestCreateForm).pipe(takeUntil(this.destroy$))
      //   .subscribe({
      //     next: (response) => {
      //       if(response){
      //         this.clienteForm.reset();
      //         this.toastMessage.SuccessMessage('Cliente criado com sucesso!')
      //       }
      //     },
      //     error:(err) =>{
      //       console.log(err)
      //       this.clienteForm.reset();
      //       this.toastMessage.ErrorMessage('Erro ao criar Cliente')
      //     }
      //   })
      // this.clienteForm.reset();
    }
  }




  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

