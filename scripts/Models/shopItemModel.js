define(["numeral"],
function (numeral) {

    

    function ShopItem() {

        this.ID = "";
        this.Name = "";
        this.Category = "";
        this.Class = "";
        this.FormattedPrice = "£0.00";
        this.NumericPrice = 0.00;
        this.SetPrice = function(value){

            var intValue = parseInt(value);

            this.NumericPrice = intValue;

            var formattedPrice = numeral(intValue);

            this.FormattedPrice = "£" + formattedPrice.format('0,0.00');
        };
        this.SetClass = function () {

            if (this.Category) {

                this.Class = this.Category + "-item";
            }
        };
    }
    ShopItem.prototype.toString = function toString() {

        return this.Category + " of " + this.Name;
    }
    return ShopItem;
});