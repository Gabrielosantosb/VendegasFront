export interface GetEmpresaResponse{
  empresaId: number,
  nomeFantasia: string,
  razaoSocial: string,
  cnpj: string
}

export interface AddEmpresaRequest{
  nomeFantasia: string,
  razaoSocial: string,
  cnpj: string

}
export interface EditEmpresaRequest{
  empresaId: number,
  nomeFantasia: string,
  razaoSocial: string,
  cnpj: string
}


