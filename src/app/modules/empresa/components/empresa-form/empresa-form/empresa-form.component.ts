import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {FormBuilder, Validators} from "@angular/forms";
import {EmpresaEvent} from "../../../../../../models/interfaces/enums/empresa/EmpresaEvent";
import {EditEmpresaAction} from "../../../../../../models/interfaces/enums/empresa/EmpresaAction";
import {ToastMessage} from "../../../../../services/toast-message/toast-message";
import {ConfirmationModal} from "../../../../../services/confirmation/confirmation-service.service";
import {EmpresaService} from "../../../../../services/empresa/empresa.service";
import {ProgressBarModule} from "primeng/progressbar";
import {
  AddEmpresaRequest,
  EditEmpresaRequest, GetEmpresaResponse,
} from "../../../../../../models/interfaces/empresa/EmpresaModel";

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.scss'],
  providers: [ToastMessage, ConfirmationModal]
})
export class EmpresaFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  isLoading = false
  loadingMode: ProgressBarModule = 'indeterminate';

  public addEmpresaAction = EmpresaEvent.ADD_EMPRESA_ACTION;
  public editEmpresaAction = EmpresaEvent.EDIT_EMPRESA_ACTION;
  public showReportForm: boolean = false;
  public empresaAction!: { event: EditEmpresaAction };


  public empresaForm = this.formBuilder.group({
    nomeFantasia: ['', Validators.required],
    razaoSocial: ['', Validators.required],
    cnpj: ['', Validators.required],
  });



  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private confirmationModal: ConfirmationModal,
    private toastMessage: ToastMessage
  ) {}


  ngOnInit(): void {
    console.log('bateu aqui', this.ref.data)
    this.empresaAction = this.ref.data;
    if (this.empresaAction?.event?.action === this.editEmpresaAction && this.empresaAction?.event?.id !== undefined) {
      this.loadEmpresaData(this.empresaAction.event.id);
    }
  }

  loadEmpresaData(empresaId: number): void {

    this.empresaService.getEmpresaById(empresaId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (empresaData: GetEmpresaResponse) => {
          console.log('Dados da emprsa carregados:', empresaData);
          this.empresaForm.patchValue({
            nomeFantasia: empresaData.nomeFantasia,
            razaoSocial: empresaData.razaoSocial,
            cnpj: empresaData.cnpj,
          });
          this.showReportForm = true;
        },
        error: (error) => {
          console.error('Erro ao carregar dados da empresa:', error);
        }
      });
  }


  handleSubmitEmpresaAction(): void {
    if (this.empresaAction?.event?.action === this.addEmpresaAction) this.handleSubmitAddEmpresa();
    if (this.empresaAction?.event?.action === this.editEmpresaAction) this.handleSubmitEditEmpresa();
    return;
  }


  handleSubmitAddEmpresa(): void {
    if (this.empresaForm?.value && this.empresaForm?.valid) {
      this.isLoading = true

      const requestCreateEmpresa = this.empresaForm.value as AddEmpresaRequest;
      this.empresaService
        .createEmpresa(1, requestCreateEmpresa)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response:any) => {
            if (response) {
              this.empresaForm.reset();
              this.toastMessage.SuccessMessage('Empresa criada com sucesso!')
              this.isLoading = false
            }
          },
          error: (err: Error) => {
            console.log(err);
            this.empresaForm.reset();
            this.toastMessage.ErrorMessage('Erro ao criar empresa!')
          },
        });
    }
  }

  handleSubmitEditEmpresa(): void {
    console.log("bateu em editar empresa")
    if (
      this.empresaForm?.value &&
      this.empresaForm?.valid &&
      this.empresaAction?.event?.id
    ) {
    const requestEditEmpresa = this.empresaForm.value as EditEmpresaRequest;
      requestEditEmpresa.empresaId =  this.empresaAction?.event?.id
      this.empresaService
        .editEmpresa(requestEditEmpresa)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.empresaForm.reset();
            this.toastMessage.SuccessMessage('Empresa editada com sucesso!')
          },
          error: (err: any) => {
            console.log(err);
            this.empresaForm.reset();
            this.toastMessage.ErrorMessage('Erro ao editar Empresa!')
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
