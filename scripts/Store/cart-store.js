define(["underscore", "Models/cartItemModel"],
function (iUnderscore, CartItem) {

    var cartStore = function () {
        debugger;
        var selectedItems = [], shippingMethod, thisStore = this;

        var getDistinctItemCount = function (id) {
            debugger;
            var itemCount = 0, count = 0;

            if (selectedItems) {

                for (; count < selectedItems.length; count++) {

                    var currentItem = selectedItems[count];

                    if (currentItem.ID === id) {

                        currentItem.Qty = currentItem.Qty + 1;

                        itemCount = currentItem.Qty;

                        currentItem.SetTotalPrice();

                        selectedItems[count] = currentItem;
                    }
                }
            }
            return itemCount;
        };

        return {

            getAllItems: function () {
                debugger;
                if (selectedItems && selectedItems.length > 0) {

                    return selectedItems;
                }
                return null;
            },
            getItemCount: function () {

                var itemCount = 0, count = 0;

                if (selectedItems) {

                    for (; count < selectedItems.length; count++) {

                        var currentItem = selectedItems[count];

                        itemCount = itemCount + currentItem.Qty;
                    }
                }
                return itemCount;
            },
            addItem: function (shopItem) {
                debugger;
                if (shopItem) {

                    var cartItem = new CartItem();
                    cartItem.ID = shopItem.ID;
                    cartItem.Name = shopItem.Name;
                    cartItem.Category = shopItem.Category;
                    cartItem.NumericPrice = shopItem.NumericPrice;
                    cartItem.Qty = 1;

                    var itemCount = getDistinctItemCount(shopItem.ID);

                    if (itemCount < 1) {
                        cartItem.SetTotalPrice();

                        selectedItems.push(cartItem);
                    }


                }
            },
            removeItemById: function (id) {
                debugger;
                if (selectedItems && selectedItems.length > 0 && id) {

                    return iUnderscore.removeWhere(selectedItems, { ID: id });
                }
            },
            getShippingMethod: function () {

                return shippingMethod;
            },
            setShippingMethod: function (value) {

                shippingMethod = value;
            }
        }
    }
    return cartStore;
});