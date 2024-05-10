import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaHomeComponent } from './page/empresa-home/empresa-home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CATEGORIES_ROTES} from "./empresa.routing";
import {SharedModule} from "../../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {InputMaskModule} from "primeng/inputmask";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmationService} from "primeng/api";

import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";

import {InputTextModule} from "primeng/inputtext";
import {TooltipModule} from "primeng/tooltip";
import {ProgressBarModule} from "primeng/progressbar";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import {EmpresaFormComponent} from "./components/empresa-form/empresa-form/empresa-form.component";
import {EmpresaTableComponent} from "./components/empresa-table/empresa-table.component";



@NgModule({
  declarations: [
    EmpresaHomeComponent,
    EmpresaTableComponent,
    EmpresaFormComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(CATEGORIES_ROTES),
        SharedModule,
        HttpClientModule,
        // -----PrimeNG------
        CardModule,
        ButtonModule,
        TableModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextareaModule,
        DynamicDialogModule,
        DropdownModule,
        RippleModule,
        ConfirmDialogModule,
        InputTextModule,
        TooltipModule,
        ProgressBarModule,
        CheckboxModule,
        DialogModule
    ],
  providers : [DialogService, ConfirmationService]
})
export class EmpresaModule { }
