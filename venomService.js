const venom = require('venom-bot');

function iniciarVenom() {
  return venom.create(
    'session-name',
    undefined,
    (statusSession, session) => {
      console.log('📶 Status da sessão:', statusSession);
    },
    {
      headless: true,
      browserArgs: ['--no-sandbox', '--disable-setuid-sandbox', '--headless=new']
      // ❌ Não defina executablePath aqui, o venom usará o Chromium interno compatível
    }
  ).then((client) => {
    global.clientVenom = client;
    console.log('✅ Venom iniciado com sucesso');
    return client;
  }).catch((erro) => {
    console.error('❌ Erro ao iniciar o Venom:', erro);
    throw erro;
  });
}

module.exports = {
  iniciarVenom,
  enviarViaVenom: async (numero, mensagem) => {
    if (!global.clientVenom) throw new Error('Venom não está inicializado');
    await global.clientVenom.sendText(numero, mensagem);
    return { sucesso: true };
  }
};
