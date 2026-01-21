export class Tienda {
  constructor({ data }) {
    const {
      nombre,
      cantidad,
      direccion,
      distrito,
      provincia,
      departamento,
      fecha
    } = data;

    this.nombre = nombre;
    this.cantidad = cantidad;
    this.direccion = direccion;
    this.distrito = distrito;
    this.provincia = provincia;
    this.departamento = departamento;
    this.fecha = fecha;

    this.createdAt = new Date();
    this.updatedAt = null;
  }
  
}