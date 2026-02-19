import rawDepartamentos from '../mocks/departamento.json' with {type: 'json'};
import rawProvincias from '../mocks/provincia.json' with {type: 'json'};
import rawDistritos from '../mocks/distrito.json' with {type: 'json'};

export const UBICACIONES = {
    "departamentos": rawDepartamentos,
    "provincias": rawProvincias,
    "distritos": rawDistritos
}

export const MONTHS = {
    1: "ENERO",
    2: "FEBRERO",
    3: "MARZO",
    4: "ABRIL",
    5: "MAYO",
    6: "JUNIO",
    7: "JULIO",
    8: "AGOSTO",
    9: "SETIEMBRE",
    10: "OCTUBRE",
    11: "NOVIEMBRE",
    12: "DICIEMBRE"
}

// setTimeout(()=>{

// }, 4000)
// console.log(rawDistritos.filter(d => d.province_id === "1501"))