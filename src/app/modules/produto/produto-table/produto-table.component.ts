import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProdutoResponse} from "../../../../models/interfaces/produto/response/ProdutoResponse";
import {EventAction} from "../../../../models/interfaces/reports/event/EventAction";
import {ProdutoService} from "../../../services/produto/produto.service";



@Component({
  selector: 'app-produto-table',
  templateUrl: './produto-table.component.html',
  styleUrls: ['report-table.scss']
})
export class ProdutoTableComponent {
  @Input() produtos: Array<ProdutoResponse> = [];
  @Output() produtoEvent = new EventEmitter<EventAction>()

  public selectedProduto!: ProdutoResponse;


  constructor(private produtoService: ProdutoService) {
  }


  handleShowAllProdutos(): void {
    this.produtoService.getAllProdutos().subscribe({
      next: (allProdutosData) => {
        this.produtos = allProdutosData;
      },
      error: (error) => {
        console.error('Erro ao obter produtos:', error);
      }
    });
  }

  handleProdutoEvent(action: string, id?: number): void {
    if (action && action !== '') this.produtoEvent.emit({action, id})
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
