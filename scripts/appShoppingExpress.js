requirejs.config({
    baseUrl: "scripts/Base",
    paths: {
        Core: "../Core",
        Service: "../Service",
        Sandbox: "../Sandbox",
        Modules: "../Modules",
        Models: "../Models",
        Store: "../Store",
        SharedModules: "../Modules/Shared",
        Config: "../Config",
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        datetimepicker: {
            deps: ["jquery"]
        },
        signalR: {
            deps: ['jquery']
        }
    }
});

// Start the main app logic.
requirejs(["Core/core-jquery", "Modules/shop-navigation-module", "Modules/shop-items-module",
    "Modules/shop-shipping-module", "Modules/shop-summary-module", "Modules/shop-complete-module", "SharedModules/alert-modals"],
function (icore, iShopNavigation, iShopItems, iShopShipping, iShopSummary, iShopComplete, iAlertModals) {

    icore.register("alert-modals", iAlertModals);
    icore.register("shop-navigation-module", iShopNavigation);
    icore.register("shop-items-module", iShopItems);
    icore.register("shop-shipping-module", iShopShipping);
    icore.register("shop-summary-module", iShopSummary);
    //icore.register("shop-complete-module", iShopComplete);

    icore.start_all();
    //setTimeout(ICORE.stop_all(), 10000);
});

