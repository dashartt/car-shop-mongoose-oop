import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';

import { car, carsAfterDeleteOne, carskWithId, carWithId, invalidId, updateCar, updatedCarWithId } from '../../mocks/car.mock';
import CarRepository from '../../../repositories/car.repository';
import { errorCatalog } from '../../../errors';

const { expect } = chai;

const { InvalidMongoId } = errorCatalog;

describe('---> Testing Car Model <---]', () => {
    const carRepository = new CarRepository();       
    
    before(() => {
        sinon.stub(Model, 'create').resolves(carWithId);
        sinon.stub(Model, 'find').resolves(carskWithId);
        sinon.stub(Model, 'findById').resolves(carWithId);
        sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedCarWithId);
        sinon.stub(Model, 'findByIdAndDelete').resolves(carWithId);
    });

    after(() => {
        sinon.restore();
    });

    describe('---> Successfully operation MongoDB', () => {
        it('---> Create car', async () => {
            const newCar = await carRepository.create(carWithId);
            expect(newCar).to.be.deep.equal(carWithId);
        });

        it('---> List all cars', async () => {
            const allCars = await carRepository.read();
            
            expect(allCars).to.be.deep.equal(carskWithId);
        });       

        it('---> Update a car', async () => {
            const updatedCar = await carRepository.update(carWithId._id, updateCar);

            expect(updatedCar).to.be.deep.equal(updatedCarWithId)                  
        });   
    });
});