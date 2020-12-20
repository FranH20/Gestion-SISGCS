import {Router} from 'express'

import auth from './auth.routes'
import user from './user.routes'
import metodologia from './metodologia.routes'
import etapa from './etapa.routes'
import entregable from './entregable.routes'
import proyecto from './proyecto.routes'
import usuarioProyecto from './usuarioProyecto.routes'
import solicitudCambios from './solicitudCambio.routes'

const routes = Router();

routes.use('/auth',auth);
routes.use('/users',user);
routes.use('/metodologias',metodologia);
routes.use('/etapas',etapa);
routes.use('/entregables',entregable);
routes.use('/proyectos',proyecto);
routes.use('/usuariosProyectos',usuarioProyecto);
routes.use('/solicitudCambios',solicitudCambios);

export default routes;
