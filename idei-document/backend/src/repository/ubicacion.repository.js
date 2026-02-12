import { UBICACIONES } from '../utils/const.js'

export class UbicacionRepository {
  
  async getAll() {
    return UBICACIONES;
  }

  async getDepartamentos() {
    const { departamentos } = await this.getAll();
    return departamentos;
  }

  async getDepartamentoById({ id }) {
    const departamentos = await this.getDepartamentos();
    return departamentos.find(dep => dep.id === id) || null;
  }

  async getProvinciasByDepartamento({ departamentoId }) {
    const { provincias } = await this.getAll();
    return provincias.filter(p => p.department_id === departamentoId);
  }

  async getProvinciaById({ id }) {
    const { provincias } = await this.getAll();
    return provincias.find(p => p.id === id) || null;
  }

  async getDistritosByProvincia({ provinciaId }) {
    const { distritos } = await this.getAll();
    return distritos.filter(d => d.province_id === provinciaId);
  }

  async getDistritoById({ id }) {
    const { distritos } = await this.getAll();
    return distritos.find(d => d.id === id) || null;
  }
}