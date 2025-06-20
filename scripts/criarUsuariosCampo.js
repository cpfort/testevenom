require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function criarTabelaUsuarios() {
  const query = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      usuario TEXT UNIQUE NOT NULL,
      senha_hash TEXT NOT NULL,
      nivel TEXT DEFAULT 'usuario'
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ Tabela "usuarios" criada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabela "usuarios":', error);
  } finally {
    await pool.end();
  }
}

criarTabelaUsuarios();
