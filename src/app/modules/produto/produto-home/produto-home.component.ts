import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";

import {ConfirmationService} from "primeng/api";

import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ToastMessage} from "../../../services/toast-message/toast-message";
import {ConfirmationModal} from "../../../services/confirmation/confirmation-service.service";
import {ProdutoResponse} from "../../../../models/interfaces/produto/response/ProdutoResponse";






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
    private confirmationModal: ConfirmationModal
  ) {
  }

  ngOnInit(): void {
    // this.getAllClientes();
  }



  // getAllClientes(){
  //   this.isLoading = true
  //   this.reportService
  //     .getAllClientes()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (response: GetClienteResponse[]) =>{
  //         if(response){
  //           this.clientesData = response
  //           this.isLoading = false
  //         }
  //       },
  //       error:(err:Error) =>{
  //         console.log(err)
  //         this.toastMessage.ErrorMessage("Erro ao buscar clientes")
  //       }
  //     })
  // }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

