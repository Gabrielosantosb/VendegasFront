import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  GetEmpresaResponse,
  GetPacientsResponse
} from "../../../../../models/interfaces/pacients/get-pacient-service.service";
import {EditEmpresaAction} from "../../../../../models/interfaces/pacients/event/editPacient";
import {EmpresaEvent} from "../../../../../models/interfaces/enums/pacients/PacientEvent";
import {EmpresaService} from "../../../../services/empresa/empresa.service";
import {EditClienteAction} from "../../../../../models/interfaces/reports/event/EditClienteAction";
import {ToastMessage} from "../../../../services/toast-message/toast-message";
import {ReferralService} from "../../../../services/referral/referral.service";
import {ClienteEvent} from "../../../../../models/interfaces/enums/cliente/ClienteEvent";
import {EditProdutoAction} from "../../../../../models/interfaces/produto/EditProdutoAction";
import {ProdutoEvent} from "../../../../../models/interfaces/enums/produto/ProdutoEvent";

@Component({
  selector: 'app-empresa-table',
  templateUrl: './empresa-table.component.html',
  styleUrls: ['./empresa-table.component.scss']
})
export class EmpresaTableComponent implements OnInit{
  @Input() public empresa: Array<GetEmpresaResponse> = [];

  @Output() public empresaEvent = new EventEmitter<EditEmpresaAction>();
  @Output() public clienteEvent = new EventEmitter<EditClienteAction>();
  @Output() public produtoEvent = new EventEmitter<EditProdutoAction>()

  public empresaSelected!: GetEmpresaResponse;
  public addEmpresaAction = EmpresaEvent.ADD_EMPRESA_ACTION;
  public editPacientAction = EmpresaEvent.EDIT_EMPRESA_ACTION;

  public addClienteAction = ClienteEvent.ADD_CLIENTE_EVENT;

  public addProdutoAction = ProdutoEvent.ADD_PRODUTO_EVENT;



  constructor(private empresaService: EmpresaService) {
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

  handleProdutoEvent(action: string, id?: number, produtoNome?: string): void{
    if(action && action !== '') this.produtoEvent.emit({action, id, produtoNome})
  }



  handleShowAllEmpresas(): void {
    this.empresaService.getAllEmpresas().subscribe({
      next: (allEmpresaData) => {
        this.empresa = allEmpresaData;
      },
      error: (error) => {
        console.error('Erro ao obter empresas:', error);
      }
    });
  }
}
