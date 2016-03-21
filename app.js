/**
 * Created by azder on 2016-03-20.
 */

(function appModule(angular) {

    'use strict'; // ALWAYS

    var
        app = angular.module('app', []),
        slice = Function.prototype.call.bind(Array.prototype.slice)
    // var
        ;

    app.factory('bag', [

        'Bag',
        function bagFactory(Bag) {

            // bag singleton
            var singleton = new Bag();

            // bag init with default items
            singleton.add('first');
            singleton.add('second');

            // return the instance
            return function bag() {
                return singleton;
            };

        }

    ]);

    app.service('Bag', [

        function bagService() {

            // creates a bag that lets the items change via methods
            return function Bag() {

                var array = [];

                this.add = function bagAdd(item) {
                    array.push(item);
                };

                this.clear = function bagClear() {
                    array = [];
                };

                this.items = function bagItems() {
                    return slice(array);
                };

            };
        }
    ]);

    app.controller('article-controller', [

        '$scope', '$log', 'bag',
        function articleController($scope, $log, bag) {

            var ctrl = this;

            $scope.bag = bag();
            $scope.greeting = 'Hello';


            ctrl.onGreetingClick = function onGreetingClick() {
                $scope.greeting = 'OK! Whatever,';
                $log.debug('articleController() > onGreetingClick()', $scope);
            };

            $log.debug('articleController()', {$scope: $scope, ctrl: ctrl});

        }
    ]);

    app.controller('manipulator-controller', [

        '$log', 'bag',
        function manipulatorController($log, bag) {

            var ctrl = this, b = bag();

            ctrl.onBagAdd = function onBagAdd() {
                b.add(('' + Math.random()).substring(0, 4));
                $log.debug('manipulatorController() > onBagAdd()', b.items());
            };

            ctrl.onBagClear = function onBagClear() {
                b.clear();
                $log.debug('manipulatorController() > onBagClear()', b.items());
            }

        }
    ]);

}(angular));
