export interface TiendaModel {
    id: string,
    nombre: string,
    direccion: string,
    distrito: string,
    provincia: string,
    departamento: string,
    asociacionId: string,
    estado: boolean,
    createdAt: Date,
    updatedAt: Date | null
}