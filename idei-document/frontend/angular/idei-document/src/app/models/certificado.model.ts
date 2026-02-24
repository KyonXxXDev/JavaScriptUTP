export interface CertificadoModel {
  id: string;
  tipo: 'LE' | 'DH';
  cantidad: number;
  tiendaId: string;
  fechaEmision: string;
  fechaVencimiento: string;
  estado: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}