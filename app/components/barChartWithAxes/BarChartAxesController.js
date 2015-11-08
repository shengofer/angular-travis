/*eslint-disable*/
(function () {
    'use strict';

    /** @ngInject*/
    class BarChartAxesController {

        constructor(mentees) {
         //   let men = [{label: "mentee", inner_laber: "how much hw done", value: 12}];

            this.series = getQuantityOfDoneHWOfMentee(mentees);
            this.scoreMentees= getTheMostScorableMentee(mentees);
        }

    }
    // Dependency mentee and how much hw it try to do
    function getQuantityOfDoneHWOfMentee(mentees) {
        let res = [];
        for (let i = 0; i < mentees.length; i++) {
            let name = mentees[i].name;
            let numberOfhw = 0;
            for (let j = 0; j < mentees[i].homework.length; j++) {
                if (mentees[i].homework[j].lectureMark !== 0) {
                    numberOfhw++;
                }
            }
            let inst = {label: name, inner_label: numberOfhw + " done hw", value: numberOfhw};
            res.push(inst)
        }

        return res;
    }
// THis chart show the most popular
    function getTheMostScorableMentee(mentees) {
        let res = [];
        for (let i = 0; i < mentees.length; i++) {
            let name = mentees[i].name;
            let numberOfMarks = 0;
            for (let j = 0; j < mentees[i].homework.length; j++) {
                if (mentees[i].homework[j].lectureMark !== 0) {
                    numberOfMarks+=mentees[i].homework[j].lectureMark;
                }
            }
            let inst = {label: name, inner_label: numberOfMarks + " total point", value: numberOfMarks};
            res.push(inst)
        }

        return res;
    }

    angular
        .module('mentoringApp')
        .controller('BarChartAxesController', BarChartAxesController);
})();
