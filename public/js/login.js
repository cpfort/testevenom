document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

try {
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(new FormData(form))
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error('❌ Erro ao interpretar resposta JSON do servidor');
  }

  if (!response.ok) {
    throw new Error(data?.error || '❌ Erro no login');
  }

  // ✅ Se chegou aqui, o login foi bem-sucedido
  alert('✅ Login realizado com sucesso!');
  window.location.href = '/dashboard'; // ou a rota que desejar redirecionar

} catch (erro) {
  console.error(erro);
  alert(erro.message);
}});
