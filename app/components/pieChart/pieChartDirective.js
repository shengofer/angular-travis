/*eslint-disable*/
(function () {
    'use strict';

    angular.module('mentoringApp')
        .directive('pieChart', pieChart);
    /** @ngInject*/
    function pieChart() {
        return {
            restrict: 'EA',
            scope: {},
            replace: true,
            template: '<div class="pieChart" id="graphic"></div>',
            link: function (scope, element, attrs) {
                let width = 400,
                    height = 400,
                    radius = 200;

                let colors = d3.scale.category20c();
                let pie = JSON.parse(attrs.data);

                let pieLayout = d3.layout.pie()
                    .value((d) => {
                        return d.value;
                    });

                let arc = d3.svg.arc()
                    .outerRadius(radius);

                let chart = d3.select("#graphic").append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(' + (width - radius) + ', ' + (height - radius) + ')')
                    .selectAll('path').data(pieLayout(pie)).enter()
                    .append('g')
                    .attr('class', 'slice');

                let slices = d3.selectAll('g.slice')
                    .append('path')
                    .attr('fill', (d, i) => {
                        return colors(i);
                    })
                    .attr('d', arc);

                let text = d3.selectAll('g.slice')
                    .append('text')
                    .text((d, i) => {
                        return d.data.label + ' (' + d.data.value + ')';
                    })
                    .attr('font-size', '12')
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'black')
                    .attr('transform', (d) => {
                        d.innerRadius = 0;
                        d.outerRadius = radius;
                        return 'translate(' + arc.centroid(d) + ')'
                    })
            }

        };
    }
})();
