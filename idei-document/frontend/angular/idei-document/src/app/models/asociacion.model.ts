export interface AsociacionModel {
  id: string;
  tipoDocumentoIdentidad: string;
  nDocumento: string;
  nombre: string;
  estado: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}