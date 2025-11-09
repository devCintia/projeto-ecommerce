/*
Objetivo 1 - quando clicar no botão de adicionar ao carrinho:
    - atualizar o contador
    - adicionar o produto no localStorage
    - atualizar a tabela HTML do carrinho

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
    });
});

function salvarProdutosNoCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function obterProdutosDoCarrinho() {
    const produtos = localStorage.getItem('carrinho');
    return produtos ? JSON.parse(produtos) : [];

}



// Objetivo 2 - remover produtos do carrinho:
//     - ouvir o botão de deletar
//     - remover do localStorage
//     - atualizar o DOM e o total

// Objetivo 3 - atualizar valores do carrinho:
//     - ouvir mudanças de quantidade
//     - recalcular total individual
//     - recalcular total geral


