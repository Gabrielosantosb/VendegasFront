import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import { FormBuilder, Validators} from "@angular/forms";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {ToastMessage} from "../../../../services/toast-message/toast-message";
import {ClienteService} from "../../../../services/clientes/cliente.service";
import {ClienteEvent} from "../../../../../models/interfaces/enums/cliente/ClienteEvent";
import {EditClienteAction} from "../../../../../models/interfaces/cliente/EditClienteAction";
import {
  ClienteRequest
} from "../../../../../models/interfaces/cliente/response/Cliente";


@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: [],
  providers: [ToastMessage]
})
export class ClienteFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  isLoading = false
  public addClienteAction = ClienteEvent.ADD_CLIENTE_EVENT;
  public editClientAction = ClienteEvent.EDIT_CLIENTE_EVENT;
  public clienteAction !: { event: EditClienteAction }


  public clienteForm = this.formBuilder.group({

    clienteName: ['', Validators.required],
    email: ['', Validators.required],
    telefone: ['', Validators.required]

  })




  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private toastMessage: ToastMessage,
  ) {
  }

  ngOnInit(): void {
    this.clienteAction = this.ref.data;

  }
  handleSubmitClienteAction(): void {
    if (this.clienteAction?.event?.action === this.addClienteAction) this.handleSubmitAddCliente()
    if (this.clienteAction?.event?.action === this.editClientAction) this.handleSubmitEditCliente()
  }


  handleSubmitEditCliente(): void {
    console.log("editar")
    // if (this.clienteId <= 0) {
    //   console.error('ID do cliente inválido');
    //   return;
    // }
    // const requestUpdateForm = this.clienteForm.value as ClienteRequest;
    // console.log('Editar relatório:', requestUpdateForm);
    //
    // this.clienteService.(this.clienteId, requestUpdateForm)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: () => {
    //       this.clienteForm.reset();
    //       this.toastMessage.SuccessMessage('Cliente editada com sucesso!');
    //     },
    //     error: (err) => {
    //       console.error(err);
    //       this.clienteForm.reset();
    //       this.toastMessage.ErrorMessage('Erro ao editar Cliente');
    //     }
    //   });
  }

  handleSubmitAddCliente(): void {
    var empresaId  = this.clienteAction?.event?.id
    if (this.clienteForm?.value && this.clienteForm?.valid && empresaId) {
      const requestCreateForm = this.clienteForm.value as  ClienteRequest
      console.log('Adicionar relatório:', requestCreateForm)
      this.clienteService.createCliente(empresaId, requestCreateForm).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if(response){
              this.clienteForm.reset();
              this.toastMessage.SuccessMessage('Cliente criado com sucesso!')
            }
          },
          error:(err) =>{
            console.log(err)
            this.clienteForm.reset();
            this.toastMessage.ErrorMessage('Erro ao criar Cliente')
          }
        })
      this.clienteForm.reset();
    }
  }





  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

