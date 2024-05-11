import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmpresaService} from "../../../../services/empresa/empresa.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Subject, takeUntil} from "rxjs";
import {
  GetEmpresaResponse,

} from "../../../../../models/interfaces/pacients/get-pacient-service.service";
import {ToastMessage} from "../../../../services/toast-message/toast-message";
import {Router} from "@angular/router";
import {ConfirmationModal} from "../../../../services/confirmation/confirmation-service.service";
import {EventAction} from "../../../../../models/interfaces/reports/event/EventAction";
import {EmpresaFormComponent} from "../../components/empresa-form/empresa-form/empresa-form.component";

import {ProgressBarModule} from "primeng/progressbar";
import {ClienteFormComponent} from "../../../cliente/components/cliente-form/cliente-form.component";
import {ProdutoFormComponent} from "../../../produto/produto-form/produto-form.component";

@Component({
  selector: 'app-empresa-home',
  templateUrl: './empresa-home.component.html',
  styleUrls: ['./empresa-home.component.scss'],
  providers: [ToastMessage, ConfirmationModal]
})
export class EmpresaHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  isLoading = false
  loadingMode: ProgressBarModule = 'indeterminate';
  public empresasData: Array<GetEmpresaResponse> = [];

  constructor(
    private empresaService: EmpresaService,
    private dialogService: DialogService,
    private toastMessage: ToastMessage,
    private confirmationModal: ConfirmationModal,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllEmpresas()
  }


  getAllEmpresas() {
    this.isLoading = true
    this.empresaService
      .getAllEmpresas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response : GetEmpresaResponse[]) => {
          if (response.length > 0) {
            this.empresasData = response;
            this.isLoading = false
          }
        },
        error: (err : []) => {
          console.log(err);
          this.isLoading = false
          this.toastMessage.ErrorMessage('Erro ao buscar Empresas!')
          this.router.navigate(['/dashboard']);
        },
      });
  }


  handleProdutoAction(event :EventAction): void{
    console.log('Evento bateu' , event)
    if (event) {
      this.ref = this.dialogService.open(ProdutoFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event:{
            action : event.action,
            id: event.id
          }
        },
      });

      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAllEmpresas(),
      });
    }
  }
  handleClienteAction(event :EventAction): void{
    console.log('Evento bateu' , event)
    if (event) {
      this.ref = this.dialogService.open(ClienteFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event:{
            action : event.action,
            id: event.id
          }
        },
      });

      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAllEmpresas(),
      });
    }
  }
  handleEmpresaAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(EmpresaFormComponent, {
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
        next: () => this.getAllEmpresas(),
      });
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


