const venom = require('venom-bot');

function iniciarVenom() {
  return venom.create(
    'session-name',
    undefined,
    (statusSession, session) => {
      console.log('Status da sessão:', statusSession);
    },
    {
      headless: true,
      browserArgs: ['--no-sandbox', '--disable-setuid-sandbox', '--headless=new'],
      executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' // ou o path real do seu Chrome
    }
  ).then((client) => {
    global.clientVenom = client;
    console.log('✅ Venom iniciado com sucesso');
  }).catch((erro) => {
    console.error('❌ Erro ao iniciar o Venom:', erro);
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
