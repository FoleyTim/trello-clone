const DBService = require("./db.service");
jest.mock('../models/list')
const list = require('../models/list')

describe('DBService', () => {
    let dbService
    let findListsSpy
    let createListSpy
    let findOneAndUpdateSpy
    let findOneSpy
    beforeAll(() => {
        findListsSpy = jest.fn(() => [{
            listId: 'test',
            cards: [{}]
        },
        {
            listId: 'test',
            cards: [{},{}]
        }])
        createListSpy = jest.fn()
        findOneAndUpdateSpy = jest.fn()
        findOneSpy = jest.fn(() => {
            return {
                cards: []
            }
        })

        list.find = findListsSpy
        list.create = createListSpy
        list.findOneAndUpdate = findOneAndUpdateSpy
        list.findOne = findOneSpy
        dbService = new DBService(list)
    });
    afterEach(() => {
        jest.clearAllMocks()
    });

    describe('createCard()', () => {
        it('Should call findOneAndUpdateSpy & findOneSpy with the correct arguments', async () => {
            const testData = {
                title: 'title',
                description: 'desc',
                cardId: 'cardId',
                listId: 0
            }
            const expectedArg1 = { listId: 0 }
            const expectedArg2 = {
                cards: [{
                    cardId: 'cardId', description: "desc", title: "title"
                }]
            }
            const res = await dbService.createCard(testData)
            expect(findOneAndUpdateSpy).toHaveBeenCalledTimes(1)
            expect(findOneSpy).toHaveBeenCalledTimes(1)
            expect(findOneAndUpdateSpy).toHaveBeenCalledWith(expectedArg1, expectedArg2)
        })
    })

    //TODO: add test for when the list already contains a card

    describe('getAllLists()', () => {
        it('Should call findOneAndUpdate() 1 time', async () => {
            await dbService.getAllLists()
            expect(findListsSpy).toHaveBeenCalledTimes(1)
        })
    })

    describe('createList()', () => {
        it('Should call create() and get find() lists 1 time each', async () => {
            const testData = {
                title: 'title',
            }
            await dbService.createList(testData)
            expect(findListsSpy).toHaveBeenCalledTimes(1)
            expect(createListSpy).toHaveBeenCalledTimes(1)

        })
    })

    describe('moveCard()', () => {
        it('Should call find() 1 time and findOneAndUpdate 2 times with the correct arguments', async () => {
            const testData = {
                sourceList: 0,
                sourceposition: 0,
                targetList: 1,
                targetPosition: 1
            }
            const expectedArg1 = { listId: 0 }
            const expectedArg2 = {
                cards: []
            }
            const expectedArg3 = { listId: 1 }
            const expectedArg4 = {
                cards: [{},{},{}]
            }
            await dbService.moveCard(testData)
            expect(findListsSpy).toHaveBeenCalledTimes(1)
            expect(findOneAndUpdateSpy).toHaveBeenCalledTimes(2)
            expect(findOneAndUpdateSpy).toHaveBeenCalledWith(expectedArg1, expectedArg2)
            expect(findOneAndUpdateSpy).toHaveBeenCalledWith(expectedArg3, expectedArg4)
        })
    })
});
