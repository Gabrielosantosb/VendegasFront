import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";



import {CookieService} from "ngx-cookie-service";

import {ClipboardService} from "ngx-clipboard";
import {ToastMessage} from "../../../services/toast-message/toast-message";
import {ProgressBarModule} from "primeng/progressbar";
import {EditClienteAction} from "../../../../models/interfaces/reports/event/EditClienteAction";
import {environments} from "../../../../environments/environments";
import {FormBuilder, Validators} from "@angular/forms";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

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

  public clienteAction !: { event: EditClienteAction }
  private readonly USER_AUTH = environments.COOKIES_VALUE.user_auth
  reportId = 0;
  public lancarPedidoForm = this.formBuilder.group({

    quantidade: [0, Validators.required],
    produto: ['', Validators.required],


  })
  private token = this.cookie.get(this.USER_AUTH)



  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,

    private toastMessage: ToastMessage,
    private cookie: CookieService,
    private clipboardService: ClipboardService,
  ) {
  }

  ngOnInit(): void {
    this.clienteAction = this.ref.data;



  }
  handleSubmitClienteAction(): void {
    // if (this.clienteAction?.event?.action === this.editClientAction) this.handleSubmitEditCliente()
    // if (this.clienteAction?.event?.action === this.addClienteAction) this.handleSubmitAddCliente()
  }


  handleSubmitEditCliente(): void {
    if (this.reportId <= 0) {
      console.error('ID do relatório inválido');
      return;
    }
    // const requestUpdateForm = this.clienteForm.value as ClienteRequest;
    // console.log('Editar relatório:', requestUpdateForm);
    //
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
    if (this.lancarPedidoForm?.value && this.lancarPedidoForm?.valid && empresaId) {
      // const requestCreateForm = this.clienteForm.value as  ClienteRequest
      // console.log('Adicionar relatório:', requestCreateForm)
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

