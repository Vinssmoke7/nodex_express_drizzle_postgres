import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

expand(dotenv.config());

import app from './app.js';
import { pool } from './config/db.js';

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    const client = await pool.connect();
    client.release();
    console.log('Conexión exitosa a PostgreSQL mediante Drizzle ORM.');
    
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    await pool.end();
    process.exit(1);
  }
}

main();