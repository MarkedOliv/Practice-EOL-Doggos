const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoute = require('./middlewares/dogs.routes.js');
const temperamentsRoute = require('./middlewares/temperaments.routes.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogsRoute);
router.use("/temperaments", temperamentsRoute);

module.exports = router;
