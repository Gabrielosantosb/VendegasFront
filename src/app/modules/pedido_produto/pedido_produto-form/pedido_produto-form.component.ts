import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";



import {CookieService} from "ngx-cookie-service";

import {ClipboardService} from "ngx-clipboard";
import {ToastMessage} from "../../../services/toast-message/toast-message";
import {ProgressBarModule} from "primeng/progressbar";
import {EditClienteAction} from "../../../../models/interfaces/reports/event/EditClienteAction";
import {environments} from "../../../../environments/environments";
import {FormBuilder, Validators} from "@angular/forms";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {ProdutoService} from "../../../services/produto/produto.service";
import {ProdutoResponse} from "../../../../models/interfaces/produto/response/ProdutoResponse";
import {PedidoService} from "../../../services/pedido/pedido.service";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './pedido_produto.component.html',
  styleUrls: [],
  providers: [ToastMessage]
})
export class PedidoProdutoFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  isLoading = false
  loadingMode: ProgressBarModule = 'indeterminate';
  produtos: Array<ProdutoResponse> = [];
  public clienteAction !: { event: EditClienteAction }
  private readonly USER_AUTH = environments.COOKIES_VALUE.user_auth

  public lancarPedidoForm = this.formBuilder.group({
    quantidade: [0, [Validators.required, Validators.min(1)]],
    produto: [null, Validators.required],

  })
  private token = this.cookie.get(this.USER_AUTH)



  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private toastMessage: ToastMessage,
    private cookie: CookieService,
    private pedidoService: PedidoService,
    private clipboardService: ClipboardService,
  ) {
  }

  ngOnInit(): void {
    this.getAllProdutos()
  }

  getAllProdutos(): void {
    this.produtoService.getAllProdutos().subscribe({
      next: (allProdutosData) => {
        this.produtos = allProdutosData;
        console.log(this.produtos)
      },
      error: (error) => {
        console.error('Erro ao obter produtos:', error);
      }
    });
  }

  handleSubmitLancarPedido(): void {
    console.log('Aqui o value ', this.lancarPedidoForm.value);
    const selectedProduto = this.lancarPedidoForm.value.produto;
    if (selectedProduto != null) {
      if (typeof selectedProduto === 'object' && 'produtoId' in selectedProduto) {
        const pedidoId = this.ref.data.event.pedidoId;
        const produtoId = (selectedProduto as ProdutoResponse).produtoId;
        const quantidade = this?.lancarPedidoForm?.value?.quantidade as number;
        const requestLancarPedido = this.lancarPedidoForm?.value;

        console.log("request", requestLancarPedido);
        this.pedidoService.lancarPedido(pedidoId, produtoId, quantidade)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              this.lancarPedidoForm.reset();
              this.toastMessage.SuccessMessage('Pedido lançado com sucesso');
            },
            error: (err) => {
              if (err.status === 500) {
                this.toastMessage.ErrorMessage('Pedido já lançado');
              } else {
                this.lancarPedidoForm.reset();
                this.toastMessage.ErrorMessage('Erro ao lançar pedido');
              }
            }
          });
      }
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

