(function(){
    'use strict';
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buyList = this;

        buyList.buy = ShoppingListCheckOffService.getBuyList();
        buyList.error = function() {
            return ShoppingListCheckOffService.buyListStatus();
        }

        buyList.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.addToBought(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;

        boughtList.bought = ShoppingListCheckOffService.getBoughtList();

        boughtList.error = function() {
            return ShoppingListCheckOffService.boughtListStatus();
        }
        
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var buy = [
            {name:'Cookies',quantity:10},
            {name:'Cake',quantity:2},
            {name:'Coke',quantity:6},
            {name:'Chocolate',quantity:100},
            {name:'Chips',quantity:7}
        ];
        var bought = []

        service.addToBought = function(itemIndex) {
            bought.push(buy[itemIndex]);
            buy.splice(itemIndex,1);
        };

        service.buyListStatus = function () {
            return buy.length == 0;
        }

        service.boughtListStatus = function() {
            return bought.length == 0;
        }

        service.getBuyList = function() {
            return buy;
        }

        service.getBoughtList = function() {
            return bought;
        }
    }
})();