define([],
function () {
    var shopSummaryModule = function (sandbox, shopStore, cartStore) {
        var thisModule, thisModuleContainer, cartItemscontainer, cartItemsTemplate;

        return {
            init: function () {
                thisModule = this;

                thisModuleContainer = sandbox.find("#shop-summary-module-container")[0];

                cartItemscontainer = sandbox.find("#cart-items-container")[0];

                cartItemsTemplate = sandbox.find("#cart-items-template")[0];

                sandbox.listen({ "render-shop-summary": thisModule.renderCartSummary });
            },
            destroy: function () {

                sandbox.ignore(["render-shop-summary", "empty-shop-summary"]);
            },
            renderCartSummary: function () {
                debugger;
                var allCartItems = cartStore.getAllItems();

                if (allCartItems && allCartItems.length > 0) {

                    var jsonStringCartItems = JSON.stringify(allCartItems);

                    var jsonCartItems = JSON.parse(jsonStringCartItems);

                    var template = sandbox.getTemplate(cartItemsTemplate);

                    var generatedHtml = template(jsonCartItems);

                    sandbox.replaceContent(cartItemscontainer, generatedHtml);

                } else {

                    sandbox.replaceContent(cartItemscontainer, "");
                }

                thisModule.hideShowThisModule(true);
            },
            hideShowThisModule: function (display) {

                if (display) {

                    sandbox.removeClass(thisModuleContainer, "hide");
                }
                else {
                    sandbox.addClass(thisModuleContainer, "hide");
                }
            }
        }
    }
    return shopSummaryModule;
});