/*eslint-disable*/
(function () {
    'use strict';

    /** @ngInject*/
    class PieChartController {

        constructor(mentees) {
         //   let men = [{label: "Vasya Pupkin", value: 12}];
            this.series = getTotalScoreOfLection(mentees);
            console.log(getTotalScoreOfLection(mentees));
        }

    }
    // The most scorable lection
    function getTotalScoreOfLection(mentees) {
        console.log(mentees);
        let res = [];
        for (let i = 0; i < mentees[0].homework.length; i++) {
          res.push({label:mentees[0].homework[i].name.substring(0, 9),value:0});
        }
        for (let i = 0; i < mentees.length; i++) {
            for (let j = 0; j < mentees[i].homework.length; j++) {
                if (mentees[i].homework[j].lectureMark !== 0) {
                    res[j].value+=mentees[i].homework[j].lectureMark;
                }
            }
        }

        return res;
    }

    angular
        .module('mentoringApp')
        .controller('PieChartController', PieChartController);
})();
