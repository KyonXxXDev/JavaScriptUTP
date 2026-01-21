import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import TiendasRoutes from './routes/tiendas.route.js';
import UbicacionesRoutes from './routes/ubicaciones.route.js';

dotenv.config();
const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
    response.send('<h1>Hello world</h1>');
});

// app.post("/generate-certificado", async (req, res) => {
//     try {
//         const data = req.body;

//         const template = await fs.readFile('./src/document.docx');
//         const handler = new TemplateHandler();

//         const doc = await handler.process(template, data);

//         const fileName = `${data.tienda} - CERTIFICADO DE OPERATIVIDAD LUCES DE EMERGENCIA (MES-AÑO)-CERTIFICADO.docx`;
//         await fs.writeFile(`./src/output/${fileName}`, doc);
//         db.push()

//         res.json({ ok: true });
//     } catch (error) {
//         res.status(500).json({message: error.message})
//         console.error("Error en generate-certificado", error.message)
//     }
    
// });
app.use("/tienda", TiendasRoutes)
app.use("/ubicacion", UbicacionesRoutes)

app.listen(process.env.PORT, () => {
    console.info(`server listening on port http://localhost:${process.env.PORT}`);
});