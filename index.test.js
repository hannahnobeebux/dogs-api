const request = require('supertest');
// express app
const app = require('./index');

// db setup
const { sequelize, Dog } = require('./db');
const seed = require('./db/seedFn');
const {dogs} = require('./db/seedData');
const supertest = require('supertest');

describe('Endpoints', () => {
    // to be used in POST test
    const testDogData = {
        breed: 'Poodle',
        name: 'Sasha',
        color: 'black',
        description: 'Sasha is a beautiful black pooodle mix.  She is a great companion for her family.'
    };

    beforeAll(async () => {
        // rebuild db before the test suite runs
        await seed();
    });

    describe('GET /dogs', () => {
        it('should return list of dogs with correct data', async () => {
            // make a request
            const response = await request(app).get('/dogs');
            // assert a response code
            expect(response.status).toBe(200);
            // expect a response
            expect(response.body).toBeDefined();
            // toEqual checks deep equality in objects
            expect(response.body[0]).toEqual(expect.objectContaining(dogs[0]));
        });
    });

    describe('POST /dogs', () => {
        it('should add a new dog to the database', async  () => {
            const dogData = {name: "Max", breed: "Labrador Retriever", color: "Golden", description:"A friendly and loyal dog"}
            const response = await request(app).post('/dogs').send(dogData)
            expect(response.status).toBe(200)


        })
        it('should match the data saved in the database', async () => {
            const dogFromDatabase = Dog.findOne({where: {name: "Max"}})
            expect(dogFromDatabase).toBeDefined()
        })
    })

    describe('DELETE /dogs/:id', () => {
        it('should delete the dog with an id of 1', async () => {
            const response = await request(app).delete('/dogs/1')
            const dog = Dog.findAll({where: id = 1})
            expect(typeof response.body).toBe("object");
        })
    })

    describe('GET /dogs/:name', () => {
        it('should return the dog with the corresponding name', async () => {
            const response = await request(app).get('/dogs/:name')
            const dog = Dog.findByPk(response.body.name)
            expect(dog).toBeDefined; 
        })
    })
});