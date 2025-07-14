document.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const situacaoScreen = document.getElementById('situacaoScreen');
  const contatoScreen = document.getElementById('contatoScreen');
  const thankYouScreen = document.getElementById('thankYouScreen');
  const loadingSpinner = document.getElementById('loadingSpinner');

  const welcomeForm = document.getElementById('welcomeForm');
  const situacaoForm = document.getElementById('situacaoForm');
  const contatoForm = document.getElementById('contatoForm');

  const nomeInput = document.getElementById('nome');
  const areaSelect = document.getElementById('area');
  const situacaoSelect = document.getElementById('situacao');
  const subtipoContainer = document.getElementById('subtipoContainer');
  const outrosInputContainer = document.getElementById('outrosInputContainer');
  const outrosInput = document.getElementById('outrosInput');
  const telefoneInput = document.getElementById('telefone');
  const restartBtn = document.getElementById('restartBtn');

  let userData = { nome: '', area: '', situacao: '', detalheOutros: '', telefone: '' };

  const showSpinner = () => loadingSpinner.classList.remove('hidden-spinner');
  const hideSpinner = () => loadingSpinner.classList.add('hidden-spinner');

  const capitalize = text => text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  nomeInput.addEventListener('input', () => {
    const pos = nomeInput.selectionStart;
    nomeInput.value = capitalize(nomeInput.value);
    nomeInput.setSelectionRange(pos, pos);
  });

  telefoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    e.target.value = v.length <= 10
      ? `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6, 10)}`
      : `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
  });

  welcomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    if (nome.length < 2) return alert('Digite um nome válido.');
    userData.nome = capitalize(nome);
    welcomeScreen.classList.add('hidden');
    situacaoScreen.classList.remove('hidden');
  });

  areaSelect.addEventListener('change', () => {
    const area = areaSelect.value;
    userData.area = area;
    if (area === 'previdenciario') {
      subtipoContainer.classList.remove('hidden');
      outrosInputContainer.classList.add('hidden');
      outrosInput.value = '';
    } else {
      subtipoContainer.classList.add('hidden');
      situacaoSelect.value = '';
      if (area === 'outros' || area === 'civel' || area === 'trabalhista') {
        outrosInputContainer.classList.remove('hidden');
      } else {
        outrosInputContainer.classList.add('hidden');
        outrosInput.value = '';
      }
    }
  });

  situacaoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const area = areaSelect.value;
    const situacao = situacaoSelect.value;

    if (!area) return alert('Selecione uma área.');
    if (area === 'previdenciario' && !situacao) return alert('Selecione o tipo.');
    if ((area === 'outros' || area === 'civel' || area === 'trabalhista') && outrosInput.value.trim() === '') {
      return alert('Descreva sua situação.');
    }

    userData.situacao = area === 'previdenciario' ? situacao : area;
    userData.detalheOutros = (area === 'outros' || area === 'civel' || area === 'trabalhista') ? outrosInput.value.trim() : '';

    situacaoScreen.classList.add('hidden');
    contatoScreen.classList.remove('hidden');
  });

  contatoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const telefone = telefoneInput.value.replace(/\D/g, '');
    if (telefone.length < 10 || telefone.length > 11) return alert('Digite um telefone válido.');
    userData.telefone = telefone;

    // Simulação de envio
    console.log('Simulando envio de dados:', userData);
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      contatoScreen.classList.add('hidden');
      thankYouScreen.classList.remove('hidden');
    }, 1000);
  });

  restartBtn.addEventListener('click', () => {
    userData = { nome: '', area: '', situacao: '', detalheOutros: '', telefone: '' };
    welcomeForm.reset();
    situacaoForm.reset();
    contatoForm.reset();
    subtipoContainer.classList.add('hidden');
    outrosInputContainer.classList.add('hidden');
    thankYouScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
  });
});
