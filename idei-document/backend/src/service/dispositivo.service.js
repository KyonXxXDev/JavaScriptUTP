import { DispositivoRepository } from "../repository/dispositivo.repository.js";
import { TiendaRepository } from "../repository/tienda.repository.js";

export class DispositivoService {
  constructor() {
    this.repo = new DispositivoRepository();
    this.tiendaRepo = new TiendaRepository();
  }

  getAll() {
    return this.repo.findAll();
  }

  getByTienda({ tiendaId, tipo }) {
    return this.repo.findByTienda({ tiendaId, tipo });
  }

  async create({ data }) {
    const { tipo, codigo, tiendaId } = data;

    if (!tipo || !codigo || !tiendaId) {
      throw new Error("Tipo, código y tienda son obligatorios");
    }

    if (!["LE", "DH"].includes(tipo)) {
      throw new Error("Tipo de dispositivo inválido");
    }

    const tienda = await this.tiendaRepo.findById({ id: tiendaId });
    if (!tienda) {
      throw new Error("La tienda no existe o está inactiva");
    }

    return this.repo.create({ data });
  }

  delete({ id }) {
    return this.repo.delete({ id });
  }
}