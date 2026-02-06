import rawDepartamentos from '../mocks/departamento.json' with {type: 'json'};
import rawProvincias from '../mocks/provincia.json' with {type: 'json'};
import rawDistritos from '../mocks/distrito.json' with {type: 'json'};

export const UBICACIONES = {
    "departamentos": rawDepartamentos,
    "provincias": rawProvincias,
    "distritos": rawDistritos
}

// setTimeout(()=>{

// }, 4000)
// console.log(rawDistritos.filter(d => d.province_id === "1501"))