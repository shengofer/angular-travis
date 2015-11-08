/*eslint-disable*/
(function () {
    'use strict';


    angular.module('mentoringApp')
        .directive('barChart', barChart);
    /** @ngInject*/
    function barChart() {
        return {
            restrict: 'EA',
            scope: {},
            replace: true,
            template: '<div id="chart"></div>',
            link: function (scope, element, attrs) {
                var data = attrs.data.split(','),
                    chart = d3.select('#chart')
                        .append("div").attr("class", "chart")
                        .selectAll('div')
                        .data(data).enter()
                        .append("div")
                        .transition().ease("elastic")
                        .style("width", function (d) {
                            return d + "%";
                        })
                        .text(function (d) {
                            return d + "%";
                        });
            }


        };
    }
})();
