import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";

import {ConfirmationService} from "primeng/api";

import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ToastMessage} from "../../../services/toast-message/toast-message";
import {ConfirmationModal} from "../../../services/confirmation/confirmation-service.service";
import {ProdutoResponse} from "../../../../models/interfaces/produto/response/ProdutoResponse";
import {ProdutoService} from "../../../services/produto/produto.service";
import {EventAction} from "../../../../models/interfaces/reports/event/EventAction";
import {ClienteFormComponent} from "../../cliente/components/cliente-form/cliente-form.component";
import {ProdutoFormComponent} from "../produto-form/produto-form.component";






@Component({
  selector: 'app-cliente-home',
  templateUrl: './produto-home.component.html',
  styleUrls: [],
  providers: [ToastMessage, ConfirmationModal]
})
export class ProdutoHomeComponent implements OnDestroy, OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  public produtosData : Array<ProdutoResponse> = []
  isLoading = false

  constructor(

    private dialogService: DialogService,
    private toastMessage: ToastMessage,
    private confirmationModal: ConfirmationModal,
    private produtoService: ProdutoService
  ) {
  }

  ngOnInit(): void {
    this.getAllProdutos();
  }



  getAllProdutos(){
    this.isLoading = true
    this.produtoService
      .getAllProdutos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ProdutoResponse[]) =>{
          if(response){
            this.produtosData = response
            this.isLoading = false
          }
        },
        error:(err:Error) =>{
          console.log(err)
          this.toastMessage.ErrorMessage("Erro ao buscar produtos")
        }
      })
  }

  handleProdutoAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(ProdutoFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          // productDatas: this.productsDatas,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => console.log('aqui'),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

