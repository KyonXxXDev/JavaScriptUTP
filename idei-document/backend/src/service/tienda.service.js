import { AsociacionRepository } from "../repository/asociacion.repository.js";
import { TiendaRepository } from "../repository/tienda.repository.js";

export class TiendaService {
  constructor() {
    this.repo = new TiendaRepository();
    this.asociacionRepo = new AsociacionRepository();
  }

  getAll() {
    return this.repo.findAll();
  }

  getById({ id }) {
    return this.repo.findById({ id });
  }

  async create({ data }) {
    const {
      nombre,
      direccion,
      distrito,
      provincia,
      departamento,
      asociacionId
    } = data;

    if (!nombre || !direccion || !asociacionId || !distrito || !provincia || !departamento ) {
      throw new Error("Nombre, dirección y asociación son obligatorios");
    }

    const asociacion = await this.asociacionRepo.findById({ id: asociacionId });
    if (!asociacion) {
      throw new Error("La asociación no existe o está inactiva");
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