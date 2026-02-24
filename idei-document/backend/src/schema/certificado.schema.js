export class Certificado {
    constructor({ data }) {
        const {
            tipo,
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
        this.fechaEmision = new Date(fechaEmision);

        const fechaVencimiento = new Date(this.fechaEmision);
        fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 1);
        this.fechaVencimiento = fechaVencimiento;

        this.estado = true;
        this.createdAt = new Date();
        this.updatedAt = null;
    }
}