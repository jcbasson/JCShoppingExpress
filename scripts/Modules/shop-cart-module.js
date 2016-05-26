define([],
function () {
    var shopCartModule = function (sandbox, shopStore, cartStore) {
        var thisModule;

        return {
            init: function () {
                thisModule = this;

                lblDealersScore = sandbox.find("#lblDealersScore")[0];

                dealerCardDeck = sandbox.find("#dealerCardDeck")[0];
              
                dealersCardDeckTemplate = sandbox.find("#dealers-carddeck-template")[0];

                sandbox.listen({
                    "init-dealerscards": thisModule.initializeDealersCards,
                    "execute-dealersturn": thisModule.executeDealersTurn
                });
            },
            destroy: function () {
                sandbox.ignore(["init-dealerscards", "execute-dealersturn"]);
            }
        }
    }
    return shopCartModule;
});