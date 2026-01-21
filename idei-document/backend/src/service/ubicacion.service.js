import { UbicacionRepository } from "../repository/ubicacion.repository.js";


export class UbicacionService {
  constructor() {
    this.repo = new UbicacionRepository();
  }

  getDepartamentos() {
    return this.repo.getDepartamentos();
  }

  getProvincias({ departamentoId }) {
    return this.repo.getProvinciasByDepartamento({ departamentoId });
  }

  getDistritos({ provinciaId }) {
    return this.repo.getDistritosByProvincia({ provinciaId });
  }
}