import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {EmpresaService} from "../../../../services/empresa/empresa.service";
import { FormBuilder, Validators} from "@angular/forms";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {ToastMessage} from "../../../../services/toast-message/toast-message";
import {ProgressBarModule} from "primeng/progressbar";
import {ConfirmationModal} from "../../../../services/confirmation/confirmation-service.service";
import {ReportsService} from "../../../../services/reports/reports.service";
import {ClienteEvent} from "../../../../../models/interfaces/enums/cliente/ClienteEvent";
import {EditClienteAction} from "../../../../../models/interfaces/reports/event/EditClienteAction";
import {

  ClienteRequest
} from "../../../../../models/interfaces/reports/response/GetAllProductsResponse";
import {CookieService} from "ngx-cookie-service";
import {environments} from "../../../../../environments/environments";
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: [],
  providers: [ToastMessage]
})
export class ClienteFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  isLoading = false
  loadingMode: ProgressBarModule = 'indeterminate';

  public addClienteAction = ClienteEvent.ADD_CLIENTE_EVENT;
  public editClientAction = ClienteEvent.EDIT_CLIENTE_EVENT;
  public clienteAction !: { event: EditClienteAction }
  private readonly USER_AUTH = environments.COOKIES_VALUE.user_auth
  reportId = 0;
  pacientId = 0
  public clienteForm = this.formBuilder.group({

    clienteName: ['', Validators.required],
    email: ['', Validators.required],
    telefone: ['', Validators.required]

  })
  private token = this.cookie.get(this.USER_AUTH)



  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private clienteService: ReportsService,
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
    const requestUpdateForm = this.clienteForm.value as ClienteRequest;
    console.log('Editar relatório:', requestUpdateForm);

    this.clienteService.editReport(this.reportId, requestUpdateForm)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.clienteForm.reset();
          this.toastMessage.SuccessMessage('Ficha editada com sucesso!');
        },
        error: (err) => {
          console.error(err);
          this.clienteForm.reset();
          this.toastMessage.ErrorMessage('Erro ao editar ficha');
        }
      });
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
              this.toastMessage.SuccessMessage('Ficha criada com sucesso!')
            }
          },
          error:(err) =>{
            console.log(err)
            this.clienteForm.reset();
            this.toastMessage.ErrorMessage('Erro ao criar ficha')
          }
        })
      this.clienteForm.reset();
    }
  }


  // loadReportData(pacientId: number): void {
  //   this.clienteService.getReportByPacientId(pacientId, this.clienteForm)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (reportData: GetReportResponse) => {
  //         this.reportId = reportData.reportId
  //         console.log('Dados ficha carregados:', reportData);
  //
  //       },
  //       error: (error) => {
  //         console.error('Erro ao  dados da ficha:', error);
  //       }
  //     });
  // }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

