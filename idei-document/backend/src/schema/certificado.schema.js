export class Certificado {
    constructor({ data }) {
        const {
            tipo,// 'LE' | 'DH'
            tiendaId,
            cantidad,
            template,
            fechaEmision
        } = data;

        this.id = crypto.randomUUID();
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.tiendaId = tiendaId;
        this.template = template;
        this.fechaEmision = fechaEmision;

        this.estado = true;
        this.createdAt = new Date();
        this.updatedAt = null;
    }
}