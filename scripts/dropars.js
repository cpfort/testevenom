require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function apagarTabelaSession() {
  try {
    await pool.query('DROP TABLE IF EXISTS "session"');
    console.log('✅ Tabela "session" apagada com sucesso (ou não existia).');
  } catch (err) {
    console.error('❌ Erro ao apagar tabela "session":', err);
  } finally {
    await pool.end();
  }
}

apagarTabelaSession();
