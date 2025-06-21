require('dotenv').config(); // garantir que o .env será lido
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function criarTabelaSession() {
  const query = `
    CREATE TABLE IF NOT EXISTS "session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    );
    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");
    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
  `;

  try {
    await pool.query(query);
    console.log('✅ Tabela "session" criada com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar tabela "session":', error);
  } finally {
    await pool.end();
  }
}

criarTabelaSession();
    