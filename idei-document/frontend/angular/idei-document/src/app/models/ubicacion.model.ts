export interface DepartamentoModel {
    id: string,
    name: string
}

export interface ProvinciaModel {
    id: string,
    name: string
    department_id: string
}

export interface DistritoModel {
    id: string,
    name: string,
    province_id: string,
    department_id: string
}