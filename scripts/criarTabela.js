require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necessário no Railway
  }
});

async function criarTabela() {
  const query = `
    CREATE TABLE IF NOT EXISTS agendamentos (
      id SERIAL PRIMARY KEY,
      numero TEXT NOT NULL,
      cliente TEXT,
      mensagem TEXT NOT NULL,
      data_envio_texto TEXT NOT NULL,
      ciclo TEXT,
      enviado BOOLEAN DEFAULT false,
      visivel BOOLEAN DEFAULT true,
      oculto BOOLEAN DEFAULT false
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ Tabela "agendamentos" criada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar a tabela:', error);
  } finally {
    await pool.end();
  }
}

criarTabela();
