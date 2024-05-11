import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetClienteResponse} from "../../../../models/interfaces/reports/response/GetAllProductsResponse";
import {EventAction} from "../../../../models/interfaces/reports/event/EventAction";
import {EditPedidoAction, LancarPedidoAction} from "../../../../models/interfaces/pedido/PedidoAction";
import {DeleteReportAction} from "../../../../models/interfaces/reports/event/DeleteProductAction";
import {PedidoEvent} from "../../../../models/interfaces/enums/pedido/PedidoEvent";
import {ReportsService} from "../../../services/reports/reports.service";
import {PedidoResponse} from "../../../../models/interfaces/pedido/PedidoResponse";
import {FormBuilder, Validators} from "@angular/forms";
import {ProdutoService} from "../../../services/produto/produto.service";
import {ProdutoResponse} from "../../../../models/interfaces/produto/response/ProdutoResponse";



@Component({
  selector: 'app-pedido-table',
  templateUrl: './pedido_produto.component.html',
  styleUrls: ['report-table.scss']
})
export class PedidoTableComponent implements OnInit{
  @Input() pedidos: Array<PedidoResponse> = [];
  @Output() clienteEvent = new EventEmitter<EventAction>()
  @Output() pedidoEvent = new EventEmitter<EditPedidoAction>()
  @Output() lancarPedidoEvent = new EventEmitter<LancarPedidoAction>()
  @Output() deleteClienteEvent = new EventEmitter<DeleteReportAction>()

  public lancarPedidoForm = this.formBuilder.group({
    quantidade: [0, [Validators.required, Validators.min(0)]],
    produto: [0, Validators.required],
  })


  public addPedidoAction = PedidoEvent.ADD_PEDIDO_EVENT
  showProfissionalReports = false
  public selectedPedido!: GetClienteResponse;
  displayModal: boolean = false;

  constructor(private produtoService: ProdutoService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
        this.getAllProdutos()
    }

   produtos: Array<ProdutoResponse> = [];
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



}
