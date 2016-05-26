define([],
function () {
    var shopItemsModule = function (sandbox, shopStore, cartStore) {
        var thisModule, shopItemscontainer, shopItemsTemplate, allBtnCheckout;

        return {
            init: function () {
                thisModule = this;

                thisModuleContainer = sandbox.find("#shop-item-module-container")[0];

                shopItemscontainer = sandbox.find("#shop-items-container")[0];

                shopItemsTemplate = sandbox.find("#shop-items-template")[0];

                sandbox.listen({ "render-shop-shopping": thisModule.renderShopItems });

                sandbox.listen({ "empty-shopitems": thisModule.emptyShopItems });

                thisModule.renderShopItems();
            },
            destroy: function () {

                sandbox.ignore(["render-shop-shopping", "empty-shopitems"]);
            },
            renderShopItems: function () {

                var allShopItems = shopStore.getAllShopItems();

                if (allShopItems && allShopItems.length > 0) {

                    var jsonStringShopItems = JSON.stringify(allShopItems);

                    var jsonShopItems = JSON.parse(jsonStringShopItems);

                    var template = sandbox.getTemplate(shopItemsTemplate);

                    var generatedHtml = template(jsonShopItems);

                    sandbox.replaceContent(shopItemscontainer, generatedHtml);

                    thisModule.initializeBtnAddItemToCartEvents();

                    thisModule.initializeBtnCheckOutEvents();

                    thisModule.hideShowThisModule(true);
                }
            },
            emptyShopItems: function () {
                sandbox.replaceContent(shopItemscontainer, "");
            },
            initializeBtnAddItemToCartEvents: function () {

                var btnAddToCart,count = 0;

                allBtnAddToCart = sandbox.find(".btnAddToCart");

                if (allBtnAddToCart && allBtnAddToCart.length > 0) {

                    for (; count < allBtnAddToCart.length; count++) {

                        btnAddToCart = allBtnAddToCart[count];

                        if (btnAddToCart) {

                            sandbox.addEvent(btnAddToCart, "click", thisModule.addItemToCart);
                        }
                    }
                }
            },
            destroyBtnAddItemToCartClickEvents: function () {

                var btnAddToCart, count = 0;

                if (allBtnAddToCart && allBtnAddToCart.length > 0) {

                    for (; count < allBtnAddToCart.length; count++) {

                        btnAddToCart = allBtnAddToCart[count];

                        sandbox.removeEvent(btnAddToCart, "click", thisModule.addItemToCart);
                    }
                }
            },
            initializeBtnCheckOutEvents: function () {

                var btnCheckout,count = 0;

                allBtnCheckout = sandbox.find(".btnCheckout"); 

                if (allBtnCheckout && allBtnCheckout.length > 0) {

                    for (; count < allBtnCheckout.length; count++) {

                        btnCheckout = allBtnCheckout[count];

                        if (btnCheckout) {

                            sandbox.addEvent(btnCheckout, "click", thisModule.checkOut);
                        }
                    }
                }
            },
            destroyBtnCheckOutEvents: function () {

                var btnCheckout,count = 0;

                if (allBtnCheckout && allBtnCheckout.length > 0) {

                    for (; count < allBtnCheckout.length; count++) {

                        btnCheckout = allBtnCheckout[count];

                        sandbox.removeEvent(btnCheckout, "click", thisModule.checkOut);
                    }
                }
            },
            addItemToCart: function (e) {

                var clickedBtnAddToCart = e.currentTarget;

                var itemId = sandbox.getAttr(clickedBtnAddToCart, "data-itemId");

                var selectedItem = shopStore.getShopItemByID(itemId);

                if (selectedItem) {

                    cartStore.addItem(selectedItem);

                    sandbox.notify({
                        type: "update-itemcount",
                    });

                    sandbox.notify({
                        type: "alert-success",
                        data: selectedItem.Name + " was added to your cart."
                    });
                } 
            },
            checkOut: function () {
               
                var cartItemCount = cartStore.getItemCount();

                if (!cartItemCount || cartItemCount < 1) {

                    sandbox.notify({
                        type: "alert-info",
                        data: "CART EMPTY! You have no selected items"
                    });
                    return;
                }

                thisModule.hideShowThisModule(false); 
                
                sandbox.notify({
                    type: "update-purchasestage",
                    data: "shipping"
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
    return shopItemsModule;
});