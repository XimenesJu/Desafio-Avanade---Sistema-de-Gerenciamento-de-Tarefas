export interface Tarefa {
  id?: number;
  titulo: string;
  descricao: string;
  status: string;
  dataCriacao?: Date;
}