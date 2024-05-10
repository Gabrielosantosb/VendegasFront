import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  GetEmpresaResponse,
  GetPacientsResponse
} from "../../../../../models/interfaces/pacients/get-pacient-service.service";
import {EditEmpresaAction} from "../../../../../models/interfaces/pacients/event/editPacient";
import {EmpresaEvent} from "../../../../../models/interfaces/enums/pacients/PacientEvent";
import {PacientService} from "../../../../services/pacients/pacients.service";
import {EditClienteAction} from "../../../../../models/interfaces/reports/event/EditClienteAction";
import {ToastMessage} from "../../../../services/toast-message/toast-message";
import {ReferralService} from "../../../../services/referral/referral.service";
import {ClienteEvent} from "../../../../../models/interfaces/enums/cliente/ClienteEvent";

@Component({
  selector: 'app-empresa-table',
  templateUrl: './empresa-table.component.html',
  styleUrls: ['./empresa-table.component.scss']
})
export class EmpresaTableComponent implements OnInit{
  @Input() public pacients: Array<GetPacientsResponse> = [];
  @Input() public empresa: Array<GetEmpresaResponse> = [];

  @Output() public empresaEvent = new EventEmitter<EditEmpresaAction>();
  @Output() public clienteEvent = new EventEmitter<EditClienteAction>();

  public empresaSelected!: GetEmpresaResponse;
  public addEmpresaAction = EmpresaEvent.ADD_EMPRESA_ACTION;
  public editPacientAction = EmpresaEvent.EDIT_EMPRESA_ACTION;

  public addClienteAction = ClienteEvent.ADD_CLIENTE_EVENT;








  constructor(private empresaService: PacientService, private toastMessage: ToastMessage, private referralService: ReferralService) {
  }

  ngOnInit(): void {
        this.handleShowAllEmpresas()
    }






  handleEmpresaEvent(action: string, id?: number, empresaName?: string): void {
    if (action && action !== '') this.empresaEvent.emit({action, id, empresaName});
  }
  handleClienteEvent(action: string, id?: number, clienteName?: string): void{
    if(action && action !== '') this.clienteEvent.emit({action, id, clienteName})
  }



  handleShowAllEmpresas(): void {
    this.empresaService.getAllEmpresas().subscribe({
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
