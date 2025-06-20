require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function criarTabelaSessoes() {
  const query = `
    CREATE TABLE IF NOT EXISTS session (
      sid VARCHAR NOT NULL PRIMARY KEY,
      sess JSON NOT NULL,
      expire TIMESTAMP NOT NULL
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ Tabela "session" criada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabela de sessão:', error);
  } finally {
    await pool.end();
  }
}

criarTabelaSessoes();
