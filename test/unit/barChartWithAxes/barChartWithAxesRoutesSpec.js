describe('Group route state: ', ()=> {
    'use strict';
    beforeEach(module('mentoringApp'));

    let stateProvider;
    let stateConfig;
    let injector;
    let passPromise = true;
    let addBarAxes = 'barAxes';
    let mockMenteeService;
    beforeEach(()=> {
        module(($provide)=> {
            $provide.service('MenteeService', function ($q) {
                this.getMentees = jasmine.createSpy('getMentees').and.callFake(() => {
                    return passPromise ? $q.when({data: true}) : $q.reject(null);
                });
            });
        });
    });

    beforeEach(()=> {
        inject(($state, $injector, MenteeService) => {
            stateProvider = $state;
            injector = $injector;
            stateConfig = stateProvider.get(addBarAxes);
            mockMenteeService = MenteeService;
        });
    });

    it('should be defined', () => {
        expect(stateConfig).not.toBe(null);
    });

    it('should have right controller', () => {
        expect(stateConfig.controller).toEqual('BarChartAxesController');
    });

    it('should mentees exist', () => {
        expect(stateConfig.resolve.mentees).toBeDefined();
    });

    it('should resolve mentees', () => {
        injector.invoke(stateConfig.resolve.mentees);
        expect(mockMenteeService.getMentees).toHaveBeenCalled();
    });
});
