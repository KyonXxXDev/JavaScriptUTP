import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import TiendasRoutes from './routes/tiendas.route.js';
import UbicacionesRoutes from './routes/ubicaciones.route.js';
import CertificadoRoutes from './routes/certificado.route.js';
import AsociacionRoutes from './routes/asociacion.route.js';
import DispositivoRoutes from './routes/dispositivo.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
}));
app.disable('x-powered-by');
app.use(express.json());
app.use(express.static(join(__dirname, 'web')));

app.get("/", (request, response) => {
    response.sendFile(join(__dirname, 'web', './pages/index.html'));
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
app.use("/certificado", CertificadoRoutes)
app.use("/asociacion", AsociacionRoutes)
app.use("/dispositivo", DispositivoRoutes)
app.use("/ubicacion", UbicacionesRoutes)

app.listen(process.env.PORT, () => {
    console.info(`server listening on port http://localhost:${process.env.PORT}`);
});