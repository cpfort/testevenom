const venom = require('venom-bot');

let clientVenom = null;

async function iniciarVenom() {
  try {
    const client = await venom.create({
      session: 'connectcomerce',
      multidevice: true
    });

    clientVenom = client;
    console.log('✅ Venom conectado!');
  } catch (err) {
    console.error('❌ Erro ao iniciar o Venom:', err);
    throw err;
  }
}

async function enviarViaVenom(numero, mensagem) {
  if (!clientVenom) {
    return { sucesso: false, erro: 'Venom não está conectado' };
  }

  try {
    await clientVenom.sendText(numero, mensagem);
    return { sucesso: true };
  } catch (erro) {
    return { sucesso: false, erro };
  }
}

module.exports = {
  iniciarVenom,
  enviarViaVenom
};
