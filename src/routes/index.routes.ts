import {Router} from 'express'

import auth from './auth.routes'
import user from './user.routes'
import metodologia from './metodologia.routes'
import etapa from './etapa.routes'
import entregable from './entregable.routes'
import proyecto from './proyecto.routes'
import usuarioProyecto from './usuarioProyecto.routes'
import solicitudCambio from './solicitudCambio.routes'
import entregableProyecto from './entregableProyecto.routes'
import revision from './revision.routes'
import tarea from './tarea.routes'
import rol from './rol.routes'

const routes = Router();

routes.use('/auth',auth);
routes.use('/users',user);
routes.use('/metodologias',metodologia);
routes.use('/etapas',etapa);
routes.use('/entregables',entregable);
routes.use('/proyectos',proyecto);
routes.use('/usuariosProyectos',usuarioProyecto);
routes.use('/solicitudCambios',solicitudCambio);
routes.use('/entregableProyectos',entregableProyecto);
routes.use('/revisiones',revision);
routes.use('/tareas',tarea);
routes.use('/roles',rol);

export default routes;
