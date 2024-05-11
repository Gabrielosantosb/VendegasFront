import {Input, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {HttpClientModule} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {InputMaskModule} from "primeng/inputmask";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TooltipModule} from "primeng/tooltip";
import {DialogModule} from "primeng/dialog";
import {ConfirmationService} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "../../shared/shared.module";
import {PedidoProdutoComponent} from "./page/pedido_produto-home/pedido_produto.component";
import {PEDIDO_ROUTES} from "./pedido_produto.routing";
import {RouterModule} from "@angular/router";
import {PedidoTableComponent} from "./pedido_produto-table/pedido_produto.component";


@NgModule({
  declarations: [
    PedidoProdutoComponent,
    PedidoTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(PEDIDO_ROUTES),
    // PrimeNG
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    RippleModule,
    DialogModule,
    SharedModule
  ],
  providers:[DialogService, ConfirmationService]
})
export class PedidoProdutoModule { }
