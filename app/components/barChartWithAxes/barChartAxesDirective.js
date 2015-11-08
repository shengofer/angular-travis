/*eslint-disable*/
(function () {
    'use strict';

    const COLOROFBAR = "#6ea6df";
    angular.module('mentoringApp')
        .directive('barChartAxes', barChartAxes);
    /** @ngInject*/
    function barChartAxes() {
        return {
            restrict: 'EA',
            scope: {},
            replace: true,
            template: '<div class="horizontal-bar-graph" id="barChartWithAxes"></div>',
            link: function (scope, element, attrs) {

                let series = JSON.parse(attrs.data);

                let el = d3.select('#barChartWithAxes');

                let x = d3.scale.linear()
                    .domain([0, d3.max(series,  (d)=> {
                        return d.value
                    })])
                    .range([0, 100]);

                let segment = el
                    .selectAll(".horizontal-bar-graph-segment")
                    .data(series)
                    .enter()
                    .append("div").classed("horizontal-bar-graph-segment", true);

                segment
                    .append("div").classed("horizontal-bar-graph-label", true)
                    .text(function (d) {
                        return d.label
                    });

                segment
                    .append("div").classed("horizontal-bar-graph-value", true)
                    .append("div").classed("horizontal-bar-graph-value-bar", true)
                    .style("background-color", (d)=> {
                        return COLOROFBAR
                    })
                    .text( (d) => {
                        return d.inner_label ? d.inner_label : ""
                    })
                    .transition()
                    .duration(1000)
                    .style("min-width", (d) =>{
                        return x(d.value) + "%"
                    });


            }

        };
    }
})();
