export class Dispositivo {
    constructor({ data }) {
        const {
            tipo,
            codigo,
            tiendaId
        } = data;

        this.id = crypto.randomUUID();
        this.tipo = tipo;
        this.codigo = codigo;
        this.tiendaId = tiendaId;

        this.estado = true;
        this.createdAt = new Date();
        this.updatedAt = null;
    }
}