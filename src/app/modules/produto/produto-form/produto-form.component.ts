import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";

import { FormBuilder, Validators} from "@angular/forms";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

import {ProgressBarModule} from "primeng/progressbar";





import {CookieService} from "ngx-cookie-service";

import {ClipboardService} from "ngx-clipboard";
import {ToastMessage} from "../../../services/toast-message/toast-message";
import {ProdutoEvent} from "../../../../models/interfaces/enums/produto/ProdutoEvent";
import {EditProdutoAction} from "../../../../models/interfaces/produto/EditProdutoAction";
import {environments} from "../../../../environments/environments";
import {ConfirmationModal} from "../../../services/confirmation/confirmation-service.service";
import {ProdutoRequest} from "../../../../models/interfaces/produto/request/ProdutoRequest";
import {ProdutoService} from "../../../services/produto/produto.service";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './produto-form.component.html',
  styleUrls: [],
  providers: [ToastMessage]
})
export class ProdutoFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  isLoading = false
  loadingMode: ProgressBarModule = 'indeterminate';

  public addProdutoAction = ProdutoEvent.ADD_PRODUTO_EVENT;
  public editProdutoAction = ProdutoEvent.EDIT_PRODUTO_EVENT;
  public produtoAction !: { event: EditProdutoAction }
  private readonly USER_AUTH = environments.COOKIES_VALUE.user_auth
  reportId = 0;
  pacientId = 0
  public produtoForm = this.formBuilder.group({
    nome: ['', Validators.required],
    valor: ['', Validators.required],
    descricao: ['', Validators.required]

  })
  private token = this.cookie.get(this.USER_AUTH)



  constructor(
    public ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private toastMessage: ToastMessage,
    private cookie: CookieService,
    private produtoService: ProdutoService
  ) {
  }

  ngOnInit(): void {
    this.produtoAction = this.ref.data;
    if(this.produtoAction.event.id  && this.produtoAction.event.action == this.addProdutoAction)
    {
      this.pacientId = this.produtoAction.event.id
    }

    if(this.produtoAction.event.action == this.editProdutoAction && this.produtoAction.event.id)
    {
      // this.loadReportData(this.clienteAction.event.id)

    }

  }
  handleSubmitProdutoAction(): void {
    if (this.produtoAction?.event?.action === this.editProdutoAction) this.handleSubmitEditProduto()
    if (this.produtoAction?.event?.action === this.addProdutoAction) this.handleSubmitAddProduto()
  }


  handleSubmitEditProduto(): void {
    if (this.reportId <= 0) {
      console.error('ID  nválido');
      return;
    }
    const requestUpdateForm = this.produtoForm.value as ProdutoRequest;
    console.log('Editar relatório:', requestUpdateForm);

    // this.clienteService.editReport(this.reportId, requestUpdateForm)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: () => {
    //       this.clienteForm.reset();
    //       this.toastMessage.SuccessMessage('Ficha editada com sucesso!');
    //     },
    //     error: (err) => {
    //       console.error(err);
    //       this.clienteForm.reset();
    //       this.toastMessage.ErrorMessage('Erro ao editar ficha');
    //     }
    //   });
  }

  handleSubmitAddProduto(): void {
    var empresaId  = this.produtoAction?.event?.id
    console.log('id da empresa:', empresaId)
    if (this.produtoForm?.value && this.produtoForm?.valid && empresaId) {
      const requestCreateProduto = this.produtoForm.value as  ProdutoRequest
      console.log('Adicionar produto:', requestCreateProduto)
      this.produtoService.createProduto(empresaId, requestCreateProduto).pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(response) =>{
            this.produtoForm.reset()
            this.toastMessage.SuccessMessage("Produto criado com sucesso")
          },
          error: (err) =>{
            console.log(err)
            this.produtoForm.reset()
            this.toastMessage.ErrorMessage("Erro ao criar produto")

          }
        })
      // this.clienteService.createCliente(empresaId, requestCreateProduto).pipe(takeUntil(this.destroy$))
      //   .subscribe({
      //     next: (response) => {
      //       if(response){
      //         this.clienteForm.reset();
      //         this.toastMessage.SuccessMessage('Ficha criada com sucesso!')
      //       }
      //     },
      //     error:(err) =>{
      //       console.log(err)
      //       this.clienteForm.reset();
      //       this.toastMessage.ErrorMessage('Erro ao criar ficha')
      //     }
      //   })
      this.produtoForm.reset();
    }
  }


  // loadReportData(pacientId: number): void {
  //   this.clienteService.getReportByPacientId(pacientId, this.clienteForm)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (reportData: GetReportResponse) => {
  //         this.reportId = reportData.reportId
  //         console.log('Dados ficha carregados:', reportData);
  //
  //       },
  //       error: (error) => {
  //         console.error('Erro ao  dados da ficha:', error);
  //       }
  //     });
  // }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

