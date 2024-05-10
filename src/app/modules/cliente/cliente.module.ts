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
import { ClienteHomeComponent } from './page/cliente-home/cliente-home.component';
import {RouterModule} from "@angular/router";
import {CLIENTE_ROUTES} from "./cliente.routing";
import { ClienteTableComponent } from './components/cliente-table/cliente-table.component';
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ClienteHomeComponent,
    ClienteTableComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forChild(CLIENTE_ROUTES),
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
        DialogModule
    ],
  providers:[DialogService, ConfirmationService]
})
export class ClienteModule { }
