import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  GetEmpresaResponse,
  GetPacientsResponse
} from "../../../../../models/interfaces/pacients/get-pacient-service.service";
import {EditEmpresaAction} from "../../../../../models/interfaces/pacients/event/editPacient";
import {EmpresaEvent} from "../../../../../models/interfaces/enums/pacients/PacientEvent";
import {DeletePacient} from "../../../../../models/interfaces/pacients/event/deletePacient";
import {PacientService} from "../../../../services/pacients/pacients.service";
import {EditReportAction} from "../../../../../models/interfaces/reports/event/EditReportAction";
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
  @Output() public empresaEvent = new EventEmitter<EditEmpresaAction>();

  @Output() public reportEvent = new EventEmitter<EditReportAction>();
  public empresaSelected!: GetEmpresaResponse;
  public addEmpresaAction = EmpresaEvent.ADD_EMPRESA_ACTION;
  public editPacientAction = EmpresaEvent.EDIT_EMPRESA_ACTION;




  constructor(private pacientService: PacientService, private toastMessage: ToastMessage, private referralService: ReferralService) {
  }

  ngOnInit(): void {
        this.handleShowAllEmpresas()
    }






  handleEmpresaEvent(action: string, id?: number, empresaName?: string): void {
    if (action && action !== '') this.empresaEvent.emit({action, id, empresaName});
  }



  handleShowAllEmpresas(): void {
    this.pacientService.getAllEmpresas().subscribe({
      next: (allEmpresaData) => {
        console.log('Aqui as empresas: ', allEmpresaData)
        this.empresa = allEmpresaData;
      },
      error: (error) => {
        console.error('Erro ao obter os pacientes do usuário:', error);
      }
    });
  }
}
