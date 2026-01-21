import rawDepartamentos from '../mocks/departamentos.json' with {type: 'json'};
import rawProvincias from '../mocks/provincias.json' with {type: 'json'};
import rawDistritos from '../mocks/distritos.json' with {type: 'json'};

export const UBICACIONES = {
    "departamentos": rawDepartamentos,
    "provincias": rawProvincias,
    "distritos": rawDistritos
}

// setTimeout(()=>{

// }, 4000)
// console.log(rawDistritos.filter(d => d.province_id === "1501"))