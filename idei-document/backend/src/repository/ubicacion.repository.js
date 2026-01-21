import { UBICACIONES } from '../utils/const.js'

export class UbicacionRepository {
  async getAll() {
    const data = UBICACIONES;
    return data;
  }

  async getDepartamentos() {
    const { departamentos } = await this.getAll();
    return departamentos;
  }

  async getProvinciasByDepartamento({ departamentoId }) {
    const { provincias } = await this.getAll();
    return provincias.filter(p => p.department_id === departamentoId);
  }

  async getDistritosByProvincia({ provinciaId }) {
    const { distritos } = await this.getAll();
    return distritos.filter(d => d.province_id === provinciaId);
  }
}