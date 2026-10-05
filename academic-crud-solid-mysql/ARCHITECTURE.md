# Arquitectura

La aplicación sigue una arquitectura por capas:

```text
HTTP
 ↓
Routes
 ↓
Controllers
 ↓
Services
 ↓
Repositories
 ↓
MySQL
```

El CRUD común evita repetir código para las 10 entidades.

La configuración de las tablas está centralizada en `src/config/entities.js`.

No se permite que los controllers ejecuten SQL directamente.
