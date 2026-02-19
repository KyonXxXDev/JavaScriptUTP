// function formatDate() {
//     const date = new Date();
//     const options = {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     };
//     console.log(date.toLocaleDateString('en-EN', options));
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     console.log(`${day}-${month}-${year}`)
// }

// formatDate()

function isBisiesto({year}){
    year = Number(year.trim());
    try {
        if(year % 4 === 0){
            if(year % 100 === 0){
                if(year % 400 === 0) console.info("Es bisiesto")
                else console.info("No es bisiesto")
            }else console.info("Es bisiesto")
        }else console.info("No es bisiesto")

    } catch (error) {
        console.error('Error in isBisiesto date', error.message)
    }
}
isBisiesto({year: "2124 "})

function formatDate({ fecha }) {
    try {
        const partes = fecha.split(/[-/.]/);

        const day = partes[0];
        const month = partes[1] - 1;
        if(month<0) throw new Error("Month 1 or 12")
        const year = partes[2];
        const date = new Date(year, month, day);
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
        console.log(date.toLocaleDateString('es-ES', options));
        return date.toLocaleDateString('es-ES', options)
    } catch (error) {
        console.error('Error formatting date', error.message)
    }
}

formatDate({ fecha: "12/12/2024" })


console.log("fechaEmision".toUpperCase().slice(0, 3))