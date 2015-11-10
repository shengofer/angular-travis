describe('Bar Chart with axes Controller', () => {
    'use strict';

    let sut;
    let mockMenteeService;
    let mockGetMentees;
    let mockPromise;
    let mockResponse;
    let mockMentees;

    beforeEach(module('mentoringApp'));

    beforeEach(() => {
        mockResponse = 'mock response';
        mockPromise = jasmine.createSpy().and.returnValue(mockResponse);
        mockGetMentees = jasmine.createSpy().and.returnValue({
            'then': mockPromise
        });
        mockMenteeService = jasmine.createSpy().and.returnValue({
            'getMentees': mockGetMentees
        });
        module(($provide) => {
            $provide.service('BarChartAxesController', mockMenteeService);
        });
    });

    beforeEach(inject(($controller, MenteeService) => {
        mockMenteeService = MenteeService;
        mockMentees = [{label: 'mentee', inner_laber: 'how much hw done', value: 12},
            {label: 'mentee2', inner_laber: 'how much hw done', value: 25}];

        sut = $controller('BarChartAxesController', {
            mentees: mockMentees
        });
    }));
    xit('should contain series list', () => {
        expect(sut.series).toBeDefined();
    });

    xit('should contain method  getQuantityOfDoneHWOfMentee', () => {
        console.log(sut);
        // expect(sut.getQuantityOfDoneHWOfMentee).toBeDefined();
    });
});
