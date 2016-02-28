(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    function HomeController() {
        var vm = this;

        vm.click = function(){
            console.log('works');
        }
    }

})();