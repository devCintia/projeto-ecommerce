/*
    Passo 1 - Adicionar +1 no ícone do carrinho. Para isso, pegar os botões de adicionar ao carrinho no html.
*/

const botaoAdicionar = document.querySelectorAll('.adicionar-ao-carrinho');
const contadorCarrinho = document.getElementById('contador-carrinho');

botaoAdicionar.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        // Passo 2 - Atualizar o contador
        // let quantidade = parseInt(contadorCarrinho.textContent) || 0;
        // contadorCarrinho.textContent = quantidade + 1;

        // Passo 3 - Adicionar o produto no localStorage
        const elementoProduto = evento.target.closest('.produto');
        const id = elementoProduto.dataset.id;
        const nomeElemento = elementoProduto.querySelector('figcaption');
        const nome = nomeElemento ? nomeElemento.textContent : '';
        const imagem = elementoProduto.querySelector('img').getAttribute('src');
        const preco = parseFloat(elementoProduto.querySelector('.preco').textContent.replace('R$ ', '').replace(".", "").replace(',', '.'));
        // const tamanho = elementoProduto.querySelector('.informacoes span:nth-child(2)').textContent;

        //buscar a lista de produtos no localStorage
        const carrinho = obterProdutosDoCarrinho();
        //verificar se o produto já existe no carrinho
        const produtoExistente = carrinho.find(produto => produto.id === id);
        if (produtoExistente) {
            produtoExistente.quantidade++;
        } else {
            const produto = {
                id,
                nome,
                imagem,
                preco,
                quantidade: 1
            };
            carrinho.push(produto);
        }
        salvarProdutosNoCarrinho(carrinho);
        atualizarCarrinhoETabela();
    });
});

function salvarProdutosNoCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function obterProdutosDoCarrinho() {
    const produtos = localStorage.getItem('carrinho');
    return produtos ? JSON.parse(produtos) : [];
}


//Passo 4: Atualizar o contador do carrinho de compras
function atualizarContadorCarrinho() {
    const carrinho = obterProdutosDoCarrinho();
    let total = 0

    carrinho.forEach(produto => {
        total += produto.quantidade;
    });

    document.getElementById('contador-carrinho').textContent = total;
}

//Passo 5: Renderizar a tabela do carrinho de compras
function renderizarTabelaCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    const corpoTabela = document.querySelector('#modal-1-content table tbody');
    corpoTabela.innerHTML = '';

    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td class="td-produto"><img src="${produto.imagem}" alt="${produto.nome}" /></td>
                <td>${produto.nome}</td>
                <td class="td-preco-unitario">R$${produto.preco.toFixed(2).replace('.', ',')}</td>
                <td class="td-quantidade"><input type="number" class="input-quantidade" data-id="${produto.id}" value="${produto.quantidade}" min="1" /></td>
                <td class= "td-preco-total">R$ ${(produto.preco * produto.quantidade).toFixed(2).replace('.', ',')}</td>
                <td><button class="btn-remover" data-id="${produto.id}" id="deletar"></button></td> 
            `;
        corpoTabela.appendChild(tr);
    });
}

//Remover produtos do carrinho. Pegar o botão e deletar do HTML.
const corpoTabela = document.querySelector('#modal-1-content table tbody');
corpoTabela.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('btn-remover')) {
        const id = evento.target.dataset.id;
        removerProdutoDoCarrinho(id);
    }
})

function removerProdutoDoCarrinho(id) {
    const produtos = obterProdutosDoCarrinho();
    const carrinhoAtualizado = produtos.filter(produto => produto.id !== id);
    salvarProdutosNoCarrinho(carrinhoAtualizado);
    atualizarCarrinhoETabela();
}

//Atualizar o valor total do produto e atualizar o valor do carrinho ao alterar a quantidade
corpoTabela.addEventListener('input', (evento) => {
    if (evento.target.classList.contains("input-quantidade")) {
        const produtos = obterProdutosDoCarrinho();
        const produto = produtos.find(produto => produto.id === evento.target.dataset.id);
        let novaQuantidade = parseInt(evento.target.value);
        if (produto) {
            produto.quantidade = novaQuantidade;
            salvarProdutosNoCarrinho(produtos);
            atualizarCarrinhoETabela();
        }
    }
});

//Atualizar o valor total do carrinho
function atualizarValorTotalCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    let total = 0;
    produtos.forEach(produto => {
        total += produto.preco * produto.quantidade;
    });

    document.querySelector('#total-carrinho').textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

function atualizarCarrinhoETabela() {
    atualizarContadorCarrinho();
    renderizarTabelaCarrinho();
    atualizarValorTotalCarrinho();
}

atualizarCarrinhoETabela();