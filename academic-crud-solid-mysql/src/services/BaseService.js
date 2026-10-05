import { AppError } from '../utils/AppError.js';

export class BaseService {
  constructor(repository, entity) {
    this.repository = repository;
    this.entity = entity;
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id) {
    const record = await this.repository.findById(id);

    if (!record) {
      throw new AppError(
        `No se encontró el registro con ID ${id}.`,
        404
      );
    }

    return record;
  }

  async create(data) {
    return this.repository.create(data);
  }

  async update(id, data) {
    const record = await this.repository.update(id, data);

    if (!record) {
      throw new AppError(
        `No se encontró el registro con ID ${id}.`,
        404
      );
    }

    return record;
  }

  async delete(id) {
    const deleted = await this.repository.delete(id);

    if (!deleted) {
      throw new AppError(
        `No se encontró el registro con ID ${id}.`,
        404
      );
    }

    return true;
  }
}
