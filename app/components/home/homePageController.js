/*eslint-disable*/
(function () {
    'use strict';

    /** @ngInject*/
    class HomePageController {

        constructor() {
            let stackTechList = [
                {
                    face: 'https://placekitten.com/g/200/300',
                    what: 'Brunch this weekend?',
                    who: 'Min Li Chan',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    face: 'https://placekitten.com/g/200/300',
                    what: 'Brunch this weekend?',
                    who: 'Min Li Chan',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    face: 'https://placekitten.com/g/200/300',
                    what: 'Brunch this weekend?',
                    who: 'Min Li Chan',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    face: 'https://placekitten.com/g/200/300',
                    what: 'Brunch this weekend?',
                    who: 'Min Li Chan',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    face: 'https://placekitten.com/g/200/300',
                    what: 'Brunch this weekend?',
                    who: 'Min Li Chan',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                }
            ];

            this.strackTech = stackTechList;
            //   let men = [{label: "mentee", inner_laber: "how much hw done", value: 12}];
        }
    }


    angular
        .module('mentoringApp')
        .controller('HomePageController', HomePageController);
})();
