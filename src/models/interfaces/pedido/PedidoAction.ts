export interface EditPedidoAction{
  action: string
  clienteId?: number
  empresaId?:number
  clienteNome?: string

}

export interface LancarPedidoAction{

  produtoId?: number
  pedidoId?:number
  quantidade?: number
}
