const venom = require('venom-bot');

let client;

async function iniciarVenom() {
  if (!client) {
    client = await venom.create(
      'connectcomercenaooficial-teste',
      (base64Qr, asciiQR) => {
        console.log('Escaneie o QR Code abaixo para autenticar o Venom Bot:');
        console.log(asciiQR);
      },
      (statusSession, session) => {
        console.log('Status da sessão Venom:', statusSession);
      },
      {
        logQR: false,
        browserArgs: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    );
  }
  return client;
}

async function enviarViaVenom(numero, mensagem) {
  if (!client) throw new Error('Venom client não iniciado.');
  const numFormatado = numero.replace(/\D/g, '');
  try {
    await client.sendText(numFormatado, mensagem);
    return { sucesso: true };
  } catch (error) {
    return { sucesso: false, erro: error.message };
  }
}

module.exports = { iniciarVenom, enviarViaVenom };
