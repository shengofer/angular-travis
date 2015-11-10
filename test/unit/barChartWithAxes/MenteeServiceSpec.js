describe('Mentee Service', ()=> {
    'use strict';
    beforeEach(module('mentoringApp'));

    let sut;
    let mockResource;
    let mockGetMenteesPromise;
    let mockGetMenteesQuery;
    beforeEach(() => {
        mockGetMenteesPromise = 'mockGetGroupsPromise';
        mockGetMenteesQuery = jasmine.createSpy().and.returnValue({
            $promise: mockGetMenteesPromise
        });
        mockResource = jasmine.createSpy().and.returnValue({
            query: mockGetMenteesQuery
        });
        module(($provide)=> {
            $provide.value('$resource', mockResource);
        });
    });

    beforeEach(() => {
        inject((_MenteeService_)=> {
            sut = _MenteeService_;
        });
    });

    it('should call query in resource when calls getMentees method', () => {
        sut.getMentees();
        expect(mockGetMenteesQuery).toHaveBeenCalled();
    });
});
