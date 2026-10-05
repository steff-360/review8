import express from 'express';
import { BaseRepository } from './repositories/BaseRepository.js';
import { BaseService } from './services/BaseService.js';
import { BaseController } from './controllers/BaseController.js';
import { createCrudRouter } from './routes/createCrudRouter.js';
import { entities } from './config/entities.js';
import { errorHandler } from './middlewares/errorHandler.js';

export function createApp({ db }) {
  const app = express();

  app.use(express.json());

  app.get('/api/v1/health', (req, res) => {
    res.json({
      success: true,
      message: 'API funcionando correctamente.'
    });
  });

  for (const [resource, entity] of Object.entries(entities)) {
    const repository = new BaseRepository(db, entity);
    const service = new BaseService(repository, entity);
    const controller = new BaseController(service, entity);

    app.use(
      `/api/v1/${resource}`,
      createCrudRouter(controller)
    );
  }

  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Ruta no encontrada.'
    });
  });

  app.use(errorHandler);

  return app;
}
