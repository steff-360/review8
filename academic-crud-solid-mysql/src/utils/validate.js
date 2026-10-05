import { AppError } from './AppError.js';

export function validateId(id) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new AppError('El ID debe ser un número entero positivo.', 400);
  }

  return numericId;
}

export function validateBody(body, fields, partial = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new AppError('El cuerpo de la petición debe ser un objeto JSON.', 400);
  }

  const data = {};

  for (const field of fields) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      data[field] = body[field];
    }
  }

  if (!partial) {
    const missing = fields.filter(
      (field) => body[field] === undefined
    );

    if (missing.length > 0) {
      throw new AppError(
        `Faltan campos obligatorios: ${missing.join(', ')}`,
        400
      );
    }
  }

  if (Object.keys(data).length === 0) {
    throw new AppError('No se recibieron campos válidos.', 400);
  }

  return data;
}
