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
    botao.addEventListener('click', () => {
        // Passo 2 - Atualizar o contador
        let quantidade = parseInt(contadorCarrinho.textContent) || 0;
        contadorCarrinho.textContent = quantidade + 1;

        // Passo 3 - Adicionar o produto no localStorage
        const produto = botao.closest('.produto');
        const id = produto.dataset.id;
        const nome = produto.querySelector('figcaption').textContent;
        const imagem = produto.querySelector('img').getAttribute('src');
        const preco = parseFloat(produto.querySelector('.preco').textContent.replace('R$ ', '').replace(".","").replace(',', '.'));        
        const tamanho = produto.querySelector('.informacoes span:nth-child(2)').textContent;

        const itemCarrinho = {
            id,
            nome,
            imagem,
            preco,
            tamanho,
            quantidade: 1
        };

        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const index = carrinho.findIndex(item => item.id === id);
        if (index > -1) {
            carrinho[index].quantidade++;
        } else {
            carrinho.push(itemCarrinho);
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Passo 4 - Atualizar a tabela HTML do carrinho
        atualizarTabelaCarrinho();
    });
});

// Objetivo 2 - remover produtos do carrinho:
//     - ouvir o botão de deletar
//     - remover do localStorage
//     - atualizar o DOM e o total

// Objetivo 3 - atualizar valores do carrinho:
//     - ouvir mudanças de quantidade
//     - recalcular total individual
//     - recalcular total geral


