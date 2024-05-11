import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProdutoResponse} from "../../../../models/interfaces/produto/response/ProdutoResponse";
import {EventAction} from "../../../../models/interfaces/reports/event/EventAction";
import {ProdutoService} from "../../../services/produto/produto.service";



@Component({
  selector: 'app-cliente-table',
  templateUrl: './produto-table.component.html',
  styleUrls: ['report-table.scss']
})
export class ProdutoTableComponent {
  @Input() produtos: Array<ProdutoResponse> = [];
  @Output() reportEvent = new EventEmitter<EventAction>()
  showProfissionalReports = false
  public selectedProduto!: ProdutoResponse;
  displayModal: boolean = false;

  constructor(private produtoService: ProdutoService) {
  }


  handleShowAllReports(): void {
    this.produtoService.getAllProdutos().subscribe({
      next: (allProdutosData) => {
        this.showProfissionalReports = false
        this.produtos = allProdutosData;
      },
      error: (error) => {
        console.error('Erro ao obter produtos:', error);
      }
    });
  }

  handleReportEvent(action: string, id?: number): void {
    if (action && action !== '') this.reportEvent.emit({action, id})
  }

  // handleDeleteCliente(reportId: number, pacientName: string): void {
  //   if(reportId !== null && pacientName !== "")
  //   {
  //     this.deleteReportEvent.emit({
  //       reportId,
  //       pacientName,
  //     })
  //   }
  // }

}
