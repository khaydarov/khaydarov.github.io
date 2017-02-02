var assert = require('assert');
var module = require('../index.js');

describe("Тестируем модуль INDEX", function() {

    describe("INDEX -> pow", function() {

        it ("Возводим 2 в степень 3", function() {
            assert.equal(module.pow(2, 3), 8);
        });


        it ("Возводим 2 в степень 0", function() {
            assert.equal(module.pow(2, 0), 1);
        });

        /**
         * Тесты в цикле
         */
        function makeTest(x) {

            var expect = x * x * x;
            it ("Проверка в цикле, возведение в куб", function() {
                assert.equal(module.pow(x, 3), expect);
            });
        }

        for(var i = 2; i <= 6; i++) {
            makeTest(i);
        }

    });

    describe("INDEX -> number", function() {

        it ("Проверяем, является ли число целым", function() {
            assert.equal(module.number, 12);
        });

    });

});
