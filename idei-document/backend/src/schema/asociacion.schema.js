export class Asociacion {
    constructor({ data }) {
        const {
            tipoDocumentoIdentidad,
            nDocumento,
            nombre
        } = data;

        this.id = crypto.randomUUID();
        this.tipoDocumentoIdentidad = tipoDocumentoIdentidad;
        this.nDocumento = nDocumento;
        this.nombre = nombre;

        this.estado = true;
        this.createdAt = new Date();
        this.updatedAt = null;
    }
}