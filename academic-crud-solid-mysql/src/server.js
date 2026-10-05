import 'dotenv/config';
import { createDatabase } from './config/database.js';
import { createApp } from './app.js';

const db = createDatabase();
const app = createApp({ db });

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
