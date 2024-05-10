import {Component} from '@angular/core';
import {ConfirmationModal} from "../../../services/confirmation/confirmation-service.service";
import {DialogService} from "primeng/dynamicdialog";
import {ClipboardService} from "ngx-clipboard";
import {NzMessageService} from "ng-zorro-antd/message";
import {ToastMessage} from "../../../services/toast-message/toast-message";
import {CookieService} from "ngx-cookie-service";
import {environments} from "../../../../environments/environments";

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: ['./toolbar.scss'],
  providers: [ConfirmationModal,]
})
export class ToolbarNavigationComponent {
  private readonly USER_AUTH = environments.COOKIES_VALUE.user_auth
  private token = this.cookie.get(this.USER_AUTH)
  logoUrl?= "../../../assets/img/healthProfissional.svg";
  constructor(private confirmationModal: ConfirmationModal,
              private cookie : CookieService,
              private clipboardService: ClipboardService,
              private toastMessage: ToastMessage,
              private messageService: NzMessageService) {
  }

  logout(): void {
    console.log('clicou')
    this.confirmationModal.confirmLogout("Tem certeza que deseja sair?")
  }



}
