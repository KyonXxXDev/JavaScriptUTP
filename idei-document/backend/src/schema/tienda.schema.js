export class Tienda {
  constructor({ data }) {
    const {
      nombre,
      direccion,
      distrito,
      provincia,
      departamento,
      // cantidadLe = 0,
      // cantidadDh = 0,
      asociacionId
    } = data;

    this.id = crypto.randomUUID();
    this.nombre = nombre;
    this.direccion = direccion;
    this.distrito = distrito;
    this.provincia = provincia;
    this.departamento = departamento;
    // this.cantidadLe = cantidadLe;
    // this.cantidadDh = cantidadDh;
    this.asociacionId = asociacionId;
    this.estado = true;
    this.createdAt = new Date();
    this.updatedAt = null;
  }
}