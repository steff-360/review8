import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';

export function createCrudRouter(controller) {
  const router = Router();

  router.get('/', asyncHandler(controller.getAll));
  router.get('/:id', asyncHandler(controller.getById));
  router.post('/', asyncHandler(controller.create));
  router.put('/:id', asyncHandler(controller.update));
  router.delete('/:id', asyncHandler(controller.delete));

  return router;
}
