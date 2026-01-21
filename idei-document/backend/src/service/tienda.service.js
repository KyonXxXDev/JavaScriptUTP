import { TiendaRepository } from "../repository/tienda.repository.js";

export class TiendaService {
  constructor() {
    this.repo = new TiendaRepository();
  }

  getAll() {
    return this.repo.findAll();
  }

  getById({ id }) {
    return this.repo.findById({id});
  }

  create({ data }) {
    if (!data.nombre || !data.cantidad) {
      throw new Error("Nombre y cantidad son obligatorios");
    }
    return this.repo.create({ data });
  }

  update({ id, data }) {
    return this.repo.update({ id, data });
  }

  delete({ id }) {
    return this.repo.delete({ id });
  }
}