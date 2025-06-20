const { Client } = require('pg');

// 🔒 Substitua com seus dados do Railway (HOST, USER, DB, PASSWORD, PORT)
const client = new Client({
  host: 'SEU_HOST',
  user: 'SEU_USUARIO',
  database: 'SEU_BANCO',
  password: 'SUA_SENHA',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

const criarTabela = async () => {
  try {
    await client.connect();

    const query = `
      CREATE TABLE IF NOT EXISTS agendamentos (
        id SERIAL PRIMARY KEY,
        numero TEXT,
        cliente TEXT,
        mensagem TEXT,
        data_envio_texto TEXT,
        ciclo TEXT,
        enviado BOOLEAN DEFAULT false,
        visivel BOOLEAN DEFAULT true,
        oculto BOOLEAN DEFAULT false
      );
    `;

    await client.query(query);
    console.log('✅ Tabela criada com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao criar a tabela:', err);
  } finally {
    await client.end();
  }
};

criarTabela();
