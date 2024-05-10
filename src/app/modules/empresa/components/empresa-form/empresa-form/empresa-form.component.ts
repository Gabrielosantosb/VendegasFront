import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {EmpresaEvent} from "../../../../../../models/interfaces/enums/pacients/PacientEvent";
import {EditPacientAction} from "../../../../../../models/interfaces/pacients/event/editPacient";
import {ToastMessage} from "../../../../../services/toast-message/toast-message";
import {ConfirmationModal} from "../../../../../services/confirmation/confirmation-service.service";
import {PacientService} from "../../../../../services/pacients/pacients.service";
import {ProgressBar, ProgressBarModule} from "primeng/progressbar";
import {
  AddEmpresaRequest,
  EditPacientRequest,
  GetPacientsResponse
} from "../../../../../../models/interfaces/pacients/get-pacient-service.service";

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
  public editPacientAction = EmpresaEvent.EDIT_EMPRESA_ACTION;
  public showReportForm: boolean = false;
  public empresaAction!: { event: EditPacientAction };


  public empresaForm = this.formBuilder.group({
    nomeFantasia: ['', Validators.required],
    razaoSocial: ['', Validators.required],
    cnpj: ['', Validators.required],
  });



  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private empresaService: PacientService,
    private confirmationModal: ConfirmationModal,
    private toastMessage: ToastMessage
  ) {}


  ngOnInit(): void {
    this.empresaAction = this.ref.data;
    if (
      this.empresaAction?.event?.action === this.addEmpresaAction
    ) {
      if (
        this.empresaAction?.event?.action === this.editPacientAction &&
        this.empresaAction?.event?.pacientName !== null &&
        this.empresaAction?.event?.pacientName !== undefined &&
        this.empresaAction?.event?.id !== undefined
      ) {
        this.loadPacientData(this.empresaAction.event.id);
      }
    }
  }

  loadPacientData(pacientId: number): void {
    this.empresaService.getPacientById(pacientId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (pacientData: GetPacientsResponse) => {
          console.log('Dados da emprsa carregados:', pacientData);
          this.empresaForm.patchValue({
            nomeFantasia: pacientData.username,
            razaoSocial: pacientData.email,
            cnpj: pacientData.address,
          });
          this.showReportForm = true;
        },
        error: (error) => {
          console.error('Erro ao carregar dados do paciente:', error);
        }
      });
  }


  handleSubmitEmpresaAction(): void {
    if (this.empresaAction?.event?.action === this.addEmpresaAction) this.handleSubmitAddEmpresa();
    if (this.empresaAction?.event?.action === this.editPacientAction) this.handleSubmitEditPacient();
    return;
  }


  handleSubmitAddEmpresa(): void {
    if (this.empresaForm?.value && this.empresaForm?.valid) {
      this.isLoading = true

      const requestCreateEmpresa = this.empresaForm.value as AddEmpresaRequest;
      this.empresaService
        .createPacient(1, requestCreateEmpresa)
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

  handleSubmitEditPacient(): void {
    if (
      this.empresaForm?.value &&
      this.empresaForm?.valid &&
      this.empresaAction?.event?.id
    ) {
    const requestEditPacient = this.empresaForm.value as EditPacientRequest;
    requestEditPacient.pacient_id =  this.empresaAction?.event?.id
      this.empresaService
        .editPacient(requestEditPacient)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.empresaForm.reset();
            this.toastMessage.SuccessMessage('Paciente editada com sucesso!')
          },
          error: (err: any) => {
            console.log(err);
            this.empresaForm.reset();
            this.toastMessage.ErrorMessage('Erro ao editar Paciente!')
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
