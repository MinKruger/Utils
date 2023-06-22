document.addEventListener("DOMContentLoaded", function() {
    const wishlist = $("#wishlist");

    // Exemplo de dados da lista de desejos (pode ser substituído por dados reais)
    let games = [
        { title: "Jogo 1", id: 1 },
        { title: "Jogo 2", id: 2 },
        { title: "Jogo 3", id: 3 },
        { title: "Jogo 4", id: 4 },
        { title: "Jogo 5", id: 5 },
        { title: "Jogo 6", id: 6 },
        { title: "Jogo 7", id: 7 },
        { title: "Jogo 8", id: 8 },
        { title: "Jogo 9", id: 9 },
        { title: "Jogo 10", id: 10 },
        { title: "Jogo 11", id: 11 },
        { title: "Jogo 12", id: 12 },
        { title: "Jogo 13", id: 13 },
        { title: "Jogo 14", id: 14 },
        // Adicione mais entradas aqui...
    ];

    // Função para renderizar a lista de desejos
    function renderWishlist() {
        wishlist.empty();
        games.forEach(function(game, index) {
            const li = $('<li>', { 'data-id': game.id }).text(game.title);
            const num = $('<span>').addClass('item-number').text(index + 1);
            li.prepend(num);
            wishlist.append(li);
            game.position = index; // Atualiza a posição do item na lista
        });
    }

    // Inicializa o recurso de arrastar e soltar usando a biblioteca Sortable do jQuery UI
    wishlist.sortable({
        update: function(event, ui) {
            const updatedOrder = wishlist.sortable("toArray", { attribute: "data-id" });
            games = games.sort(function(a, b) {
                const aIndex = updatedOrder.indexOf(a.id.toString());
                const bIndex = updatedOrder.indexOf(b.id.toString());
                return aIndex - bIndex;
            });
            renderWishlist(); // Renderiza a lista de desejos atualizada
        }
    });

    // Adiciona os jogos à lista de desejos
    renderWishlist();
});