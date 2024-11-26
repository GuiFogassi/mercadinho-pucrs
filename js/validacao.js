document.addEventListener('DOMContentLoaded', function () {
  // Validação do formulário
  const form = document.getElementById('formCadastro');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Validação do CPF
    const cpf = document.getElementById('cpf').value;
    if (!validarCPF(cpf)) {
      alert('CPF inválido!');
      return;
    }

    // Validação da data de agendamento
    const data = document.getElementById('dataAgendamento').value;
    if (!validarData(data)) {
      alert('Data inválida! Selecione uma data futura.');
      return;
    }

    alert('Cadastro realizado com sucesso!');
    form.reset();
    form.classList.remove('was-validated');
  });

  // Máscara para CPF
  const cpfInput = document.getElementById('cpf');
  cpfInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
  });

  // Adiciona validação de CEP
  const cepInput = document.getElementById('cep');
  cepInput.addEventListener('blur', async function (e) {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          document.getElementById('rua').value = data.logradouro;
          document.getElementById('bairro').value = data.bairro;
          document.getElementById('cidade').value = data.localidade;
          document.getElementById('estado').value = data.uf;
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  });

  // Validação de horário de agendamento
  document.getElementById('dataAgendamento').addEventListener('change', function (e) {
    const dataAgendamento = new Date(e.target.value);
    const hoje = new Date();

    if (dataAgendamento < hoje) {
      alert('Por favor, selecione uma data futura.');
      e.target.value = '';
    }
  });

  // Máscara para telefone
  const telefoneInput = document.getElementById('telefone');
  telefoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 10) {
      value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }

    e.target.value = value;
  });
});

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11) return false;

  // Implementar validação completa do CPF aqui
  return true;
}

function validarData(data) {
  const dataSelecionada = new Date(data);
  const hoje = new Date();
  return dataSelecionada > hoje;
} 