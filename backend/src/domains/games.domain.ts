interface CommonGameAttributes {
  name: string;
  description: string;
  developedBy: string;
  year: number;
  minimumAge: number;
}

export interface Game extends CommonGameAttributes {
  id: number;
}

export interface CreateGame extends CommonGameAttributes {}

export interface UpdateGame extends CommonGameAttributes {
  id: number;
}
