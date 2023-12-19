interface CommonEspmGameDTOAttributes {
  nome: string;
  descricao: string;
  produtora: string;
  ano: number;
  idadeMinima: number;
}

export interface EspmGameDTO extends CommonEspmGameDTOAttributes {
  id: number;
}

export interface CreateEspmGameDTO extends CommonEspmGameDTOAttributes {}

export interface UpdateEspmGameDTO extends CommonEspmGameDTOAttributes {
  id: number;
}
