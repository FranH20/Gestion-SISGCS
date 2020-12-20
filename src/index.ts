import 'reflect-metadata';
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {createConnection} from 'typeorm'

import Allroutes from './routes/index.routes'
const PORT = process.env.PORT || 3000;

const app = express()
createConnection().catch(error => console.log(`Gestor de base de datos MySql desactivada ${error}`));;
//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// rutas
app.use('/',Allroutes);

app.listen(PORT, () => console.log(`Server corriendo en el puerto ${PORT}`));