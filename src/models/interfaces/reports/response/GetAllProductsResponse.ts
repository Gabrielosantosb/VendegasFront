export interface GetAllProductsResponse {
  id: string,
  name: string,
  amount: number,
  description: string,
  price: string,
  category: {
    id: string,
    name: string,
  };
}

export interface GetClienteResponse
{
  clienteId: number,
  clientName: string,
  email: string,
  telefone: string
  empresaId: number;
  empresa: {
    empresaId: number,
    nomeFantasia: string,
    razaoSocial: string,
    cnpj: string
  }
}

export interface ClienteRequest
{
  clientName: string,
  email: string,
  telefone: string
}

