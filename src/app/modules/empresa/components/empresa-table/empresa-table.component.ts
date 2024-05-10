import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  GetEmpresaResponse,
  GetPacientsResponse
} from "../../../../../models/interfaces/pacients/get-pacient-service.service";
import {EditPacientAction} from "../../../../../models/interfaces/pacients/event/editPacient";
import {EmpresaEvent} from "../../../../../models/interfaces/enums/pacients/PacientEvent";
import {DeletePacient} from "../../../../../models/interfaces/pacients/event/deletePacient";
import {PacientService} from "../../../../services/pacients/pacients.service";
import {ReportEvent} from "../../../../../models/interfaces/enums/report/ReportEvent.js";
import {EditReportAction} from "../../../../../models/interfaces/reports/event/EditReportAction";
import {GetReportResponse} from "../../../../../models/interfaces/reports/response/GetAllProductsResponse";
import {SelectItem} from "primeng/api";
import {UF} from "../../../../../models/interfaces/enums/UF/uf";
import {MedicalSpecialty} from "../../../../../models/interfaces/enums/medicalSpeciality/medicalSpeciality";
import {ToastMessage} from "../../../../services/toast-message/toast-message";
import {ReferralService} from "../../../../services/referral/referral.service";

@Component({
  selector: 'app-empresa-table',
  templateUrl: './empresa-table.component.html',
  styleUrls: ['./empresa-table.component.scss']
})
export class EmpresaTableComponent implements OnInit{
  @Input() public pacients: Array<GetPacientsResponse> = [];
  @Input() public empresa: Array<GetEmpresaResponse> = [];
  @Output() public pacientEvent = new EventEmitter<EditPacientAction>();
  @Output() public deletePacientEvent = new EventEmitter<DeletePacient>();
  @Output() public reportEvent = new EventEmitter<EditReportAction>();
  public empresaSelected!: GetEmpresaResponse;
  public addPacientAction = EmpresaEvent.ADD_EMPRESA_ACTION;
  public editPacientAction = EmpresaEvent.EDIT_EMPRESA_ACTION;
  selectedProfissional: any;
  displayModal: boolean = false;
  showProfissionalPacients = false
  showOtherField: boolean = false;
  pacientId: number = 0;

  constructor(private pacientService: PacientService, private toastMessage: ToastMessage, private referralService: ReferralService) {
  }

  ngOnInit(): void {
        this.handleShowAllEmpresas()
    }




  showModal(pacientId: number) {
    this.displayModal = true;
    this.pacientId = pacientId

  }

  hideModal() {
    this.displayModal = false;
  }



  handlePacientEvent(action: string, id?: number, pacientName?: string): void {
    if (action && action !== '') this.pacientEvent.emit({action, id, pacientName});
  }


  handleShowAllEmpresas(): void {
    this.pacientService.getAllEmpresas().subscribe({
      next: (allEmpresaData) => {
        console.log('Aqui as empresas: ', allEmpresaData)
        this.showProfissionalPacients = false
        this.empresa = allEmpresaData;
      },
      error: (error) => {
        console.error('Erro ao obter os pacientes do usuário:', error);
      }
    });
  }

  handleProfissionalPacients(): void {
    console.log('bateu no profissionalPacients')

    this.pacientService.getProfissionalPacients().subscribe({
      next: (profissionalPacientsData) => {
        this.pacients = profissionalPacientsData;
      },
      error: (error) => {
        console.error('Erro ao obter os pacientes do usuário:', error);
      }
    });
  }

}
