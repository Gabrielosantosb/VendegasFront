import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";

import { FormBuilder, Validators} from "@angular/forms";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

import {ProgressBarModule} from "primeng/progressbar";
import {CookieService} from "ngx-cookie-service";
import {ToastMessage} from "../../../services/toast-message/toast-message";
import {ClienteEvent} from "../../../../models/interfaces/enums/cliente/ClienteEvent";
import {environments} from "../../../../environments/environments";
import {EditPedidoAction, LancarPedidoAction} from "../../../../models/interfaces/pedido/PedidoAction";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './pedido_produto.component.html',
  styleUrls: [],
  providers: [ToastMessage]
})


export class PedidoProdutoFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  isLoading = false
  loadingMode: ProgressBarModule = 'indeterminate';

  public pedidoAction !: { event: EditPedidoAction }
  private readonly USER_AUTH = environments.COOKIES_VALUE.user_auth

  public clienteForm = this.formBuilder.group({

    clienteName: ['', Validators.required],
    email: ['', Validators.required],
    telefone: ['', Validators.required]

  })
  private token = this.cookie.get(this.USER_AUTH)



  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private toastMessage: ToastMessage,
    private cookie: CookieService,

  ) {
  }

  ngOnInit(): void {
    this.pedidoAction = this.ref.data;


  }
  // handleSubmitClienteAction(): void {
  //  this.handleSubmitAddCliente()
  // }
  //
  // handleSubmitAddCliente(): void {
  //   var empresaId  = this.clienteAction?.event?.id
  //   if (this.clienteForm?.value && this.clienteForm?.valid && empresaId) {
  //     const requestCreateForm = this.clienteForm.value as  ClienteRequest
  //     console.log('Adicionar relatório:', requestCreateForm)
  //     this.clienteService.createCliente(empresaId, requestCreateForm).pipe(takeUntil(this.destroy$))
  //       .subscribe({
  //         next: (response) => {
  //           if(response){
  //             this.clienteForm.reset();
  //             this.toastMessage.SuccessMessage('Cliente criado com sucesso!')
  //           }
  //         },
  //         error:(err) =>{
  //           console.log(err)
  //           this.clienteForm.reset();
  //           this.toastMessage.ErrorMessage('Erro ao criar Cliente')
  //         }
  //       })
  //     this.clienteForm.reset();
  //   }
  // }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

