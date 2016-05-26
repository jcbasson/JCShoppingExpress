define(["underscore","Models/shopItemModel"],
function (iUnderscore,iShopItem) {

    var shopStore = function () {
        debugger;
        var shopItems = [];

        var itemCategories = ["Music", "Sport", "Electronic", "Books"];
        
        for (var categorycounter = 0; categorycounter < itemCategories.length; categorycounter++) {

            var currentCategory = itemCategories[categorycounter];

            for (var numOfItemsCount = 0; numOfItemsCount < 20; numOfItemsCount++) {

                var shopItem = new iShopItem();
                shopItem.ID = currentCategory + numOfItemsCount;
                shopItem.Name = currentCategory + " " + numOfItemsCount;
                shopItem.Category = currentCategory;
                shopItem.SetPrice(numOfItemsCount+ 1.5)
                shopItem.SetClass();

                shopItems.push(shopItem);
            }
        }

        return {
            getAllShopItems: function(){
                if (shopItems) {

                    return shopItems;
                }
            },
            getShopItemByID: function (id) {
                debugger;
                if (shopItems && shopItems.length> 0 && id) {
                    
                    return iUnderscore.findWhere(shopItems, { ID: id });
                }
                return null;
            }
        }
    }
    return shopStore;
});