let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();

  // Feedback visual
  const btnCarrinho = document.querySelector('#carrinho');
  btnCarrinho.classList.add('shake');
  setTimeout(() => btnCarrinho.classList.remove('shake'), 500);
}

function atualizarCarrinho() {
  const itensCarrinho = document.getElementById('itensCarrinho');
  const qtdItens = document.getElementById('qtdItens');
  const totalCarrinho = document.getElementById('totalCarrinho');

  itensCarrinho.innerHTML = '';

  if (carrinho.length === 0) {
    itensCarrinho.innerHTML = '<p class="text-muted">Seu carrinho está vazio</p>';
  } else {
    carrinho.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'item-carrinho';
      itemElement.innerHTML = `
        <div>
          <span class="item-nome">${item.nome}</span>
          <span class="item-preco">R$ ${item.preco.toFixed(2)}</span>
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="removerItem(${index})">
          <i class="fas fa-times"></i>
        </button>
      `;
      itensCarrinho.appendChild(itemElement);
    });
  }

  qtdItens.textContent = carrinho.length;
  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}\nRedirecionando para o cadastro...`);
  window.location.href = '#cadastro';
  carrinho = [];
  atualizarCarrinho();
} 