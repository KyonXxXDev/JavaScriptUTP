import { AsociacionRepository } from "../repository/asociacion.repository.js";

export class AsociacionService {
  constructor() {
    this.repo = new AsociacionRepository();
  }

  getAll() {
    return this.repo.findAll();
  }

  getById({ id }) {
    return this.repo.findById({ id });
  }

  create({ data }) {
    const { nombre, tipoDocumentoIdentidad, nDocumento } = data;

    if (!nombre || !tipoDocumentoIdentidad || !nDocumento) {
      throw new Error("Nombre, tipo de documento y número son obligatorios");
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