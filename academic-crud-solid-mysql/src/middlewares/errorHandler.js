export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'Ya existe un registro con uno de los valores únicos enviados.'
    });
  }

  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({
      success: false,
      message: 'Una de las relaciones enviadas no existe.'
    });
  }

  if (error.code === 'ER_ROW_IS_REFERENCED_2') {
    return res.status(409).json({
      success: false,
      message: 'No se puede eliminar porque el registro está siendo utilizado.'
    });
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? 'Ocurrió un error interno del servidor.'
        : error.message
  });
}
