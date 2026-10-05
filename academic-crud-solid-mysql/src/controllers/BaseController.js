import { validateBody, validateId } from '../utils/validate.js';

export class BaseController {
  constructor(service, entity) {
    this.service = service;
    this.entity = entity;
  }

  getAll = async (req, res) => {
    const records = await this.service.findAll();

    res.status(200).json({
      success: true,
      data: records
    });
  };

  getById = async (req, res) => {
    const id = validateId(req.params.id);
    const record = await this.service.findById(id);

    res.status(200).json({
      success: true,
      data: record
    });
  };

  create = async (req, res) => {
    const data = validateBody(req.body, this.entity.fields);
    const record = await this.service.create(data);

    res.status(201).json({
      success: true,
      message: 'Registro creado correctamente.',
      data: record
    });
  };

  update = async (req, res) => {
    const id = validateId(req.params.id);
    const data = validateBody(req.body, this.entity.fields, true);
    const record = await this.service.update(id, data);

    res.status(200).json({
      success: true,
      message: 'Registro actualizado correctamente.',
      data: record
    });
  };

  delete = async (req, res) => {
    const id = validateId(req.params.id);
    await this.service.delete(id);

    res.status(200).json({
      success: true,
      message: 'Registro eliminado correctamente.'
    });
  };
}
