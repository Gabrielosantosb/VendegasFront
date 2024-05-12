import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProdutoResponse} from "../../../../models/interfaces/produto/response/ProdutoResponse";
import {EventAction} from "../../../../models/interfaces/cliente/EventAction";
import {ProdutoService} from "../../../services/produto/produto.service";
import {ProdutoEvent} from "../../../../models/interfaces/enums/produto/ProdutoEvent";
import {takeUntil} from "rxjs";
import {ToastMessage} from "../../../services/toast-message/toast-message";
import {ConfirmationService} from "primeng/api";



@Component({
  selector: 'app-produto-table',
  templateUrl: './produto-table.component.html',
  styleUrls: ['report-table.scss']
})
export class ProdutoTableComponent {
  @Input() produtos: Array<ProdutoResponse> = [];
  @Output() produtoEvent = new EventEmitter<EventAction>()
  public selectedProduto!: ProdutoResponse;


  constructor(private produtoService: ProdutoService, private toastMessage: ToastMessage, private confirmationService: ConfirmationService) {
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
  handleDeleteProduct(produtoId: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este produto?',
      accept: () => {
        console.log(produtoId);
        if (produtoId == null) {
          console.error('ID inválido');
          return;
        }
        this.produtoService.deleteProduto(produtoId).pipe()
          .subscribe({
            next: (response) => {
              this.toastMessage.InfoMessage("Produto removido com sucesso");
              this.handleShowAllProdutos();
            },
            error: (err) => {
              this.toastMessage.ErrorMessage("Erro ao remover produto");
            }
          });
      }
    });
  }

  handleProdutoEvent(action: string, id?: number): void {
    console.log(id)
    if (action && action !== '') this.produtoEvent.emit({action, id})
  }


}
