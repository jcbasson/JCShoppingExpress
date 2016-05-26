define(["numeral"],
function (numeral) {



    function CartItem() {

        this.ID = "";
        this.Name = "";
        this.Category = "";
        this.Qty = 0;
        this.NumericPrice = 0.00;
        this.FormattedTotalPrice = "£0.00";
        this.NumericTotalPrice = 0.00;
        this.SetTotalPrice = function () {

            this.NumericTotalPrice = this.Qty * this.NumericPrice;

            var formattedTotalPrice = numeral(this.NumericTotalPrice);

            this.FormattedTotalPrice = "£" + formattedTotalPrice.format('0,0.00');
        };
    }
    CartItem.prototype.toString = function toString() {

        return this.Category + " of " + this.Name;
    }
    return CartItem;
});