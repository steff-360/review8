# Academic CRUD - MySQL + Node.js + SOLID

Proyecto basado en el modelo de datos proporcionado.

Tecnologías:

- Node.js
- Express
- MySQL
- mysql2/promise
- JavaScript ES Modules
- async/await
- Promises
- Principios SOLID

## 1. Estructura

```text
src/
├── config/
│   ├── database.js
│   └── entities.js
├── controllers/
│   └── BaseController.js
├── middlewares/
│   └── errorHandler.js
├── repositories/
│   └── BaseRepository.js
├── routes/
│   └── createCrudRouter.js
├── services/
│   └── BaseService.js
├── utils/
│   ├── AppError.js
│   ├── asyncHandler.js
│   └── validate.js
├── app.js
└── server.js
```

## 2. Crear la base de datos

Abre MySQL Workbench o la terminal de MySQL y ejecuta:

```sql
SOURCE database/database.sql;
SOURCE database/seed.sql;
```

También puedes copiar y ejecutar primero `database/database.sql` y después `database/seed.sql`.

## 3. Configurar variables de entorno

Copia:

```text
.env.example
```

y crea:

```text
.env
```

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=academic_crud
DB_CONNECTION_LIMIT=10
```

Si tu usuario root no tiene contraseña, deja:

```env
DB_PASSWORD=
```

## 4. Instalar dependencias

Desde la carpeta del proyecto:

```bash
npm install
```

## 5. Ejecutar

Modo normal:

```bash
npm start
```

Modo desarrollo:

```bash
npm run dev
```

La API queda disponible en:

```text
http://localhost:3000
```

## 6. Probar

Primero:

```text
GET http://localhost:3000/api/v1/health
```

Después:

```text
GET http://localhost:3000/api/v1/students
```

## 7. Rutas CRUD

### Identification types

```text
GET    /api/v1/identificationTypes
GET    /api/v1/identificationTypes/:id
POST   /api/v1/identificationTypes
PUT    /api/v1/identificationTypes/:id
DELETE /api/v1/identificationTypes/:id
```

### Cities

```text
GET    /api/v1/cities
GET    /api/v1/cities/:id
POST   /api/v1/cities
PUT    /api/v1/cities/:id
DELETE /api/v1/cities/:id
```

### Students

```text
GET    /api/v1/students
GET    /api/v1/students/:id
POST   /api/v1/students
PUT    /api/v1/students/:id
DELETE /api/v1/students/:id
```

### Teachers

```text
GET    /api/v1/teachers
GET    /api/v1/teachers/:id
POST   /api/v1/teachers
PUT    /api/v1/teachers/:id
DELETE /api/v1/teachers/:id
```

### Classrooms

```text
GET    /api/v1/classrooms
GET    /api/v1/classrooms/:id
POST   /api/v1/classrooms
PUT    /api/v1/classrooms/:id
DELETE /api/v1/classrooms/:id
```

### Courses

```text
GET    /api/v1/courses
GET    /api/v1/courses/:id
POST   /api/v1/courses
PUT    /api/v1/courses/:id
DELETE /api/v1/courses/:id
```

### Course schedules

```text
GET    /api/v1/coursesSchedules
GET    /api/v1/coursesSchedules/:id
POST   /api/v1/coursesSchedules
PUT    /api/v1/coursesSchedules/:id
DELETE /api/v1/coursesSchedules/:id
```

### Inscriptions

```text
GET    /api/v1/inscriptions
GET    /api/v1/inscriptions/:id
POST   /api/v1/inscriptions
PUT    /api/v1/inscriptions/:id
DELETE /api/v1/inscriptions/:id
```

### Rates

```text
GET    /api/v1/rates
GET    /api/v1/rates/:id
POST   /api/v1/rates
PUT    /api/v1/rates/:id
DELETE /api/v1/rates/:id
```

### Topics

```text
GET    /api/v1/topics
GET    /api/v1/topics/:id
POST   /api/v1/topics
PUT    /api/v1/topics/:id
DELETE /api/v1/topics/:id
```

## 8. Ejemplo POST

```http
POST /api/v1/courses
Content-Type: application/json

{
  "code": "JS01",
  "description": "JavaScript básico",
  "intensity": 60,
  "weight": 3,
  "active": 1
}
```

## 9. Cómo está aplicado SOLID

### Single Responsibility Principle

Cada capa tiene una responsabilidad:

```text
Controller  -> recibe la petición y devuelve la respuesta.
Service     -> contiene la lógica de negocio.
Repository  -> trabaja con MySQL.
Routes      -> define las rutas.
Config      -> configura conexión y entidades.
Middleware  -> maneja errores.
```

### Open/Closed Principle

El CRUD base está en:

```text
BaseRepository
BaseService
BaseController
```

Para agregar una nueva tabla solamente se agrega su configuración en:

```text
src/config/entities.js
```

No es necesario duplicar toda la lógica CRUD.

### Liskov Substitution Principle

Las capas trabajan mediante contratos simples. Un repository que conserve las operaciones definidas puede sustituirse sin cambiar el controller.

### Interface Segregation Principle

No se creó una clase gigante con responsabilidades diferentes. Cada componente expone solamente las operaciones que necesita.

### Dependency Inversion Principle

`app.js` recibe la conexión:

```js
export function createApp({ db }) {
```

La aplicación no crea directamente una conexión dentro de cada controller o service.

Esto facilita pruebas y cambios futuros.

## 10. Promises

MySQL utiliza:

```js
import mysql from 'mysql2/promise';
```

Las consultas se ejecutan con:

```js
const [rows] = await this.db.execute(sql, params);
```

Por eso el proyecto trabaja de forma asíncrona usando Promises y `async/await`.

## 11. Flujo de una petición

Por ejemplo:

```text
POST /api/v1/students
        |
        v
     Router
        |
        v
   Controller
        |
        v
     Service
        |
        v
   Repository
        |
        v
      MySQL
```

La respuesta regresa por el mismo flujo:

```text
MySQL
  ↓
Repository
  ↓
Service
  ↓
Controller
  ↓
JSON
```

## 12. Importante

No se utiliza MongoDB.

La persistencia del proyecto se realiza exclusivamente con MySQL mediante `mysql2/promise`.
