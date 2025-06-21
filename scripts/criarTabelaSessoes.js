const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function criarTabelaSession() {
  const criarTabelaSQL = `
    CREATE TABLE IF NOT EXISTS "session" (
      "sid" varchar NOT NULL,
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    );

    ALTER TABLE "session" ADD CONSTRAINT IF NOT EXISTS "session_pkey" PRIMARY KEY ("sid");

    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
  `;

  try {
    await pool.query(criarTabelaSQL);
    console.log('✅ Tabela "session" criada com sucesso (ou já existia).');
  } catch (err) {
    console.error('❌ Erro ao criar tabela "session":', err);
  } finally {
    await pool.end();
  }
}

criarTabelaSession();
