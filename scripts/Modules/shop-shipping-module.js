define([],
function () {
    var shopShippingModule = function (sandbox, shopStore, cartStore) {
        var thisModule, thisModuleContainer, allShippingOptions, btnShippingMethodChosen;

        return {
            init: function () {
                thisModule = this;

                thisModuleContainer = sandbox.find("#shop-shipping-module-container")[0];

                allShippingOptions = sandbox.find(".shopping-option");

                btnShippingMethodChosen = sandbox.find("#btnShippingMethodChosen")[0];

                sandbox.addEvent(btnShippingMethodChosen, "click", thisModule.moveToNextStage);

                sandbox.listen({ "render-shop-shipping": thisModule.renderShopShippingOptions });

                thisModule.initializeShippingOptionChangeEvents();
               
            },
            destroy: function () {

                sandbox.ignore(["render-shop-shipping"]);

                sandbox.removeEvent(btnShippingMethodChosen, "click", thisModule.moveToNextStage);
            },
            renderShopShippingOptions: function(){

                thisModule.setSelectedShippingOption();

                thisModule.hideShowThisModule(true);
            },
            setSelectedShippingOption: function(){
                debugger;
                var currentShippingMethod = cartStore.getShippingMethod();

                if (currentShippingMethod) {
                    
                    var shippingOption, count = 0;

                    if (allShippingOptions && allShippingOptions.length > 0) {

                        for (; count < allShippingOptions.length; count++) {

                            shippingOption = allShippingOptions[count];

                            if (shippingOption) {

                                shippingOption.checked = false;

                                if (shippingOption.value == currentShippingMethod) {

                                    shippingOption.checked = true;
                                }
                            }
                        }
                    }
                }
            },
            initializeShippingOptionChangeEvents: function(){

                var shippingOption, count=0;

                if (allShippingOptions && allShippingOptions.length > 0) {

                    for (; count < allShippingOptions.length; count++) {

                        shippingOption = allShippingOptions[count];

                        if (shippingOption) {

                            sandbox.addEvent(shippingOption, "change", thisModule.setCartShippingOption);
                        }
                    }
                }
            },
            destroyShippingOptionChangeEvents: function () {

                var shippingOption, count = 0;

                if (allShippingOptions && allShippingOptions.length > 0) {

                    for (; count < allShippingOptions.length; count++) {

                        shippingOption = allShippingOptions[count];

                        sandbox.removeEvent(shippingOption, "change", thisModule.setCartShippingOption);
                    }
                }
            },
            setCartShippingOption: function(e){

                var selectedShippingOption = e.currentTarget;

                if (selectedShippingOption && selectedShippingOption.value) {

                    cartStore.setShippingMethod(selectedShippingOption.value);
                }
            },
            moveToNextStage :function(){

                var currentShippingMethod = cartStore.getShippingMethod();

                if (!currentShippingMethod) {

                    sandbox.notify({
                        type: "alert-info",
                        data: "NO SHIPPING METHOD! You have not selected a shipping method"
                    });
                    return;
                }

                thisModule.hideShowThisModule(false);

                sandbox.notify({
                    type: "update-purchasestage",
                    data: "summary"
                });
               
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
    return shopShippingModule;
});