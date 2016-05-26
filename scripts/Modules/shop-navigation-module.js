define([],
function () {
    var shopStageModule = function (sandbox, shopStore, cartStore) {
        var thisModule, btnShoppingCart, lblItemCount, shopstagelist;

        return {
            init: function () {
                thisModule = this;

                btnShoppingCart = sandbox.find("#btnShoppingCart")[0];

                lblItemCount = sandbox.find("#lblItemCount")[0];

                shopstagelist = sandbox.find(".shop-stage-list")[0];
               
                sandbox.addEvent(btnShoppingCart, "click", thisModule.showShoppingCart);

                sandbox.listen({
                    "update-itemcount": thisModule.updateItemCount,
                    "update-purchasestage": thisModule.updatePurchaseStage
                });
            },
            destroy: function () {

                sandbox.ignore(["update-itemcount", "update-purchasestage"]);

                sandbox.removeEvent(btnShoppingCart, "click", thisModule.showShoppingCart);
            },
            showShoppingCart: function () {

                sandbox.notify({
                    type: "display-shoppingcart",
                });
            },
            updateItemCount: function () {

                var cartItemCount = cartStore.getItemCount();

                sandbox.replaceContent(lblItemCount, cartItemCount);
            },
            updatePurchaseStage: function (stage) {
                debugger;
                var count = 0, liStages, currentLiStage,activeLiStage = "li-" + stage;
               
                if (shopstagelist && shopstagelist.children) {

                    liStages = shopstagelist.children

                    for (; count < liStages.length; count++) {

                        currentLiStage = liStages[count];

                        sandbox.removeClass(currentLiStage, "current-stage");

                        if (currentLiStage.id === activeLiStage) {

                            sandbox.addClass(currentLiStage, "current-stage");
                        }
                    }
                }

                sandbox.notify({
                    type: "render-shop-" + stage,
                });
            }
        }
    }
    return shopStageModule;
});