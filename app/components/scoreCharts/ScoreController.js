/*eslint-disable*/
(function () {
    'use strict';

    /** @ngInject*/
    class ScoreController {

        constructor(mentees) {
         //   let men = [{label: "mentee", inner_laber: "how much hw done", value: 12}];

            this.avgScore = getAverageScoreOfMentee(mentees);
            this.totalMenteeScore= getTotalScoreOfMentee(mentees);
        }

    }

    // The most scorable mentee
    function getAverageScoreOfMentee(mentees) {
        let res = [];
        for (let i = 0; i < mentees.length; i++) {
            let name = mentees[i].name;
            let totalScore = 0;
            for (let j = 0; j < mentees[i].homework.length; j++) {
                if (mentees[i].homework[j].lectureMark !== 0) {
                    totalScore+=mentees[i].homework[j].lectureMark;
                }
            }
            console.log(totalScore);
            let avgScore = totalScore/mentees[0].homework.length;
            let inst = {label: name, inner_label: avgScore + " score", value: avgScore};
            res.push(inst)
        }

        return res;
    }

    // The most scorable mentee
    function getTotalScoreOfMentee(mentees) {
        let res = [];
        for (let i = 0; i < mentees.length; i++) {
            let name = mentees[i].name;
            let totalScore = 0;
            for (let j = 0; j < mentees[i].homework.length; j++) {
                if (mentees[i].homework[j].lectureMark !== 0) {
                    totalScore+=mentees[i].homework[j].lectureMark;
                }
            }
          //  let men = [{label: "Vasya Pupkin", value: 12}];
            let inst = {label: name,  value: totalScore};
            res.push(inst)
        }

        return res;
    }


    angular
        .module('mentoringApp')
        .controller('ScoreController', ScoreController);
})();
